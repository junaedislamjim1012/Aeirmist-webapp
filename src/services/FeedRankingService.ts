import { logger } from '@/src/utils/logger';

export type FeedMode = 'smart' | 'latest' | 'following' | 'friends' | 'saved';

export interface ScoreBreakdown {
  freshness: number;
  relationship: number;
  interests: number;
  engagement: number;
  quality: number;
  diversityPenalty: number;
  feedbackPenalty: number;
  total: number;
}

export interface RankingReason {
  type: 'following' | 'friend' | 'interest' | 'engagement' | 'fresh' | 'own_post';
  text: string;
  matchedInterest?: string;
  breakdown: ScoreBreakdown;
}

class FeedRankingService {
  private readonly MUTED_CREATORS_KEY = 'aeirmist_muted_creators';
  private readonly MUTED_TOPICS_KEY = 'aeirmist_muted_topics';
  private readonly NEGATIVE_WEIGHTS_KEY = 'aeirmist_feed_negative_weights';
  private readonly FEED_MODE_KEY = 'aeirmist_feed_mode';

  // ---------------------------------------------------------------------------
  // Preferences & Feedback Storage
  // ---------------------------------------------------------------------------

  public getFeedMode(): FeedMode {
    try {
      const saved = localStorage.getItem(this.FEED_MODE_KEY);
      if (saved && ['smart', 'latest', 'following', 'friends', 'saved'].includes(saved)) {
        return saved as FeedMode;
      }
    } catch (e) {
      logger.warn('[FeedRankingService] Failed to read feed mode:', e);
    }
    return 'smart';
  }

  public setFeedMode(mode: FeedMode): void {
    try {
      localStorage.setItem(this.FEED_MODE_KEY, mode);
    } catch (e) {
      logger.warn('[FeedRankingService] Failed to persist feed mode:', e);
    }
  }

