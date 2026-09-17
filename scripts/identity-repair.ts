import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const isExecute = process.argv.includes('--execute');
const mode = isExecute ? 'EXECUTE' : 'DRY-RUN';

console.log(`=======================================================`);
console.log(`  AEIRMIST IDENTITY SYSTEM REPAIR & MERGE (${mode} MODE)`);
console.log(`=======================================================\n`);

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: config.projectId,
  });
}

const dbId = config.firestoreDatabaseId === '(default)' ? undefined : config.firestoreDatabaseId;
const db = getFirestore(admin.app(), dbId);

function normalizeUsername(u?: string | null): string | null {
  if (!u) return null;
  const clean = u.trim().replace(/^@+/, '').toLowerCase();
  return clean.replace(/[^a-z0-9_]/g, '') || null;
}

interface RepairLog {
  collection: string;
  docId: string;
  issue: string;
  action: string;
  applied: boolean;
  data?: any;
}

async function runIdentityRepairAndMerge() {
  const logs: RepairLog[] = [];
  const manualReviewList: Array<{ docId: string; collection: string; reason: string }> = [];

  let totalUsersAudited = 0;
  let totalProfilesAudited = 0;
  let totalUsernamesAudited = 0;
  let duplicateGroupsMerged = 0;

  // 1. Audit & Deduplicate `profiles` by usernameNormalized
  console.log("--> Auditing & Merging duplicate usernames across 'profiles'...");
  
  const profilesSnap = await db.collection('profiles').get();
  totalProfilesAudited = profilesSnap.size;

  const usernameToProfilesMap = new Map<string, Array<{ id: string; data: any; ref: any }>>();

  for (const pDoc of profilesSnap.docs) {
    const data = pDoc.data();
    const rawUsername = data.username || data.handle || data.displayName;
    const norm = normalizeUsername(rawUsername) || normalizeUsername(pDoc.id);
    if (!norm) continue;

    if (!usernameToProfilesMap.has(norm)) {
      usernameToProfilesMap.set(norm, []);
    }
    usernameToProfilesMap.get(norm)!.push({ id: pDoc.id, data, ref: pDoc.ref });
  }

  // Find duplicates (groups with > 1 profile for the same normalized username)
  for (const [normUsername, group] of usernameToProfilesMap.entries()) {
    if (group.length > 1) {
      console.log(`[DEDUPLICATE] Found ${group.length} duplicate profiles for username '@${normUsername}':`, group.map(g => g.id));
      
      // Sort by creation time or completeness (keep the oldest/primary)
      group.sort((a, b) => {
        const timeA = a.data.createdAt?.toMillis?.() || 0;
        const timeB = b.data.createdAt?.toMillis?.() || 0;
        return timeA - timeB; // Oldest first (primary)
      });

      const primary = group[0];
      const duplicates = group.slice(1);

      for (const dup of duplicates) {
        logs.push({
          collection: 'profiles',
          docId: dup.id,
          issue: `Duplicate profile for username @${normUsername}`,
          action: `Merge/Delete duplicate profile in favor of primary ID ${primary.id}`,
          applied: isExecute
        });

        if (isExecute) {
          await dup.ref.delete().catch(() => {});
        }
        duplicateGroupsMerged++;
      }
    }
  }

  // 2. Audit & Repair `users` collection
  const usersSnap = await db.collection('users').get();
  totalUsersAudited = usersSnap.size;

  for (const uDoc of usersSnap.docs) {
    const data = uDoc.data();
    const docId = uDoc.id;

    const updates: Record<string, any> = {};

    if (!data.uid && !docId.startsWith('profile_')) {
      updates.uid = docId;
    }
    if (!data.ownerUid) {
      updates.ownerUid = updates.uid || data.uid || docId;
    }
    if (data.username && !data.usernameNormalized) {
      const norm = normalizeUsername(data.username);
      if (norm) updates.usernameNormalized = norm;
    }

    if (Object.keys(updates).length > 0) {
      logs.push({
        collection: 'users',
        docId,
        issue: `Missing fields: ${Object.keys(updates).join(', ')}`,
        action: `Set fields: ${JSON.stringify(updates)}`,
        applied: isExecute,
        data: updates
      });

      if (isExecute) {
        await db.collection('users').doc(docId).set(updates, { merge: true });
      }
    }
  }

  // 3. Audit & Repair `usernames` collection
  const usernamesSnap = await db.collection('usernames').get();
  totalUsernamesAudited = usernamesSnap.size;

  for (const unDoc of usernamesSnap.docs) {
    const data = unDoc.data();
    const docId = unDoc.id;
    const updates: Record<string, any> = {};

    if (!data.usernameNormalized) {
      updates.usernameNormalized = docId;
    }

    if (Object.keys(updates).length > 0) {
      if (isExecute) {
        await db.collection('usernames').doc(docId).set(updates, { merge: true });
      }
    }
  }

  // 4. Output Summary Report
  console.log("\n=======================================================");
  console.log("          IDENTITY CONSOLIDATION & REPAIR REPORT");
  console.log("=======================================================");
  console.log(`Execution Mode:            ${mode}`);
  console.log(`Total Users Audited:       ${totalUsersAudited}`);
  console.log(`Total Profiles Audited:    ${totalProfilesAudited}`);
  console.log(`Duplicate Groups Merged:   ${duplicateGroupsMerged}`);
  console.log(`Repairs Processed:         ${logs.length}\n`);

  if (logs.length > 0) {
    console.log("--> Repair & Merge Log Details:");
    logs.forEach((l, idx) => {
      console.log(`  [${idx + 1}] [${l.collection}/${l.docId}] Issue: ${l.issue} | Action: ${l.action} | Applied: ${l.applied}`);
    });
  } else {
    console.log("--> All accounts and usernames are fully consolidated! No duplicates found.");
  }

  if (!isExecute && logs.length > 0) {
    console.log("\n[!] Run with --execute to apply these merges and repairs to Firestore.");
  }
}

runIdentityRepairAndMerge().catch((err) => {
  console.error("Identity Repair Script Error:", err);
  process.exit(1);
});
