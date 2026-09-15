import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

const TARGET_EMAIL = 'junaedislamjim180@gmail.com';
const TARGET_UID = 'AlGw9gsrzeatQl5q6GjdCcnRWae2';
const HANDLES = ['junaed_islam_jim9', 'junaed_islam_jim', 'junaed', 'junaedislamjim9', 'junaed_islam_jim999'];

async function repairFirestoreData() {
  console.log('=== REPAIRING FIRESTORE DATA FOR HANDLES & ACCOUNTS ===');

  for (const handle of HANDLES) {
    const norm = handle.toLowerCase();
    console.log(`\nRepairing usernames/${norm}...`);
    try {
      const uRef = doc(db, 'usernames', norm);
      await setDoc(uRef, {
        uid: TARGET_UID,
        ownerUid: TARGET_UID,
        email: TARGET_EMAIL,
        username: handle,
        usernameNormalized: norm,
        profileId: `profile_${TARGET_UID}`
      }, { merge: true });
      console.log(`Successfully updated usernames/${norm}`);
    } catch (e: any) {
      console.error(`Failed to update usernames/${norm}:`, e.message);
    }
  }

  // Update users/AlGw9gsrzeatQl5q6GjdCcnRWae2
  console.log(`\nUpdating users/${TARGET_UID}...`);
  try {
    const userRef = doc(db, 'users', TARGET_UID);
    await setDoc(userRef, {
      uid: TARGET_UID,
      ownerUid: TARGET_UID,
      email: TARGET_EMAIL,
      username: 'junaed_islam_jim9',
      usernameNormalized: 'junaed_islam_jim9',
      isBanned: false
    }, { merge: true });
    console.log(`Successfully updated users/${TARGET_UID}`);
  } catch (e: any) {
    console.error(`Failed to update users/${TARGET_UID}:`, e.message);
  }

  // Update profiles/profile_AlGw9gsrzeatQl5q6GjdCcnRWae2
  console.log(`\nUpdating profiles for ${TARGET_UID}...`);
  try {
    const q = query(collection(db, 'profiles'), where('email', '==', TARGET_EMAIL));
    const snap = await getDocs(q);
    if (!snap.empty) {
      for (const d of snap.docs) {
        await setDoc(doc(db, 'profiles', d.id), {
          ownerUid: TARGET_UID,
          uid: TARGET_UID,
          email: TARGET_EMAIL,
          username: 'junaed_islam_jim9',
          usernameNormalized: 'junaed_islam_jim9'
        }, { merge: true });
        console.log(`Successfully updated profile ${d.id}`);
      }
    } else {
      const pId = `profile_${TARGET_UID}`;
      await setDoc(doc(db, 'profiles', pId), {
        id: pId,
        ownerUid: TARGET_UID,
        uid: TARGET_UID,
        email: TARGET_EMAIL,
        username: 'junaed_islam_jim9',
        usernameNormalized: 'junaed_islam_jim9'
      }, { merge: true });
      console.log(`Successfully created profile ${pId}`);
    }
  } catch (e: any) {
    console.error('Failed to update profiles:', e.message);
  }

  console.log('\nRepair completed successfully!');
  process.exit(0);
}

repairFirestoreData().catch(err => {
  console.error("Repair failed:", err);
  process.exit(1);
});