  public getMutedCreators(): string[] {
    try {
      const data = localStorage.getItem(this.MUTED_CREATORS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public isCreatorMuted(creatorId: string): boolean {
    if (!creatorId) return false;
    return this.getMutedCreators().includes(creatorId);
  }

  public muteCreator(creatorId: string): void {
    if (!creatorId) return;
    try {
      const list = new Set(this.getMutedCreators());
      list.add(creatorId);
      localStorage.setItem(this.MUTED_CREATORS_KEY, JSON.stringify(Array.from(list)));
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
    } catch (e) {
      logger.error('[FeedRankingService] Failed to mute creator:', e);
    }
  }

  public unmuteCreator(creatorId: string): void {
    if (!creatorId) return;
    try {
      const list = this.getMutedCreators().filter(id => id !== creatorId);
      localStorage.setItem(this.MUTED_CREATORS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
    } catch (e) {
      logger.error('[FeedRankingService] Failed to unmute creator:', e);
    }
  }

  public getMutedTopics(): string[] {
    try {
      const data = localStorage.getItem(this.MUTED_TOPICS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public isTopicMuted(topic: string): boolean {
    if (!topic) return false;
    const clean = topic.toLowerCase().replace(/^#/, '').trim();
    return this.getMutedTopics().includes(clean);
  }

  public muteTopic(topic: string): void {
    if (!topic) return;
    const clean = topic.toLowerCase().replace(/^#/, '').trim();
    try {
      const list = new Set(this.getMutedTopics());
      list.add(clean);
      localStorage.setItem(this.MUTED_TOPICS_KEY, JSON.stringify(Array.from(list)));
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
    } catch (e) {
      logger.error('[FeedRankingService] Failed to mute topic:', e);
    }
  }

  public unmuteTopic(topic: string): void {
    if (!topic) return;
    const clean = topic.toLowerCase().replace(/^#/, '').trim();
    try {
      const list = this.getMutedTopics().filter(t => t !== clean);
      localStorage.setItem(this.MUTED_TOPICS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
    } catch (e) {
      logger.error('[FeedRankingService] Failed to unmute topic:', e);
    }
  }

  public getNegativeWeights(): Record<string, number> {
    try {
      const data = localStorage.getItem(this.NEGATIVE_WEIGHTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * Applies negative feedback ("Show less" or "Not interested")
   * @param key Creator ID or hashtag string
   * @param weightPenalty Default is 1 for "Show less", 2 for "Not interested"
   */
  public recordNegativeFeedback(key: string, weightPenalty: number = 1): void {
    if (!key) return;
    try {
      const weights = this.getNegativeWeights();
      weights[key] = (weights[key] || 0) + weightPenalty;
      localStorage.setItem(this.NEGATIVE_WEIGHTS_KEY, JSON.stringify(weights));
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
    } catch (e) {
      logger.error('[FeedRankingService] Failed to record negative feedback:', e);
    }
  }

  /**
   * Complete reset of all feed recommendation weights, muted topics, and muted creators
   */
  public resetRecommendations(): void {
    try {
      localStorage.removeItem(this.NEGATIVE_WEIGHTS_KEY);
      localStorage.removeItem(this.MUTED_CREATORS_KEY);
      localStorage.removeItem(this.MUTED_TOPICS_KEY);
      window.dispatchEvent(new CustomEvent('aeirmist-feed-updated'));
      logger.info('[FeedRankingService] Feed recommendations reset to clean defaults.');
    } catch (e) {
      logger.error('[FeedRankingService] Failed to reset recommendations:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // Post Extraction & Ranking
  // ---------------------------------------------------------------------------

  public getPostTimeMs(p: any): number {
    try {
      if (p.createdAt?.toDate) return p.createdAt.toDate().getTime();
      if (p.createdAt instanceof Date) return p.createdAt.getTime();
      if (p.createdAt?.seconds) return p.createdAt.seconds * 1000;
      if (typeof p.createdAt === 'number') return p.createdAt;
      if (p.__sortTime) return p.__sortTime;
      if (p.timestampMs) return p.timestampMs;
    } catch {
      return 0;
    }
    return 0;
  }

  /**
   * Extracts tags, hashtags, and keywords from a post for interest matching
   */
  private extractPostTopics(p: any): string[] {
    const topics: string[] = [];
    if (Array.isArray(p.tags)) {
      p.tags.forEach((t: any) => typeof t === 'string' && topics.push(t.toLowerCase().replace(/^#/, '')));
    }
    if (typeof p.category === 'string') {
      topics.push(p.category.toLowerCase());
    }
    if (typeof p.content === 'string') {
      const matches = p.content.match(/#(\w+)/g);
      if (matches) {
        matches.forEach((m: string) => topics.push(m.substring(1).toLowerCase()));
      }
    }
    return Array.from(new Set(topics));
  }

  /**
   * Deterministic hash for stable tie-breaking
   */
  private getDeterministicHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) / 100000;
  }

  /**
   * Main entry point to rank and filter posts for any feed mode.
   * Runs completely client-side: 0 expensive server queries!
   */
  public rankPosts(
    rawPosts: any[],
    options: {
      profile: any;
      user: any;
      feedMode: FeedMode;
      userInterests?: string[];
    }
  ): any[] {
    const { profile, user, feedMode, userInterests = [] } = options;
    const now = Date.now();

    // 1. Deduplicate by post ID
    const uniquePostsMap = new Map<string, any>();
    rawPosts.forEach(p => {
      if (p && p.id && !uniquePostsMap.has(p.id)) {
        uniquePostsMap.set(p.id, p);
      }
    });
    const candidateList = Array.from(uniquePostsMap.values());

    const myProfileId = profile?.id || '';
    const myUid = user?.uid || '';
    const following = (profile?.social?.following || []).filter(Boolean);
    const followers = (profile?.social?.followers || []).filter(Boolean);
    const closeFriends = (profile?.closeFriends || []).filter(Boolean);
    const mutedCreators = new Set(this.getMutedCreators());
    const mutedTopics = new Set(this.getMutedTopics());
    const negativeWeights = this.getNegativeWeights();

    // Normalize user interests
    const normalizedInterests = userInterests.map(i => i.toLowerCase().trim());

    // 2. Mode-specific filtering
    const eligiblePosts = candidateList.filter(p => {
      const authorId = p.authorId || p.authorUid || p.author?.id || '';
      const authorUid = p.authorUid || p.author?.uid || '';
      const isOwnPost = authorId === myProfileId || authorUid === myUid;

      // Filter out blocked users (Meta-style: never show blocked users in feed)
      const blockedList = new Set(profile?.social?.blocked || []);
      if (!isOwnPost && (blockedList.has(authorId) || blockedList.has(authorUid))) {
        return false;
      }
      const authorBlocked = p.author?.social?.blocked || [];
      if (!isOwnPost && (authorBlocked.includes(myProfileId) || (myUid && authorBlocked.includes(myUid)))) {
        return false;
      }

      // Filter out muted creators (except user's own posts)
      if (!isOwnPost && (mutedCreators.has(authorId) || mutedCreators.has(authorUid))) {
        return false;
      }

      // Filter out muted topics
      const postTopics = this.extractPostTopics(p);
      if (postTopics.some(t => mutedTopics.has(t))) {
        return false;
      }

      // Mode: Saved / Bookmarked
      if (feedMode === 'saved') {
        const isSaved = Boolean(
          p.isSaved ||
          p.savedBy?.includes(myProfileId) ||
          p.savedBy?.includes(myUid) ||
          (p.bookmarks && p.bookmarks[myProfileId])
        );
        return isSaved;
      }

      // Mode: Following
      if (feedMode === 'following') {
        // Strictly posts from followed accounts (user's real following list)
        const isFollowed = following.includes(authorId) || following.includes(authorUid);
        return isFollowed;
      }

      // Mode: Friends (Mutual follows or Close Friends)
      if (feedMode === 'friends') {
        const isMutual = (following.includes(authorId) && followers.includes(authorId)) ||
                         (following.includes(authorUid) && followers.includes(authorUid));
        const isCloseFriend = closeFriends.includes(authorId) || closeFriends.includes(authorUid);
        return isMutual || isCloseFriend;
      }

      // For 'smart' and 'latest' modes, allow visible public posts, followed posts, and own posts
      return true;
    });

    // 3. Sorting & Scoring

    // Pure Chronological Sort for Latest, Following, Friends, and Saved
    if (feedMode === 'latest' || feedMode === 'following' || feedMode === 'friends' || feedMode === 'saved') {
      return eligiblePosts.sort((a, b) => this.getPostTimeMs(b) - this.getPostTimeMs(a)).map(p => {
        const authorId = p.authorId || p.authorUid || '';
        const isFollowed = following.includes(authorId);
        const isMutual = isFollowed && followers.includes(authorId);
        const isOwn = authorId === myProfileId;

        let reasonType: RankingReason['type'] = 'fresh';
        let reasonText = 'Latest post in chronological order';
        if (feedMode === 'following') {
          reasonType = 'following';
          reasonText = `You follow @${p.author?.name || p.authorName || 'creator'}`;
        } else if (feedMode === 'friends') {
          reasonType = 'friend';
          reasonText = isMutual ? 'Mutual connection' : 'Close Friend';
        } else if (feedMode === 'saved') {
          reasonType = 'fresh';
          reasonText = 'Saved in your bookmarks';
        } else if (isOwn) {
          reasonType = 'own_post';
          reasonText = 'Posted by you';
        }

        return {
          ...p,
          _rankingReason: {
            type: reasonType,
            text: reasonText,
            breakdown: {
              freshness: 100,
              relationship: 0,
              interests: 0,
              engagement: 0,
              quality: 0,
              diversityPenalty: 0,
              feedbackPenalty: 0,
              total: 100
            }
          }
        };
      });
    }

    // -------------------------------------------------------------------------
    // Smart Mode: Multi-Signal Ranking Algorithm with Diversity Penalty
    // -------------------------------------------------------------------------
    interface ScoredPost {
      post: any;
      authorId: string;
      baseScore: number;
      freshness: number;
      relationship: number;
      interests: number;
      engagement: number;
      quality: number;
      feedbackPenalty: number;
      reasonType: RankingReason['type'];
      reasonText: string;
      matchedInterest?: string;
    }

    const scoredItems: ScoredPost[] = eligiblePosts.map(p => {
      const authorId = p.authorId || p.authorUid || p.author?.id || 'unknown';
      const authorUid = p.authorUid || p.author?.uid || '';
      const isOwnPost = authorId === myProfileId || authorUid === myUid;
      const isMutual = (following.includes(authorId) && followers.includes(authorId)) ||
                       (following.includes(authorUid) && followers.includes(authorUid));
      const isFollowed = following.includes(authorId) || following.includes(authorUid);
      const postTime = this.getPostTimeMs(p);
      const ageHours = Math.max(0.1, (now - postTime) / 3600000);

      // Signal 1: Freshness (smooth exponential decay over 36 hours)
      const freshness = Math.max(5, Math.round(100 * Math.exp(-ageHours / 36)));

      // Signal 2: Relationship
      let relationship = 0;
      let reasonType: RankingReason['type'] = 'fresh';
      let reasonText = 'Recent update on Aeirmist';

      if (isOwnPost) {
        relationship = 25;
        reasonType = 'own_post';
        reasonText = 'Shared by you';
      } else if (isMutual) {
        relationship = 65;
        reasonType = 'friend';
        reasonText = 'Mutual connection';
      } else if (isFollowed) {
        relationship = 45;
        reasonType = 'following';
        reasonText = `You follow @${p.author?.name || p.authorName || 'creator'}`;
      } else {
        relationship = 10;
      }

      // Signal 3: Interests Matching
      const postTopics = this.extractPostTopics(p);
      let interestsScore = 0;
      let matchedInterest: string | undefined = undefined;

      if (normalizedInterests.length > 0 && postTopics.length > 0) {
        for (const topic of postTopics) {
          const match = normalizedInterests.find(ui => ui.includes(topic) || topic.includes(ui));
          if (match) {
            interestsScore += 30;
            if (!matchedInterest) {
              matchedInterest = match.charAt(0).toUpperCase() + match.slice(1);
            }
          }
        }
        interestsScore = Math.min(60, interestsScore);
        if (interestsScore > 0 && !isFollowed && !isMutual) {
          reasonType = 'interest';
          reasonText = `Based on your interest in ${matchedInterest}`;
        }
      }

      // Signal 4: Engagement (likes, comments, views)
      const likes = Number(p.likesCount || 0);
      const comments = Number(p.commentsCount || 0);
      const shares = Number(p.sharesCount || 0);
      const engagement = Math.min(80, Math.round(likes * 2 + comments * 4 + shares * 6));
      if (engagement >= 30 && reasonType === 'fresh') {
        reasonType = 'engagement';
        reasonText = 'High community engagement';
      }

      // Signal 5: Content Quality (Media, formatting, verified author)
      let quality = 0;
      if (p.mediaUrls && p.mediaUrls.length > 0) quality += 15;
      else if (p.mediaUrl || p.imageUrl || p.videoUrl) quality += 12;
      if (p.author?.isVerified) quality += 10;
      if (p.content && p.content.length > 40 && p.content.length < 1500) quality += 8;

      // Negative Feedback Penalty (from "Show less" / "Not interested")
      const authorNegWeight = (negativeWeights[authorId] || 0) + (negativeWeights[authorUid] || 0);
      const feedbackPenalty = authorNegWeight * 40;

      const baseScore = freshness + relationship + interestsScore + engagement + quality - feedbackPenalty;

      return {
        post: p,
        authorId,
        baseScore,
        freshness,
        relationship,
        interests: interestsScore,
        engagement,
        quality,
        feedbackPenalty,
        reasonType,
        reasonText,
        matchedInterest
      };
    });

    // 4. Apply Dynamic Diversity Penalty Sequentially
    // This prevents a single creator from dominating consecutive slots in the feed
    const creatorCounts = new Map<string, number>();
    const rankedList: any[] = [];

    // Pre-sort candidates by baseScore descending with deterministic hash tie-break
    scoredItems.sort((a, b) => {
      const diff = b.baseScore - a.baseScore;
      if (Math.abs(diff) > 0.001) return diff;
      return this.getDeterministicHash(b.post.id) - this.getDeterministicHash(a.post.id);
    });

    for (const item of scoredItems) {
      const prevOccurrences = creatorCounts.get(item.authorId) || 0;
      creatorCounts.set(item.authorId, prevOccurrences + 1);

      // Diversity penalty: 0 for 1st post, 30 for 2nd, 75 for 3rd, 130 for 4th+
      const diversityPenalty = prevOccurrences === 0 ? 0 : Math.round(Math.pow(prevOccurrences, 1.6) * 30);
      const finalScore = Math.max(1, item.baseScore - diversityPenalty);

      const breakdown: ScoreBreakdown = {
        freshness: item.freshness,
        relationship: item.relationship,
        interests: item.interests,
        engagement: item.engagement,
        quality: item.quality,
        diversityPenalty,
        feedbackPenalty: item.feedbackPenalty,
        total: Math.round(finalScore)
      };

      rankedList.push({
        ...item.post,
        _rankingScore: finalScore,
        _rankingReason: {
          type: item.reasonType,
          text: item.reasonText,
          matchedInterest: item.matchedInterest,
          breakdown
        }
      });
    }

    // Final sort with diversity penalty accounted for
    rankedList.sort((a, b) => {
      const diff = (b._rankingScore || 0) - (a._rankingScore || 0);
      if (Math.abs(diff) > 0.001) return diff;
      return this.getPostTimeMs(b) - this.getPostTimeMs(a);
    });

    return rankedList;
  }
}

export const feedRankingService = new FeedRankingService();
