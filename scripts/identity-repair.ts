import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const isExecute = process.argv.includes('--execute');
const mode = isExecute ? 'EXECUTE' : 'DRY-RUN';

console.log(`=======================================================`);
console.log(`  AEIRMIST IDENTITY SYSTEM REPAIR SCRIPT (${mode} MODE)`);
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

async function runIdentityRepair() {
  const logs: RepairLog[] = [];
  const manualReviewList: Array<{ docId: string; collection: string; reason: string }> = [];

  let totalUsersAudited = 0;
  let totalProfilesAudited = 0;
  let totalUsernamesAudited = 0;

  // 1. Audit & Repair `users` collection
  console.log("--> Auditing 'users' collection...");
  const usersSnap = await db.collection('users').get();
  totalUsersAudited = usersSnap.size;

  for (const uDoc of usersSnap.docs) {
    const data = uDoc.data();
    const docId = uDoc.id;

    // Check if user is ambiguous account (CNuTlvpDYdVUt3kiB6bJtCxQGG03)
    if (docId === 'CNuTlvpDYdVUt3kiB6bJtCxQGG03') {
      manualReviewList.push({
        docId,
        collection: 'users',
        reason: 'Ambiguous username history between jim and junaed'
      });
      logs.push({
        collection: 'users',
        docId,
        issue: 'Ambiguous legacy account',
        action: 'Flagged for manual review (needsIdentityReview = true)',
        applied: isExecute
      });
      if (isExecute) {
        await db.collection('users').doc(docId).update({ needsIdentityReview: true }).catch(() => {});
      }
      continue;
    }

    const updates: Record<string, any> = {};

    // 1a. Missing uid field
    if (!data.uid && !docId.startsWith('profile_')) {
      updates.uid = docId;
    }
    // 1b. Missing ownerUid field
    if (!data.ownerUid) {
      updates.ownerUid = updates.uid || data.uid || docId;
    }
    // 1c. Missing usernameNormalized
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

  // 2. Audit & Repair `profiles` collection
  console.log("--> Auditing 'profiles' collection...");
  const profilesSnap = await db.collection('profiles').get();
  totalProfilesAudited = profilesSnap.size;

  for (const pDoc of profilesSnap.docs) {
    const data = pDoc.data();
    const docId = pDoc.id;

    const updates: Record<string, any> = {};

    let resolvedUid = data.uid || data.ownerUid || null;
    if (!resolvedUid && docId.startsWith('profile_')) {
      resolvedUid = docId.replace(/^profile_/, '');
    }

    if (resolvedUid) {
      if (!data.uid) updates.uid = resolvedUid;
      if (!data.ownerUid) updates.ownerUid = resolvedUid;
    } else {
      manualReviewList.push({
        docId,
        collection: 'profiles',
        reason: 'Unresolvable UID/ownerUid in profile document'
      });
      updates.needsIdentityReview = true;
    }

    if (data.username && !data.usernameNormalized) {
      const norm = normalizeUsername(data.username);
      if (norm) updates.usernameNormalized = norm;
    }

    if (Object.keys(updates).length > 0) {
      logs.push({
        collection: 'profiles',
        docId,
        issue: `Missing profile fields: ${Object.keys(updates).join(', ')}`,
        action: `Set profile fields: ${JSON.stringify(updates)}`,
        applied: isExecute,
        data: updates
      });

      if (isExecute) {
        await db.collection('profiles').doc(docId).set(updates, { merge: true });
      }
    }
  }

  // 3. Audit & Repair `usernames` collection
  console.log("--> Auditing 'usernames' collection...");
  const usernamesSnap = await db.collection('usernames').get();
  totalUsernamesAudited = usernamesSnap.size;

  for (const unDoc of usernamesSnap.docs) {
    const data = unDoc.data();
    const docId = unDoc.id;

    const updates: Record<string, any> = {};

    const resolvedUid = data.uid || data.ownerUid || null;
    if (resolvedUid) {
      if (!data.uid) updates.uid = resolvedUid;
      if (!data.ownerUid) updates.ownerUid = resolvedUid;
    }

    if (!data.usernameNormalized) {
      updates.usernameNormalized = docId;
    }
    if (!data.normalizedUsername) {
      updates.normalizedUsername = docId;
    }

    if (Object.keys(updates).length > 0) {
      logs.push({
        collection: 'usernames',
        docId,
        issue: `Missing index fields: ${Object.keys(updates).join(', ')}`,
        action: `Set index fields: ${JSON.stringify(updates)}`,
        applied: isExecute,
        data: updates
      });

      if (isExecute) {
        await db.collection('usernames').doc(docId).set(updates, { merge: true });
      }
    }
  }

  // 4. Output Summary Report
  console.log("\n=======================================================");
  console.log("              IDENTITY CONSISTENCY REPORT");
  console.log("=======================================================");
  console.log(`Execution Mode:          ${mode}`);
  console.log(`Total Users Audited:     ${totalUsersAudited}`);
  console.log(`Total Profiles Audited:  ${totalProfilesAudited}`);
  console.log(`Total Usernames Audited: ${totalUsernamesAudited}`);
  console.log(`Repairs Processed:       ${logs.length}`);
  console.log(`Flagged Manual Reviews:  ${manualReviewList.length}\n`);

  if (logs.length > 0) {
    console.log("--> Repair Log Details:");
    logs.forEach((l, idx) => {
      console.log(`  [${idx + 1}] [${l.collection}/${l.docId}] Issue: ${l.issue} | Action: ${l.action} | Applied: ${l.applied}`);
    });
  } else {
    console.log("--> All identity collections are 100% consistent! No repairs needed.");
  }

  if (manualReviewList.length > 0) {
    console.log("\n--> Manual Review Queue:");
    manualReviewList.forEach((m, idx) => {
      console.log(`  [${idx + 1}] [${m.collection}/${m.docId}] Reason: ${m.reason}`);
    });
  }

  if (!isExecute && logs.length > 0) {
    console.log("\n[!] Run with --execute to apply these repairs to Firestore.");
  }
}

runIdentityRepair().catch((err) => {
  console.error("Identity Repair Script Error:", err);
  process.exit(1);
});
