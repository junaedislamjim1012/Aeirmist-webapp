/**
 * Automated Security Matrix Test Suite for Firebase Storage Rules
 * Simulates Firebase Security Rules evaluation engine with attack scenarios.
 */

import fs from 'fs';
import path from 'path';

console.log('🔒 =========================================================');
console.log('   FIREBASE STORAGE SECURITY AUDIT ATTACK SUITE');
console.log('=========================================================\n');

// Mock state of Firestore for cross-document participant lookups
const firestoreDb = {
  conversations: {
    'chat_legit_101': {
      participants: ['user_alice', 'user_bob', 'profile_user_alice', 'profile_user_bob']
    }
  },
  chats: {
    'chat_legit_202': {
      participants: ['user_alice', 'user_charlie']
    }
  }
};

// Storage Rules Engine Implementation reflecting storage.rules
function evaluateStorageRule({
  path: targetPath,
  method, // 'read' | 'write'
  auth, // { uid: string } | null
  resourceSize = 1024 * 1024, // 1MB default
  contentType = 'image/png'
}) {
  const isSignedIn = auth !== null && typeof auth.uid === 'string';

  const isOwner = (userId) => isSignedIn && (auth.uid === userId || ('profile_' + auth.uid) === userId || auth.uid === ('profile_' + userId));

  const isChatParticipant = (chatId) => {
    if (!isSignedIn) return false;
    const conv = firestoreDb.conversations[chatId] || firestoreDb.chats[chatId];
    if (!conv) return false;
    return conv.participants.includes(auth.uid) || conv.participants.includes(`profile_${auth.uid}`);
  };

  const isValidImage = () => contentType.startsWith('image/') && resourceSize < 25 * 1024 * 1024;
  const isValidVideo = () => contentType.startsWith('video/') && resourceSize < 200 * 1024 * 1024;
  const isValidAudio = () => contentType.startsWith('audio/') && resourceSize < 50 * 1024 * 1024;
  const isValidMedia = () => isValidImage() || isValidVideo() || isValidAudio();

  // Route path matching
  const parts = targetPath.replace(/^\/+/, '').split('/');
  const section = parts[0];
  const secondParam = parts[1];

  // 1. /users/{userId}/{allPaths=**}
  if (section === 'users' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Owner media write' : 'Blocked: not owner or invalid media' };
    }
  }

  // 2. /avatars/{userId}/{allPaths=**}
  if (section === 'avatars' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public avatar read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidImage();
      return { allowed: ok, reason: ok ? 'Owner avatar write' : 'Blocked: not owner or not image' };
    }
  }

  // 3. /profiles/{userId}/{allPaths=**}
  if (section === 'profiles' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public profile media read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidImage();
      return { allowed: ok, reason: ok ? 'Owner profile media write' : 'Blocked: not owner' };
    }
  }

  // 4. /posts/{userId}/{allPaths=**}
  if (section === 'posts' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public post read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Owner post write' : 'Blocked: not owner' };
    }
  }

  // 5. /videos/{userId}/{allPaths=**}
  if (section === 'videos' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public video read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidVideo();
      return { allowed: ok, reason: ok ? 'Owner video write' : 'Blocked: not owner or not video' };
    }
  }

  // 6. /stories/{userId}/{allPaths=**}
  if (section === 'stories' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') return { allowed: true, reason: 'Public story read' };
    if (method === 'write') {
      const ok = isOwner(userId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Owner story write' : 'Blocked: not owner' };
    }
  }

  // 7. /vault/{userId}/{allPaths=**} (Strict Owner Only)
  if (section === 'vault' && parts.length >= 3) {
    const userId = secondParam;
    if (method === 'read') {
      const ok = isOwner(userId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Owner vault read' : 'Blocked: strictly owner only' };
    }
    if (method === 'write') {
      const ok = isOwner(userId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Owner vault write' : 'Blocked: strictly owner only' };
    }
  }

  // 8. /chats/{chatId}/{allPaths=**}
  if (section === 'chats' && parts.length >= 3) {
    const chatId = secondParam;
    if (method === 'read') {
      const ok = isChatParticipant(chatId);
      return { allowed: ok, reason: ok ? 'Participant chat read' : 'Blocked: not a conversation participant' };
    }
    if (method === 'write') {
      const ok = isChatParticipant(chatId) && isValidMedia();
      return { allowed: ok, reason: ok ? 'Participant chat upload' : 'Blocked: not a participant or invalid media' };
    }
  }

  // Fallback: Default Deny
  return { allowed: false, reason: 'Default Deny for unmatched or unsegmented path' };
}

// -------------------------------------------------------------
// Attack Test Cases Matrix
// -------------------------------------------------------------
const testCases = [
  // 1. Storage Avatar Hijack Attack
  {
    name: 'ATTACK: User A attempts to overwrite User B avatar',
    scenario: { path: '/avatars/user_bob/avatar.jpg', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/jpeg' },
    expectedAllowed: false
  },
  {
    name: 'LEGIT: User B uploads own avatar',
    scenario: { path: '/avatars/user_bob/avatar.jpg', method: 'write', auth: { uid: 'user_bob' }, contentType: 'image/jpeg' },
    expectedAllowed: true
  },
  {
    name: 'ATTACK: Unauthenticated attacker writes to User B avatar',
    scenario: { path: '/avatars/user_bob/avatar.jpg', method: 'write', auth: null, contentType: 'image/jpeg' },
    expectedAllowed: false
  },

  // 2. Storage Profile Photo Hijack Attack
  {
    name: 'ATTACK: User A attempts to overwrite User B profile photo',
    scenario: { path: '/profiles/user_bob/profile.jpg', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/jpeg' },
    expectedAllowed: false
  },
  {
    name: 'LEGIT: User A uploads own profile photo',
    scenario: { path: '/profiles/user_alice/profile.jpg', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/jpeg' },
    expectedAllowed: true
  },

  // 3. Vault Isolation Attacks (C-02)
  {
    name: 'ATTACK: User A attempts to READ User B private vault file',
    scenario: { path: '/vault/user_bob/secret_doc.png', method: 'read', auth: { uid: 'user_alice' }, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: User A attempts to WRITE malicious file to User B private vault',
    scenario: { path: '/vault/user_bob/malware.png', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: Unauthenticated attacker attempts to READ User B vault',
    scenario: { path: '/vault/user_bob/private_key.png', method: 'read', auth: null, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: Unauthenticated attacker attempts to WRITE to User B vault',
    scenario: { path: '/vault/user_bob/private_key.png', method: 'write', auth: null, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'LEGIT: User B reads own private vault file',
    scenario: { path: '/vault/user_bob/secret_doc.png', method: 'read', auth: { uid: 'user_bob' }, contentType: 'image/png' },
    expectedAllowed: true
  },
  {
    name: 'LEGIT: User B writes new file to own private vault',
    scenario: { path: '/vault/user_bob/my_note.png', method: 'write', auth: { uid: 'user_bob' }, contentType: 'image/png' },
    expectedAllowed: true
  },
  {
    name: 'LEGIT: User B writes new file to own private vault using profile ID (/vault/profile_user_bob/my_note.png)',
    scenario: { path: '/vault/profile_user_bob/my_note.png', method: 'write', auth: { uid: 'user_bob' }, contentType: 'image/png' },
    expectedAllowed: true
  },

  // 4. Root Vault Escape Attack
  {
    name: 'ATTACK: Attacker writes to root /vault/exploit.png without userId folder',
    scenario: { path: '/vault/exploit.png', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: Attacker reads root /vault/exploit.png',
    scenario: { path: '/vault/exploit.png', method: 'read', auth: { uid: 'user_alice' }, contentType: 'image/png' },
    expectedAllowed: false
  },

  // 5. Chat Media Isolation Attacks (C-03)
  {
    name: 'ATTACK: Non-participant (user_eve) attempts to READ chat media from chat_legit_101',
    scenario: { path: '/chats/chat_legit_101/voice_note.mp3', method: 'read', auth: { uid: 'user_eve' }, contentType: 'audio/mpeg' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: Non-participant (user_eve) attempts to UPLOAD attachment to chat_legit_101',
    scenario: { path: '/chats/chat_legit_101/spam.png', method: 'write', auth: { uid: 'user_eve' }, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: Unauthenticated client attempts to READ chat media from chat_legit_101',
    scenario: { path: '/chats/chat_legit_101/image.png', method: 'read', auth: null, contentType: 'image/png' },
    expectedAllowed: false
  },
  {
    name: 'LEGIT: Participant Alice READS chat media from chat_legit_101',
    scenario: { path: '/chats/chat_legit_101/photo.jpg', method: 'read', auth: { uid: 'user_alice' }, contentType: 'image/jpeg' },
    expectedAllowed: true
  },
  {
    name: 'LEGIT: Participant Bob UPLOADS attachment to chat_legit_101',
    scenario: { path: '/chats/chat_legit_101/photo.jpg', method: 'write', auth: { uid: 'user_bob' }, contentType: 'image/jpeg' },
    expectedAllowed: true
  },

  // 6. Public Media / Posts / Stories / Videos (H-08 Alignment)
  {
    name: 'POLICY: Unauthenticated client reads public post image',
    scenario: { path: '/posts/user_bob/post123.jpg', method: 'read', auth: null, contentType: 'image/jpeg' },
    expectedAllowed: true
  },
  {
    name: 'POLICY: Unauthenticated client reads public story media',
    scenario: { path: '/stories/user_bob/story456.jpg', method: 'read', auth: null, contentType: 'image/jpeg' },
    expectedAllowed: true
  },
  {
    name: 'ATTACK: User A attempts to write post image directly into User B folder',
    scenario: { path: '/posts/user_bob/fake_post.jpg', method: 'write', auth: { uid: 'user_alice' }, contentType: 'image/jpeg' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: User A attempts to write video directly into User B folder',
    scenario: { path: '/videos/user_bob/fake_reel.mp4', method: 'write', auth: { uid: 'user_alice' }, contentType: 'video/mp4' },
    expectedAllowed: false
  },
  {
    name: 'LEGIT: User Bob uploads video to his own folder',
    scenario: { path: '/videos/user_bob/reel_1.mp4', method: 'write', auth: { uid: 'user_bob' }, contentType: 'video/mp4' },
    expectedAllowed: true
  },

  // 7. Non-Media File Injection Attacks
  {
    name: 'ATTACK: User attempts to upload executable .exe as media',
    scenario: { path: '/posts/user_bob/virus.exe', method: 'write', auth: { uid: 'user_bob' }, contentType: 'application/x-msdownload' },
    expectedAllowed: false
  },
  {
    name: 'ATTACK: User attempts to upload oversized image (>25MB) to posts',
    scenario: { path: '/posts/user_bob/huge.jpg', method: 'write', auth: { uid: 'user_bob' }, contentType: 'image/jpeg', resourceSize: 30 * 1024 * 1024 },
    expectedAllowed: false
  }
];

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const result = evaluateStorageRule(tc.scenario);
  const success = result.allowed === tc.expectedAllowed;
  if (success) {
    passed++;
    console.log(`✅ PASS: ${tc.name}`);
    console.log(`   └─ Outcome: ${result.allowed ? 'ALLOW' : 'DENY'} (${result.reason})\n`);
  } else {
    failed++;
    console.error(`❌ FAIL: ${tc.name}`);
    console.error(`   └─ Expected: ${tc.expectedAllowed ? 'ALLOW' : 'DENY'}, Got: ${result.allowed ? 'ALLOW' : 'DENY'} (${result.reason})\n`);
  }
}

console.log('=========================================================');
console.log(`Test Results: ${passed} PASSED, ${failed} FAILED (Total: ${testCases.length})`);
console.log('=========================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
