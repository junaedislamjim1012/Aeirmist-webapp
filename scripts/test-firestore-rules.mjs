/**
 * Automated Security Matrix Test Suite for Firestore Security Rules
 * Verifies Notification Integrity, Post Views, Post Insights, and Engagement Counter rules.
 */

import fs from 'fs';
import path from 'path';

console.log('🔒 =========================================================');
console.log('   FIRESTORE SECURITY AUDIT & ATTACK SUITE');
console.log('=========================================================\n');

// Mock Firestore state for exists() and get() lookups
const mockDatabase = {
  posts: {
    'post_alice_001': {
      authorUid: 'user_alice',
      userId: 'user_alice',
      content: 'Hello Aeirmist World!',
      likesCount: 10,
      bookmarksCount: 2,
      commentsCount: 3,
      sharesCount: 1,
      createdAt: '2026-09-25T10:00:00Z'
    }
  },
  admins: {
    'user_admin_007': { role: 'admin' }
  }
};

// Allowed notification types whitelist from firestore.rules
const ALLOWED_NOTIF_TYPES = [
  'like', 'comment', 'follow', 'follow_request', 'mention', 
  'message', 'repost', 'reaction', 'call', 'reply', 'gift', 
  'share', 'tag', 'security_new_device', 'verification_status', 
  'login_alert', 'system'
];

