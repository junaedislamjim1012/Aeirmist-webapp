export interface Video {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  videoURL: string;
  caption: string;
  title?: string;
  description?: string;
  tags: string[];
  category?: string;
  language?: string;
  visibility?: 'public' | 'private';
  location?: string;
  commentsEnabled?: boolean;
  likesEnabled?: boolean;
  shareEnabled?: boolean;
  downloadEnabled?: boolean;
  embedEnabled?: boolean;
  aspectRatio?: 'short' | 'long' | 'vertical' | 'horizontal' | 'square';
  thumbnailURL?: string;
  duration?: number; // Duration in seconds (e.g. 840 = 14m 0s)
  durationFormatted?: string; // e.g. "14:00" or "1:15:30"
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  isVerified?: boolean;
  viewCount: number;
  createdAt: string;
  likedBy?: string[];
  savedBy?: string[];
  isFeatured?: boolean;
}

export interface VideoInteraction {
  videoId: string;
  type: 'like' | 'share' | 'save' | 'comment' | 'watch_complete';
  timestamp: number;
}

export interface PlaybackProgress {
  videoId: string;
  currentTime: number; // in seconds
  duration: number; // in seconds
  lastWatchedAt: number; // timestamp
}

export interface VideoComment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isVerified?: boolean;
  text: string;
  createdAt: string;
  likeCount: number;
  likedBy?: string[];
  parentId?: string | null;
  replyCount?: number;
}

export interface VideoPlaylist {
  id: string;
  title: string;
  description?: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  videoIds: string[];
  isPrivate?: boolean;
  createdAt: string;
  updatedAt: string;
  thumbnailURL?: string;
}

export type VideoCategory = 
  | 'Music'
  | 'Gaming'
  | 'Technology'
  | 'Education'
  | 'Documentary'
  | 'Entertainment'
  | 'Sports'
  | 'Travel'
  | 'Lifestyle'
  | 'Comedy'
  | 'Business'
  | 'News'
  | 'Creative';

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'Music',
  'Gaming',
  'Technology',
  'Education',
  'Documentary',
  'Entertainment',
  'Sports',
  'Travel',
  'Lifestyle',
  'Comedy',
  'Business',
  'News',
  'Creative'
];


