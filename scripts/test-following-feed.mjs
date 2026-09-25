/**
 * Verification Test Suite for Feed Following Mode & ID Reconciliation
 */

console.log('📰 =========================================================');
console.log('   FEED FOLLOWING FILTER & IDENTITY RUNTIME TEST');
console.log('=========================================================\n');

function filterFollowingPosts(candidateList, profile, user, feedMode) {
  const myProfileId = profile?.id || '';
  const myUid = user?.uid || '';
  const following = (profile?.social?.following || []).filter(Boolean);
  const followers = (profile?.social?.followers || []).filter(Boolean);
  const blockedList = new Set(profile?.social?.blocked || []);
  const mutedCreators = new Set(profile?.mutedCreators || []);

  return candidateList.filter(p => {
    const authorId = p.authorId || p.authorUid || p.author?.id || '';
    const authorUid = p.authorUid || p.author?.uid || '';
    const isOwnPost = authorId === myProfileId || authorUid === myUid;

    if (!isOwnPost && (blockedList.has(authorId) || blockedList.has(authorUid))) {
      return false;
    }
    if (!isOwnPost && (mutedCreators.has(authorId) || mutedCreators.has(authorUid))) {
      return false;
    }

    if (feedMode === 'following') {
      const authorCandidates = [
        p.authorId,
        p.authorUid,
        p.userId,
        p.author?.id,
        p.author?.uid,
        authorId,
        authorUid
      ].filter(Boolean);

      const followingSet = new Set([
        ...following,
        ...following.map((id) => id.replace(/^profile_/, '')),
        ...following.map((id) => 'profile_' + id.replace(/^profile_/, ''))
      ]);

      return authorCandidates.some(id => followingSet.has(id));
    }

    return true;
  });
}

// Test cases
const mockPosts = [
  { id: 'post_bob_1', authorId: 'user_bob', authorUid: 'user_bob', title: 'Bob Post 1' },
  { id: 'post_bob_legacy', authorId: 'profile_user_bob', authorUid: '', title: 'Bob Legacy Profile Post' },
  { id: 'post_charlie_1', authorId: 'user_charlie', authorUid: 'user_charlie', title: 'Charlie Post (Not Followed)' },
  { id: 'post_blocked_david', authorId: 'user_david', authorUid: 'user_david', title: 'David (Blocked)' },
  { id: 'post_muted_emily', authorId: 'user_emily', authorUid: 'user_emily', title: 'Emily (Muted)' }
];

let testPassed = 0;
let testTotal = 0;

function assert(description, condition) {
  testTotal++;
  if (condition) {
    testPassed++;
    console.log(`✅ PASS: ${description}`);
  } else {
    console.error(`❌ FAIL: ${description}`);
  }
}

// 1. Initial State: Alice follows Bob only
let aliceProfile = {
  id: 'profile_alice',
  social: {
    following: ['user_bob'],
    blocked: ['user_david']
  },
  mutedCreators: ['user_emily']
};
let aliceUser = { uid: 'alice' };

let result = filterFollowingPosts(mockPosts, aliceProfile, aliceUser, 'following');
assert('Bob standard post is included in Following feed', result.some(p => p.id === 'post_bob_1'));
assert('Bob legacy profile_ post is included in Following feed via prefix reconciliation', result.some(p => p.id === 'post_bob_legacy'));
assert('Charlie (not followed) is EXCLUDED from Following feed', !result.some(p => p.id === 'post_charlie_1'));
assert('David (blocked) is EXCLUDED from Following feed', !result.some(p => p.id === 'post_blocked_david'));
assert('Emily (muted) is EXCLUDED from Following feed', !result.some(p => p.id === 'post_muted_emily'));

// 2. Unfollow Bob: Alice unfollows Bob
aliceProfile.social.following = [];
result = filterFollowingPosts(mockPosts, aliceProfile, aliceUser, 'following');
assert('After unfollow, Bob standard post is IMMEDIATELY DROPPED', !result.some(p => p.id === 'post_bob_1'));
assert('After unfollow, Bob legacy post is IMMEDIATELY DROPPED', !result.some(p => p.id === 'post_bob_legacy'));
assert('Following feed is empty when 0 creators are followed', result.length === 0);

// 3. Follow Charlie: Alice follows Charlie
aliceProfile.social.following = ['user_charlie'];
result = filterFollowingPosts(mockPosts, aliceProfile, aliceUser, 'following');
assert('After following Charlie, Charlie post appears', result.some(p => p.id === 'post_charlie_1'));
assert('Bob remains excluded when not in following list', !result.some(p => p.id === 'post_bob_1'));

// 4. Follow with legacy prefix: Alice follows Bob using 'profile_user_bob'
aliceProfile.social.following = ['profile_user_bob'];
result = filterFollowingPosts(mockPosts, aliceProfile, aliceUser, 'following');
assert('Following with profile_ prefix correctly matches bare UID posts', result.some(p => p.id === 'post_bob_1'));
assert('Following with profile_ prefix correctly matches profile_ prefix posts', result.some(p => p.id === 'post_bob_legacy'));

console.log('\n=========================================================');
console.log(`Feed Tests: ${testPassed} PASSED, ${testTotal - testPassed} FAILED (Total: ${testTotal})`);
console.log('=========================================================\n');

if (testPassed !== testTotal) process.exit(1);