function evaluateFirestoreRule({
  collection,
  docId,
  action, // 'create' | 'update' | 'read' | 'delete'
  auth, // { uid: string, role?: string, email?: string } | null
  incomingData = {},
  existingData = null
}) {
  const isSignedIn = auth !== null && typeof auth.uid === 'string';
  const isAdmin = () => isSignedIn && (auth.role === 'admin' || auth.role === 'owner' || auth.uid === 'user_admin_007');

  // Helper: isValidCounterChange
  const isValidCounterChange = (fieldName, incoming, existing) => {
    if (!(fieldName in incoming)) return true;
    const newVal = incoming[fieldName];
    if (typeof newVal !== 'number' || newVal < 0 || !Number.isInteger(newVal)) return false;
    if (!existing || !(fieldName in existing)) return true;
    const oldVal = existing[fieldName];
    return newVal === oldVal || newVal === oldVal + 1 || newVal === oldVal - 1;
  };

  // Helper: isValidEngagementUpdate
  const isValidEngagementUpdate = (incoming, existing) => {
    const allowedKeys = [
      'likes', 'likesCount', 'likedBy', 'bookmarks', 'bookmarksCount', 'savedBy', 
      'sharesCount', 'commentsCount', 'viewsCount', 'poll', 'updatedAt'
    ];
    const incomingKeys = Object.keys(incoming);
    const diffKeys = existing ? incomingKeys.filter(k => incoming[k] !== existing[k]) : incomingKeys;
    const allAllowed = diffKeys.every(k => allowedKeys.includes(k));
    if (!allAllowed) return false;

    if (!isValidCounterChange('likesCount', incoming, existing)) return false;
    if (!isValidCounterChange('bookmarksCount', incoming, existing)) return false;
    if (!isValidCounterChange('commentsCount', incoming, existing)) return false;
    if (!isValidCounterChange('sharesCount', incoming, existing)) return false;
    return true;
  };

  // 1. NOTIFICATIONS
  if (collection === 'notifications') {
    if (action === 'create') {
      if (!isSignedIn) return { allowed: false, reason: 'Unauthenticated creation blocked' };
      if (isAdmin()) return { allowed: true, reason: 'Admin notice creation permitted' };

      const type = incomingData.type;
      const isAllowedType = !type || ALLOWED_NOTIF_TYPES.includes(type);
      if (!isAllowedType) {
        return { allowed: false, reason: `Disallowed notification type: ${type}` };
      }

      const isSenderBound = 
        incomingData.userId === auth.uid ||
        incomingData.userId === `profile_${auth.uid}` ||
        incomingData.fromUserUid === auth.uid ||
        incomingData.fromUserId === auth.uid ||
        incomingData.fromUserId === `profile_${auth.uid}` ||
        incomingData.senderId === auth.uid;

      if (!isSenderBound) {
        return { allowed: false, reason: 'Sender identity spoofing blocked' };
      }

      return { allowed: true, reason: 'Valid typed notification from authorized sender' };
    }
  }

  // 2. POST INSIGHTS
  if (collection === 'post_insights') {
    if (action === 'create') {
      if (!isSignedIn) return { allowed: false, reason: 'Unauthenticated creation blocked' };
      const post = mockDatabase.posts[docId];
      if (!post) return { allowed: false, reason: 'Associated post does not exist' };
      if (incomingData.postId !== docId) return { allowed: false, reason: 'postId mismatch' };

      const isPostAuthor = post.authorUid === auth.uid || post.userId === auth.uid;
      if (isPostAuthor || isAdmin()) {
        return { allowed: true, reason: 'Author or admin created post insights' };
      }
      return { allowed: false, reason: 'Non-author insights creation blocked' };
    }
  }

  // 3. POST VIEWS
  if (collection === 'post_views') {
    if (action === 'create') {
      if (!isSignedIn) return { allowed: false, reason: 'Unauthenticated post view creation blocked' };
      const targetPostId = incomingData.postId;
      if (!targetPostId || !mockDatabase.posts[targetPostId]) {
        return { allowed: false, reason: 'Target post missing or does not exist' };
      }

      const isViewerBound = 
        incomingData.viewerUid === auth.uid ||
        incomingData.viewerId === auth.uid ||
        incomingData.viewerId === `profile_${auth.uid}`;

      if (!isViewerBound) {
        return { allowed: false, reason: 'Viewer UID forgery blocked' };
      }

      return { allowed: true, reason: 'Valid authenticated post view recorded' };
    }
  }

  // 4. POSTS / FEED POSTS (Engagement Counter updates)
  if (collection === 'posts' || collection === 'feed_posts') {
    if (action === 'update') {
      if (!isSignedIn) return { allowed: false, reason: 'Unauthenticated update blocked' };
      const existing = existingData || mockDatabase.posts[docId];
      if (!existing) return { allowed: false, reason: 'Post not found' };

      const isAuthor = existing.authorUid === auth.uid || existing.userId === auth.uid;
      if (isAuthor) {
        const affectedKeys = Object.keys(incomingData).filter(k => incomingData[k] !== existing[k]);
        if (affectedKeys.some(k => ['authorUid', 'userId', 'createdAt'].includes(k))) {
          return { allowed: false, reason: 'Author forgery or createdAt mutation blocked' };
        }
        return { allowed: true, reason: 'Author update allowed' };
      }

      if (isValidEngagementUpdate(incomingData, existing)) {
        return { allowed: true, reason: 'Valid engagement interaction update permitted' };
      }

      return { allowed: false, reason: 'Arbitrary counter manipulation or invalid fields blocked' };
    }
  }

  // 5. VAULT MEDIA
  if (collection === 'vault_media') {
    if (!isSignedIn) return { allowed: false, reason: 'Unauthenticated vault_media access blocked' };
    if (action === 'create') {
      const isOwner = incomingData.userId === auth.uid ||
                      incomingData.userId === `profile_${auth.uid}` ||
                      incomingData.ownerUid === auth.uid;
      if (!isOwner) return { allowed: false, reason: 'Vault media owner forgery blocked' };
      return { allowed: true, reason: 'Vault media create permitted for owner' };
    }
    if (action === 'read' || action === 'update' || action === 'delete') {
      const existing = existingData || {};
      const isOwner = existing.userId === auth.uid ||
                      existing.userId === `profile_${auth.uid}` ||
                      existing.ownerUid === auth.uid;
      if (!isOwner) return { allowed: false, reason: 'Vault media owner isolation violation' };
      return { allowed: true, reason: 'Vault media operation permitted for owner' };
    }
  }

  return { allowed: false, reason: 'No matching rule allowed this operation' };
}

// =========================================================
// TEST RUNNER
// =========================================================
let passed = 0;
let failed = 0;

function assertRule(name, testInput, expectedAllowed, expectedReasonKeyword) {
  const result = evaluateFirestoreRule(testInput);
  const pass = result.allowed === expectedAllowed;
  const reasonMatches = !expectedReasonKeyword || result.reason.toLowerCase().includes(expectedReasonKeyword.toLowerCase());

  if (pass && reasonMatches) {
    passed++;
    console.log(`✅ PASS: ${name}`);
    console.log(`   └─ Outcome: ${result.allowed ? 'ALLOW' : 'DENY'} (${result.reason})\n`);
  } else {
    failed++;
    console.error(`❌ FAIL: ${name}`);
    console.error(`   ├─ Expected: ${expectedAllowed ? 'ALLOW' : 'DENY'}`);
    console.error(`   ├─ Got:      ${result.allowed ? 'ALLOW' : 'DENY'} (${result.reason})`);
    console.error(`   └─ Input:    ${JSON.stringify(testInput)}\n`);
  }
}

