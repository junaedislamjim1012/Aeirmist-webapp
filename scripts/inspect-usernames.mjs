import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function inspectUsernames() {
  console.log("Fetching all usernames...");
  const uSnap = await getDocs(collection(db, 'usernames'));
  console.log(`Found ${uSnap.docs.length} docs in usernames collection.`);
  
  const profilesSnap = await getDocs(collection(db, 'profiles'));
  const profileOwners = new Set();
  const profileUsernames = new Set();
  profilesSnap.docs.forEach(d => {
    const data = d.data();
    if (data.ownerUid) profileOwners.add(data.ownerUid);
    if (data.uid) profileOwners.add(data.uid);
    if (data.username) profileUsernames.add(data.username.toLowerCase());
    if (data.usernameNormalized) profileUsernames.add(data.usernameNormalized.toLowerCase());
  });

  const usersSnap = await getDocs(collection(db, 'users'));
  const userUids = new Set();
  usersSnap.docs.forEach(d => {
    userUids.add(d.id);
    const data = d.data();
    if (data.uid) userUids.add(data.uid);
  });

  console.log(`Total profiles: ${profilesSnap.docs.length}, total users: ${usersSnap.docs.length}`);

  for (const d of uSnap.docs) {
    const data = d.data();
    const ownerUid = data.ownerUid || data.uid;
    const hasProfile = profileOwners.has(ownerUid);
    const hasUser = userUids.has(ownerUid);
    console.log(`Username: "${d.id}" | ownerUid: "${ownerUid}" | hasUserDoc: ${hasUser} | hasProfileDoc: ${hasProfile} | data:`, JSON.stringify(data));
  }
}

inspectUsernames().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