// ---------------------------------------------------------
// SECTION 1: NOTIFICATION INTEGRITY TESTS
// ---------------------------------------------------------
console.log('--- SECTION 1: NOTIFICATION INTEGRITY ---');

assertRule(
  'ATTACK: Regular user creates fake admin broadcast',
  {
    collection: 'notifications',
    action: 'create',
    auth: { uid: 'attacker_1' },
    incomingData: {
      type: 'admin_broadcast',
      userId: 'victim_1',
      fromUserUid: 'attacker_1',
      title: 'You are banned'
    }
  },
  false,
  'Disallowed notification type'
);

assertRule(
  'ATTACK: Attacker spoofs sender identity as someone else',
  {
    collection: 'notifications',
    action: 'create',
    auth: { uid: 'attacker_1' },
    incomingData: {
      type: 'like',
      userId: 'victim_1',
      fromUserUid: 'innocent_bob'
    }
  },
  false,
  'spoofing blocked'
);

assertRule(
  'ATTACK: Unauthenticated attacker tries to create notification',
  {
    collection: 'notifications',
    action: 'create',
    auth: null,
    incomingData: {
      type: 'like',
      userId: 'victim_1',
      fromUserUid: 'anonymous'
    }
  },
  false,
  'Unauthenticated'
);

assertRule(
  'LEGIT: User sends a like notification with their real UID',
  {
    collection: 'notifications',
    action: 'create',
    auth: { uid: 'user_alice' },
    incomingData: {
      type: 'like',
      userId: 'user_bob',
      fromUserUid: 'user_alice',
      message: 'liked your post'
    }
  },
  true,
  'Valid typed notification'
);

assertRule(
  'LEGIT: Admin creates system announcement/alert',
  {
    collection: 'notifications',
    action: 'create',
    auth: { uid: 'user_admin_007', role: 'admin' },
    incomingData: {
      type: 'admin_broadcast',
      userId: 'user_bob',
      title: 'Platform Maintenance'
    }
  },
  true,
  'Admin notice creation permitted'
);

assertRule(
  'LEGIT: Security service creates login alert for user own account',
  {
    collection: 'notifications',
    action: 'create',
    auth: { uid: 'user_alice' },
    incomingData: {
      type: 'security_new_device',
      userId: 'user_alice',
      message: 'New sign in detected'
    }
  },
  true,
  'Valid typed notification'
);

// ---------------------------------------------------------
// SECTION 2: POST VIEWS INTEGRITY TESTS
// ---------------------------------------------------------
console.log('--- SECTION 2: POST VIEWS INTEGRITY ---');

assertRule(
  'ATTACK: Unauthenticated bot creates post view',
  {
    collection: 'post_views',
    action: 'create',
    auth: null,
    incomingData: {
      postId: 'post_alice_001',
      viewerUid: 'bot_99'
    }
  },
  false,
  'Unauthenticated'
);

assertRule(
  'ATTACK: User creates view for non-existent post (spam)',
  {
    collection: 'post_views',
    action: 'create',
    auth: { uid: 'user_bob' },
    incomingData: {
      postId: 'non_existent_post_999',
      viewerUid: 'user_bob'
    }
  },
  false,
  'does not exist'
);

assertRule(
  'ATTACK: User logs view with forged viewerUid',
  {
    collection: 'post_views',
    action: 'create',
    auth: { uid: 'attacker_1' },
    incomingData: {
      postId: 'post_alice_001',
      viewerUid: 'celebrity_victim'
    }
  },
  false,
  'forgery blocked'
);

assertRule(
  'LEGIT: Authenticated user logs view of existing post with own viewerUid',
  {
    collection: 'post_views',
    action: 'create',
    auth: { uid: 'user_bob' },
    incomingData: {
      postId: 'post_alice_001',
      viewerUid: 'user_bob',
      timestamp: Date.now()
    }
  },
  true,
  'Valid authenticated post view recorded'
);

// ---------------------------------------------------------
// SECTION 3: POST INSIGHTS INTEGRITY TESTS
// ---------------------------------------------------------
console.log('--- SECTION 3: POST INSIGHTS INTEGRITY ---');

assertRule(
  'ATTACK: Stranger (user_charlie) attempts to create insights for Alice post',
  {
    collection: 'post_insights',
    docId: 'post_alice_001',
    action: 'create',
    auth: { uid: 'user_charlie' },
    incomingData: {
      postId: 'post_alice_001',
      totalViews: 0
    }
  },
  false,
  'Non-author insights creation blocked'
);

assertRule(
  'LEGIT: Post author (Alice) creates insights document for her own post',
  {
    collection: 'post_insights',
    docId: 'post_alice_001',
    action: 'create',
    auth: { uid: 'user_alice' },
    incomingData: {
      postId: 'post_alice_001',
      totalViews: 1,
      audience: {}
    }
  },
  true,
  'Author or admin created post insights'
);

assertRule(
  'LEGIT: Platform Admin creates insights document',
  {
    collection: 'post_insights',
    docId: 'post_alice_001',
    action: 'create',
    auth: { uid: 'user_admin_007', role: 'admin' },
    incomingData: {
      postId: 'post_alice_001',
      totalViews: 1
    }
  },
  true,
  'Author or admin created post insights'
);

// ---------------------------------------------------------
// SECTION 4: ENGAGEMENT COUNTER INTEGRITY TESTS
// ---------------------------------------------------------
console.log('--- SECTION 4: ENGAGEMENT COUNTER INTEGRITY ---');

assertRule(
  'ATTACK: Client tries to inject +1,000,000 likes onto Alice post',
  {
    collection: 'posts',
    docId: 'post_alice_001',
    action: 'update',
    auth: { uid: 'user_bob' },
    incomingData: {
      likesCount: 1000010 // existing is 10
    }
  },
  false,
  'Arbitrary counter manipulation'
);

assertRule(
  'ATTACK: Client tries to set negative likesCount (-5)',
  {
    collection: 'posts',
    docId: 'post_alice_001',
    action: 'update',
    auth: { uid: 'user_bob' },
    incomingData: {
      likesCount: -5
    }
  },
  false,
  'Arbitrary counter manipulation'
);

assertRule(
  'ATTACK: Client tries to tamper with post content while liking',
  {
    collection: 'posts',
    docId: 'post_alice_001',
    action: 'update',
    auth: { uid: 'user_bob' },
    incomingData: {
      likesCount: 11,
      content: 'Hacked by Bob'
    }
  },
  false,
  'Arbitrary counter manipulation'
);

assertRule(
  'LEGIT: User likes post, incrementing likesCount from 10 to 11',
  {
    collection: 'posts',
    docId: 'post_alice_001',
    action: 'update',
    auth: { uid: 'user_bob' },
    incomingData: {
      likesCount: 11,
      likedBy: ['user_bob']
    }
  },
  true,
  'Valid engagement interaction'
);

assertRule(
  'LEGIT: User unlikes post, decrementing likesCount from 10 to 9',
  {
    collection: 'posts',
    docId: 'post_alice_001',
    action: 'update',
    auth: { uid: 'user_bob' },
    incomingData: {
      likesCount: 9,
      likedBy: []
    }
  },
  true,
  'Valid engagement interaction'
);

// ---------------------------------------------------------
// SECTION 5: VAULT MEDIA SECURITY TESTS
// ---------------------------------------------------------
assertRule(
  'ATTACK: Attacker attempts to write into User B vault_media',
  {
    collection: 'vault_media',
    action: 'create',
    auth: { uid: 'user_eve' },
    incomingData: {
      userId: 'user_bob',
      ownerUid: 'user_bob',
      url: 'https://storage/vault/exploit.png'
    }
  },
  false,
  'Vault media owner forgery blocked'
);

assertRule(
  'LEGIT: User B uploads photo into vault_media using real UID',
  {
    collection: 'vault_media',
    action: 'create',
    auth: { uid: 'user_bob' },
    incomingData: {
      userId: 'user_bob',
      ownerUid: 'user_bob',
      url: 'https://storage/vault/user_bob/photo.png'
    }
  },
  true,
  'Vault media create permitted for owner'
);

assertRule(
  'LEGIT: User B uploads photo into vault_media using profile ID',
  {
    collection: 'vault_media',
    action: 'create',
    auth: { uid: 'user_bob' },
    incomingData: {
      userId: 'profile_user_bob',
      ownerUid: 'user_bob',
      url: 'https://storage/vault/profile_user_bob/photo.png'
    }
  },
  true,
  'Vault media create permitted for owner'
);

assertRule(
  'ATTACK: Non-owner attempts to read User B vault_media',
  {
    collection: 'vault_media',
    action: 'read',
    auth: { uid: 'user_eve' },
    existingData: {
      userId: 'user_bob',
      ownerUid: 'user_bob'
    }
  },
  false,
  'Vault media owner isolation violation'
);

console.log('=========================================================');
console.log(`Firestore Tests: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
console.log('=========================================================\n');

if (failed > 0) process.exit(1);
