import { 
  collection, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  writeBatch,
  getDoc,
  getDocs,
  deleteDoc,
  increment,
  DocumentData,
  QuerySnapshot,
  Firestore,
  deleteField
} from 'firebase/firestore';
import { Message, Chat } from '../../types/messenger';
import { aeirmistCache } from '../../services/CacheService';
import { handleFirestoreError, OperationType } from '../../lib/firebase';
import { logger } from '@/src/utils/logger';
import { getAvatarUrl } from '../../lib/avatar';


class MessagingService {
  private listeners: Map<string, () => void> = new Map();
  private lastMetadataUpdate: Map<string, number> = new Map();
  private lastDeliveryUpdate: Map<string, number> = new Map();
  private isSafeMode: boolean = false;

  public setSafeMode(enabled: boolean) {
    this.isSafeMode = enabled;
  }

  public async markAsRead(db: Firestore, conversationId: string, profileId: string) {
    const convRef = doc(db, 'conversations', conversationId);
    await updateDoc(convRef, {
      [`lastRead.${profileId}`]: serverTimestamp(),
      [`unreadCount.${profileId}`]: 0
    }).catch(err => logger.warn("Read confirmation rejected by core:", err));
  }

  public async deleteMessage(db: Firestore, conversationId: string, messageId: string, profileId: string, deleteType: 'me' | 'everyone' = 'everyone') {
    const msgRef = doc(db, 'conversations', conversationId, 'messages', messageId);
    
    if (deleteType === 'me') {
      await updateDoc(msgRef, {
        [`deletedFor.${profileId}`]: true
      });
    } else {
      // Unsend: Delete for everyone
      const batch = writeBatch(db);
      batch.update(msgRef, {
        text: 'Message Removed',
        type: 'text',
        mediaUrl: null,
        attachmentUrl: null,
        'metadata.removed': true,
        'metadata.removedBy': profileId
      });

      // Update conversation if it's the last message
      const convRef = doc(db, 'conversations', conversationId);
      const convSnap = await getDoc(convRef);
      if (convSnap.exists()) {
        const convData = convSnap.data();
        if (convData.lastMessage?.messageId === messageId || !convData.lastMessage?.messageId) {
          batch.update(convRef, {
            'lastMessage.text': 'Message Removed',
            'lastMessage.type': 'text',
            'lastMessage.mediaUrl': null,
            'lastMessage.metadata.removed': true
          });
        }
      }
      await batch.commit();
    }
  }

  public async editMessage(db: Firestore, conversationId: string, messageId: string, newText: string) {
    const batch = writeBatch(db);
    const msgRef = doc(db, 'conversations', conversationId, 'messages', messageId);
    
    batch.update(msgRef, {
      text: newText,
      'metadata.edited': true,
      'metadata.editedAt': serverTimestamp()
    });

    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (convSnap.exists()) {
      const convData = convSnap.data();
      if (convData.lastMessage?.messageId === messageId || !convData.lastMessage?.messageId) {
        batch.update(convRef, {
          'lastMessage.text': newText,
          'lastMessage.metadata.edited': true
        });
      }
    }
    await batch.commit();
  }

  async sendMessage(
    db: Firestore,
    profile: any,
    user: any,
    conversationId: string, 
    text: string, 
    type: string = 'text', 
    mediaUrl?: string, 
    metadata: any = {}
  ): Promise<string> {
    if (!user || !user.uid || !profile || !profile.id) {
      throw new Error("Authentication required to send messages.");
    }

    logger.info(`[MessagingService] sending message to ${conversationId}...`);
    let finalConvId = conversationId;
    const isNew = conversationId.startsWith('new_');
    
    try {
      logger.info(`[MessagingService] Preparing batch for ${finalConvId}. Sender: ${profile.id}, User: ${user.uid}`);
      const batch = writeBatch(db);
      
      // 1. Initial resolution from inputs
      let targetProfileId = isNew ? conversationId.replace('new_', '') : (metadata.recipientId || null);
      let targetOwnerUid = metadata.receiverUid || metadata.targetProfile?.uid || metadata.targetProfile?.ownerUid || null;

      // 2. Deterministic ID resolution for 1v1
      if (isNew && targetProfileId) {
        finalConvId = [profile.id, targetProfileId].sort().join('_');
      }

      const convRef = doc(db, 'conversations', finalConvId);
      const convSnap = await getDoc(convRef);
      const exists = convSnap.exists();

      // 3. Robust parsing of finalConvId to extract missing identifiers if needed
      if (!exists) {
        if (finalConvId.includes('_profile_')) {
          const parts = finalConvId.split('_profile_');
          const p1 = parts[0];
          const p2 = 'profile_' + parts[1];
          if (!targetProfileId) {
            targetProfileId = p1 === profile.id ? p2 : p1;
          }
        } else if (finalConvId.includes('_')) {
          const parts = finalConvId.split('_');
          const otherUid = parts.find(p => p !== user.uid && !p.startsWith('profile'));
          if (otherUid && !targetOwnerUid) {
            targetOwnerUid = otherUid;
          }
        }

        // Fetch profile from Firestore if we only have the recipient UID
        if (targetOwnerUid && !targetProfileId) {
          try {
            const q = query(collection(db, 'profiles'), where('ownerUid', '==', targetOwnerUid), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
              targetProfileId = snap.docs[0].id;
              if (!metadata.targetProfile) {
                metadata.targetProfile = { id: snap.docs[0].id, ...snap.docs[0].data() };
              }
            }
          } catch (e) {
            logger.error("[MessagingService] Failed to resolve target profile by UID:", e);
          }
        }

        // Parse owner UID from profileId if missing
        if (targetProfileId && !targetOwnerUid) {
          if (targetProfileId.startsWith('profile_')) {
            const parts = targetProfileId.split('_');
            if (parts.length >= 2) {
              targetOwnerUid = parts[1];
            }
          }
        }

        // Absolute fallback to avoid crashes
        if (!targetProfileId) {
          targetProfileId = 'unknown_profile';
        }
        if (!targetOwnerUid) {
          targetOwnerUid = targetProfileId;
        }
      }

      const isSelfChat = targetProfileId === profile.id;
      const isSelfUid = targetOwnerUid === user.uid;
      
      const profileIds = isSelfChat ? [profile.id] : [profile.id, targetProfileId].filter(Boolean).sort();
      const participants = isSelfUid ? [user.uid] : [user.uid, targetOwnerUid].filter(Boolean).sort();

      logger.info(`[MessagingService] Target Profile ID: ${targetProfileId}, Owner UID: ${targetOwnerUid}, Final ID: ${finalConvId}`);

      const messageId = doc(collection(db, 'conversations', finalConvId, 'messages')).id;

      const messageData: any = {
        senderId: profile.id,
        senderUid: user.uid,
        text,
        type,
        attachmentUrl: mediaUrl || null,
        mediaUrl: mediaUrl || null,
        metadata: {
           ...metadata,
           optimisticId: metadata.optimisticId || null,
           isOffline: metadata.isOffline || false
        },
        createdAt: serverTimestamp(),
        deliveredTo: [profile.id], 
        seenBy: [profile.id],
        status: 'sent', 
        timestamp: serverTimestamp(),
        timestampMs: Date.now()
      };

      if (metadata.mood) {
        messageData.mood = metadata.mood;
      }
      
      if (!exists) {
        logger.info(`[MessagingService] Initialising new activity: ${finalConvId}`);
        
        // Social Graph Check: Determine if it starts as a request
        const isFollower = metadata.isFollower || false;
        
        let initialStatus = 'request';
        if (targetProfileId === profile.id || isFollower) {
          initialStatus = 'active';
        }

        batch.set(convRef, {
          participants, 
          profileIds,   
          participantDetails: {
            [profile.id]: { 
              displayName: profile.displayName || profile.username, 
              photoURL: profile.photoURL, 
              username: profile.username, 
              uid: user.uid 
            },
            [targetProfileId!]: metadata.targetProfile || { 
              displayName: 'Aeirmist User', 
              photoURL: getAvatarUrl(null, targetProfileId), 
              username: targetProfileId, 
              uid: targetOwnerUid || targetProfileId
            }
          },
          lastMessage: {
            text,
            senderId: profile.id,
            timestamp: serverTimestamp(),
            type,
            mediaUrl: mediaUrl || null,
            mood: metadata.mood || null,
            messageId: messageId
          },
          unreadCount: {
            [targetProfileId!]: 1,
            [profile.id]: 0
          },
          lastRead: { [profile.id]: serverTimestamp() },
          lastDelivered: { [profile.id]: serverTimestamp() },
          status: initialStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        // Trigger initial notification
        const notifRef = doc(collection(db, 'notifications'));
        if (targetOwnerUid && !this.isSafeMode && !isSelfUid) {
          batch.set(notifRef, {
            userId: targetProfileId || targetOwnerUid,
            fromUserId: profile.id,
            fromUser: {
              displayName: profile.displayName || profile.username,
              photoURL: profile.photoURL
            },
            type: 'message',
            message: type === 'text' ? (text.substring(0, 50) + (text.length > 50 ? '...' : '')) : `Sent a ${type}`,
            metadata: { conversationId: finalConvId },
            read: false,
            createdAt: serverTimestamp()
          });
        }
      } else {
        logger.info(`[MessagingService] Updating existing chat: ${finalConvId}`);
        const receiverId = targetProfileId || metadata.recipientId || (convSnap.data()?.profileIds?.find((id: string) => id !== profile.id)) || null;
        const receiverUid = targetOwnerUid || metadata.receiverUid || (convSnap.data()?.participants?.find((uid: string) => uid !== user.uid)) || null;
        
        // OPTIMIZATION: Only send notification if receiver is NOT online 
        // or if explicitly requested (e.g. mention)
        const shouldNotify = !metadata.isReceiverOnline || metadata.forceNotify;
        
        this.updateExistingConversation(batch, db, finalConvId, profile.id, receiverId, receiverUid, text, type, mediaUrl, { ...metadata, shouldNotify, senderUid: user.uid, messageId });
      }
      
      const msgRef = doc(db, 'conversations', finalConvId, 'messages', messageId);
      batch.set(msgRef, messageData);
      
      logger.info("[MessagingService] Committing neural batch...");
      await batch.commit();
      logger.info("[MessagingService] Batch committed successfully.");
      return finalConvId;
    } catch (e: any) {
      logger.error("[MessagingService] ATOMIC FAILURE:", e);
      if (e.code === 'permission-denied') {
        logger.error("[MessagingService] Permissions check failed - verify security rules.");
      }
      throw e;
    }
  }

  private updateExistingConversation(
    batch: any, 
    db: Firestore, 
    convId: string, 
    senderId: string, 
    receiverId: string | null, 
    receiverUid: string | null,
    text: string, 
    type: string, 
    mediaUrl?: string, 
    metadata: any = {}
  ) {
    const convRef = doc(db, 'conversations', convId);
    
    // OPTIMIZATION: Throttle conversation metadata updates to save write quota
    const now = Date.now();
    const lastUpdate = this.lastMetadataUpdate.get(convId) || 0;
    const isMajorUpdate = now - lastUpdate > 30000; // 30 seconds frequency for heavy metadata

    const updates: any = {};

    // ALWAYS update updatedAt and lastMessage so the UI reflects the real-time chat state
    updates.updatedAt = serverTimestamp();
    updates.lastMessage = {
      text,
      senderId,
      timestamp: serverTimestamp(),
      type,
      mediaUrl: mediaUrl || null,
      mood: metadata.mood || null,
      messageId: metadata.messageId || null
    };

    if (isMajorUpdate) {
      this.lastMetadataUpdate.set(convId, now);
      updates[`lastRead.${senderId}`] = serverTimestamp();
      updates[`lastDelivered.${senderId}`] = serverTimestamp();
      updates[`isArchived.${senderId}`] = false;
    }

    // Ensure participants array is ALWAYS present for security rules
    if (metadata.receiverUid && metadata.senderUid) {
       updates.participants = metadata.senderUid === metadata.receiverUid ? [metadata.senderUid] : [metadata.senderUid, metadata.receiverUid].sort();
    }
    
    // Ensure profileIds is present for logic
    if (metadata.recipientId) {
      updates.profileIds = senderId === metadata.recipientId ? [senderId] : [senderId, metadata.recipientId].sort();
    }

    if (metadata.targetProfile && metadata.recipientId) {
      updates[`participantDetails.${metadata.recipientId}`] = metadata.targetProfile;
    }
    if (metadata.senderName || metadata.senderPhoto || metadata.senderUid) {
      updates[`participantDetails.${senderId}`] = {
        displayName: metadata.senderName || 'Unknown',
        photoURL: metadata.senderPhoto || '',
        uid: metadata.senderUid || '',
        username: senderId
      };
    }

    // Reset deletedFor flags so the conversation reappears upon new signals/messages
    updates[`deletedFor.${senderId}`] = null;
    if (receiverId) {
      updates[`deletedFor.${receiverId}`] = null;
      if (receiverId !== senderId) {
        updates[`unreadCount.${receiverId}`] = increment(1);
      }
      updates[`isArchived.${receiverId}`] = false;
    }

    batch.update(convRef, updates);

    // Skip non-essential notifications in Safe Mode to save writes
    if (receiverUid && metadata.shouldNotify && !this.isSafeMode && metadata.senderUid !== receiverUid) {
      const notifRef = doc(collection(db, 'notifications'));
      batch.set(notifRef, {
        userId: receiverId || receiverUid, // Use Profile ID if available, else Auth UID
        fromUserId: senderId,
        fromUser: {
          displayName: metadata.senderName || 'Unknown',
          photoURL: metadata.senderPhoto || ''
        },
        type: 'message',
        message: type === 'text' ? (text.substring(0, 50) + (text.length > 50 ? '...' : '')) : `Sent a ${type}`,
        metadata: { conversationId: convId },
        read: false,
        createdAt: serverTimestamp()
      });
    }
  }

  subscribeToMessages(
    db: Firestore, 
    conversationId: string, 
    currentProfileId: string,
    chatData: any,
    callback: (messages: Message[]) => void,
    limitCount: number = 50
  ) {
    logger.info(`[MessagingService] Subscribed to messages for ${conversationId}`);
    
    // 1. Instant Cache Load
    try {
      aeirmistCache.getMessages(conversationId).then(cached => {
        if (cached && cached.length > 0) {
          logger.info(`[MessagingService] Instant Cache Hit: ${cached.length} messages for ${conversationId}`);
          const formatted = cached.map(m => ({
            ...m,
            timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestampMs: m.timestamp
          })).sort((a, b) => a.timestampMs - b.timestampMs);
          callback(formatted as any);
        }
      }).catch(err => logger.warn("[MessagingService] Cache retrieval failure:", err));
    } catch (e) {
      logger.warn("[MessagingService] Cache logic error:", e);
    }

    const key = `messages_${conversationId}`;
    if (this.listeners.has(key)) {
      this.listeners.get(key)!();
    }

    const otherParticipantId = chatData.otherParticipantId ||
                             chatData.profileIds?.find((id: string) => id !== currentProfileId) || 
                             chatData.participants?.find((uid: string) => uid !== currentProfileId); // Fallback uid

    const parseTimestampMs = (val: any): number => {
      if (!val) return 0;
      if (typeof val.toMillis === 'function') return val.toMillis();
      if (typeof val.seconds === 'number') return val.seconds * 1000;
      if (typeof val === 'number') return val;
      if (val instanceof Date) return val.getTime();
      try {
        const d = new Date(val);
        return isNaN(d.getTime()) ? 0 : d.getTime();
      } catch (e) {
        return 0;
      }
    };

    const otherLastRead = parseTimestampMs(chatData?.lastRead?.[otherParticipantId || '']);
    const otherLastDelivered = parseTimestampMs(chatData?.lastDelivered?.[otherParticipantId || '']);

    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const myClearedAtMs = chatData?.clearedAt?.[currentProfileId]?.toMillis?.() || 0;

    const unsubscribe = onSnapshot(q, (snapshot) => {
      logger.info(`[MessagingService] Incoming messages for ${conversationId}: ${snapshot.size} items.`);
      const messages = snapshot.docs
        .map(doc => {
          const data = doc.data({ serverTimestamps: 'estimate' });
          const date = data.createdAt?.toDate?.() || data.timestamp?.toDate?.() || new Date();
          const timestampMs = data.createdAt?.toMillis?.() || data.timestamp?.toMillis?.() || Date.now();
          
          const isSeenVal = data.isSeen || (data.senderId === currentProfileId && timestampMs <= otherLastRead);
          logger.info(`[MessagingService DEBUG] isSeen computation:`, {
            messageId: doc.id,
            timestampMs,
            otherLastRead,
            otherParticipantId,
            isSeen: isSeenVal,
            text: data.text
          });

          return {
            ...data,
            id: doc.id,
            timestamp: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestampMs,
            isSeen: isSeenVal,
            isDelivered: data.isDelivered || (data.senderId === currentProfileId && timestampMs <= otherLastDelivered),
            status: data.status || (data.timestamp ? 'sent' : 'sending')
          } as Message;
        })
        .filter(m => {
          if ((m as any).deletedFor?.[currentProfileId] === true) return false;
          // Skip myClearedAtMs filter if the message is pending/optimistic/sending
          const isPendingOrOptimistic = (m.status as string) === 'sending' || (m.status as string) === 'pending' || m.id?.startsWith('opt_') || !m.timestampMs || m.timestampMs === 0;
          if (isPendingOrOptimistic) return true;
          if (m.timestampMs <= myClearedAtMs) return false;
          
          const deletedAtConv = chatData?.deletedFor?.[currentProfileId];
          if (typeof deletedAtConv === 'number' && m.timestampMs <= deletedAtConv) return false;

          return true;
        });
      
      const reversed = messages.reverse();

      // 2. Persist to Cache (Async)
      try {
        reversed.forEach(m => {
          // Prepare for cache storage (ensure timestamp is number)
          const cacheItem = { ...m, timestamp: m.timestampMs };
          aeirmistCache.saveMessage(cacheItem).catch(() => {});
        });
      } catch (e) {}

      // Update my delivered status if I've received messages from others
      const myLastDeliveredMs = chatData?.lastDelivered?.[currentProfileId]?.toMillis?.() || 0;
      const unconfirmed = messages.filter(m => 
        m.senderId !== currentProfileId && 
        m.timestampMs > myLastDeliveredMs 
        
      );

      if (unconfirmed.length > 0 && !this.isSafeMode) {
        const lastUpdate = this.lastDeliveryUpdate.get(conversationId) || 0;
        if (Date.now() - lastUpdate > 5000) { // 5 seconds
          this.lastDeliveryUpdate.set(conversationId, Date.now());
          logger.info(`[MessagingService] Confirming delivery for ${unconfirmed.length} messages.`);
          const convRef = doc(db, 'conversations', conversationId);
          updateDoc(convRef, {
            [`lastDelivered.${currentProfileId}`]: serverTimestamp()
          }).catch(() => {});
        }
      }

      callback(reversed);
    }, (error) => {
      logger.error(`[MessagingService] Snapshot error for ${conversationId}:`, error);
      handleFirestoreError(error, OperationType.LIST, `conversations/${conversationId}/messages`);
    });

    this.listeners.set(key, unsubscribe);
    return unsubscribe;
  }

  subscribeToChats(db: Firestore, userUid: string, profileId: string, callback: (chats: Chat[]) => void) {
    logger.info(`[MessagingService] Subscribing to inbox for UID: ${userUid}`);

    // 1. Instant Cache Load
    try {
      aeirmistCache.getConversations().then(cached => {
        if (cached && cached.length > 0) {
          const currentProfileChats = cached.filter(chat => 
            !chat.profileIds || chat.profileIds.includes(profileId) || chat.participants?.includes(userUid)
          );
          
          currentProfileChats.sort((a, b) => {
            const getMs = (val: any) => {
              if (!val) return 0;
              if (typeof val.toMillis === 'function') return val.toMillis();
              if (val instanceof Date) return val.getTime();
              if (typeof val === 'number') return val;
              if (val.seconds) return val.seconds * 1000;
              return 0;
            };
            return getMs(b.updatedAt) - getMs(a.updatedAt);
          });

          if (currentProfileChats.length > 0) {
            logger.info(`[MessagingService] Instant Cache Hit: ${currentProfileChats.length} conversations.`);
            callback(currentProfileChats);
          }
        }
      }).catch(err => logger.warn("[MessagingService] Inbox cache retrieval failure:", err));
    } catch (e) {}

    const key = `chats_${userUid}`;
    if (this.listeners.has(key)) {
      this.listeners.get(key)!();
    }

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userUid),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      logger.info(`[MessagingService] Inbox snapshot: ${snapshot.size} total active frequencies.`);
      const chats = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      } as Chat));

      // Sort client-side by updatedAt descending to bypass composite index requirements
      chats.sort((a, b) => {
        const getMs = (val: any) => {
          if (!val) return 0;
          if (typeof val.toMillis === 'function') return val.toMillis();
          if (val instanceof Date) return val.getTime();
          if (typeof val === 'number') return val;
          if (val.seconds) return val.seconds * 1000;
          return 0;
        };
        return getMs(b.updatedAt) - getMs(a.updatedAt);
      });
      
      // Filter by profileId if possible, but fallback to all chats if profileIds is missing (legacy support)
      const currentProfileChats = chats.filter(chat => 
        !chat.profileIds || chat.profileIds.includes(profileId) || chat.participants?.includes(userUid)
      );

      // 2. Persist to Cache (Async)
      try {
        currentProfileChats.forEach(chat => {
          aeirmistCache.saveConversation(chat).catch(() => {});
        });
      } catch (e) {}

      callback(currentProfileChats);
    }, (error) => {
      logger.error(`[MessagingService] Inbox sync failure:`, error);
      handleFirestoreError(error, OperationType.LIST, 'conversations_sync');
    });

    this.listeners.set(key, unsubscribe);
    return unsubscribe;
  }

  // Group Chat Functions

  public async createGroupConversation(
    db: Firestore, 
    creatorId: string, 
    memberIds: string[], 
    groupName: string, 
    groupPhotoURL?: string,
    creatorUid?: string,
    memberUids?: string[]
  ) {
    const convRef = doc(collection(db, 'conversations'));
    
    const profileIds = Array.from(new Set([creatorId, ...memberIds].filter(Boolean)));
    const participants = Array.from(new Set([creatorUid, ...(memberUids || []), ...profileIds].filter(Boolean)));
    
    await setDoc(convRef, {
      id: convRef.id,
      isGroup: true,
      type: 'group',
      name: groupName,
      groupName: groupName,
      photo: groupPhotoURL || null,
      groupPhotoURL: groupPhotoURL || null,
      profileIds: profileIds,
      participants: participants,
      admins: [creatorId],
      createdBy: creatorId,
      createdByUid: creatorUid || creatorId,
      status: 'active',
      isDiscoverable: false,
      pendingJoinRequests: [],
      lastMessage: {
        text: 'Group created',
        senderId: creatorId,
        timestamp: serverTimestamp(),
        type: 'text',
        mediaUrl: null,
        messageId: null
      },
      unreadCount: { [creatorId]: 0 },
      lastRead: { [creatorId]: serverTimestamp() },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return convRef.id;
  }

  public async sendSystemEvent(db: Firestore, conversationId: string, eventText: string) {
    try {
      const messagesRef = collection(db, 'conversations', conversationId, 'messages');
      const msgDoc = doc(messagesRef);
      await setDoc(msgDoc, {
        text: eventText,
        senderId: 'system',
        type: 'system',
        metadata: { isSystem: true },
        createdAt: serverTimestamp(),
        timestamp: serverTimestamp()
      });

      const convRef = doc(db, 'conversations', conversationId);
      await updateDoc(convRef, {
        lastMessage: {
          text: eventText,
          senderId: 'system',
          type: 'system',
          timestamp: serverTimestamp(),
          messageId: msgDoc.id
        },
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      logger.warn("Could not post system event:", e);
    }
  }

  public async addGroupMembers(db: Firestore, conversationId: string, requesterId: string, newMemberIds: string[], memberDetailsMap?: Record<string, any>, actorName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) {
      throw new Error("Group conversation not found");
    }
    
    const existingData = convSnap.data() || {};
    const participants: string[] = existingData.participants || [];
    const profileIds: string[] = existingData.profileIds || [];
    const admins: string[] = existingData.admins || [];
    const owner = existingData.owner || existingData.createdBy || existingData.createdByUid;

    const isAuthorized = 
      !requesterId ||
      participants.includes(requesterId) ||
      profileIds.includes(requesterId) ||
      admins.includes(requesterId) ||
      owner === requesterId ||
      participants.some(p => p && requesterId && (p === requesterId || p.includes(requesterId) || requesterId.includes(p))) ||
      profileIds.some(p => p && requesterId && (p === requesterId || p.includes(requesterId) || requesterId.includes(p)));

    if (!isAuthorized) {
      logger.warn(`User ${requesterId} authorization warning in group ${conversationId}`);
    }

    const updatedParticipants = Array.from(new Set([...participants, ...newMemberIds]));
    const updatedProfileIds = Array.from(new Set([...profileIds, ...newMemberIds]));
    
    const updatePayload: any = {
        participants: updatedParticipants,
        profileIds: updatedProfileIds,
        memberCount: updatedParticipants.length,
        updatedAt: serverTimestamp()
    };

    if (memberDetailsMap && Object.keys(memberDetailsMap).length > 0) {
      const existingDetails = existingData.participantDetails || {};
      updatePayload.participantDetails = { ...existingDetails, ...memberDetailsMap };
    }

    await updateDoc(convRef, updatePayload);

    const adder = actorName || 'Someone';
    const addedNames = newMemberIds.map(id => memberDetailsMap?.[id]?.displayName || id).filter(Boolean).join(', ');
    await this.sendSystemEvent(db, conversationId, `${adder} added ${addedNames || 'new members'} to the group.`);
  }

  public async removeGroupMember(db: Firestore, conversationId: string, adminId: string, memberIdToRemove: string, actorName?: string, memberName?: string, reason?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) {
        throw new Error("Group not found");
    }
    const data = convSnap.data();
    const isAdmin = (data.admins || []).includes(adminId) || data.owner === adminId || data.createdBy === adminId;
    if (!isAdmin) {
        throw new Error("Unauthorized to remove members");
    }
    if (data.owner === memberIdToRemove || data.createdBy === memberIdToRemove) {
        throw new Error("Cannot remove group owner");
    }

    const updatedParticipants = (data.participants || []).filter((id: string) => id !== memberIdToRemove);
    const updatedProfileIds = (data.profileIds || []).filter((id: string) => id !== memberIdToRemove);
    const updatedAdmins = (data.admins || []).filter((id: string) => id !== memberIdToRemove);
    
    const memberRoles = { ...(data.memberRoles || {}) };
    delete memberRoles[memberIdToRemove];

    await updateDoc(convRef, {
        participants: updatedParticipants,
        profileIds: updatedProfileIds,
        admins: updatedAdmins,
        memberRoles,
        memberCount: updatedParticipants.length,
        updatedAt: serverTimestamp()
    });

    const remover = actorName || 'An admin';
    const target = memberName || memberIdToRemove;
    const reasonText = reason ? ` (${reason})` : '';
    await this.sendSystemEvent(db, conversationId, `${remover} removed ${target} from the group${reasonText}.`);
  }

  public async promoteToAdmin(db: Firestore, conversationId: string, adminId: string, memberIdToPromote: string, actorName?: string, memberName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();
    const isAdmin = (data.admins || []).includes(adminId) || data.owner === adminId || data.createdBy === adminId;
    if (!isAdmin) throw new Error("Unauthorized to promote");

    const updatedAdmins = Array.from(new Set([...(data.admins || []), memberIdToPromote]));
    const memberRoles = { ...(data.memberRoles || {}), [memberIdToPromote]: 'admin' };

    await updateDoc(convRef, {
        admins: updatedAdmins,
        memberRoles,
        updatedAt: serverTimestamp()
    });

    const promoter = actorName || 'Admin';
    const target = memberName || 'a member';
    await this.sendSystemEvent(db, conversationId, `${promoter} made ${target} an Admin.`);
  }

  public async demoteAdmin(db: Firestore, conversationId: string, adminId: string, memberIdToDemote: string, actorName?: string, memberName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();
    const isOwner = data.owner === adminId || data.createdBy === adminId;
    if (!isOwner) throw new Error("Only group owner can demote admins");

    const updatedAdmins = (data.admins || []).filter((id: string) => id !== memberIdToDemote);
    const memberRoles = { ...(data.memberRoles || {}), [memberIdToDemote]: 'member' };

    await updateDoc(convRef, {
        admins: updatedAdmins,
        memberRoles,
        updatedAt: serverTimestamp()
    });

    const demoter = actorName || 'Owner';
    const target = memberName || 'Admin';
    await this.sendSystemEvent(db, conversationId, `${demoter} removed ${target} from Admin role.`);
  }

  public async setMemberRole(db: Firestore, conversationId: string, requesterId: string, targetId: string, newRole: 'owner' | 'admin' | 'moderator' | 'member', actorName?: string, targetName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();
    
    const isOwner = data.owner === requesterId || data.createdBy === requesterId;
    if (!isOwner && newRole === 'admin') {
      return this.promoteToAdmin(db, conversationId, requesterId, targetId, actorName, targetName);
    }

    const memberRoles = { ...(data.memberRoles || {}), [targetId]: newRole };
    let admins = data.admins || [];

    if (newRole === 'admin' || newRole === 'owner') {
      admins = Array.from(new Set([...admins, targetId]));
    } else {
      admins = admins.filter((id: string) => id !== targetId);
    }

    const updates: any = {
      memberRoles,
      admins,
      updatedAt: serverTimestamp()
    };

    if (newRole === 'owner') {
      updates.owner = targetId;
      updates.admins = Array.from(new Set([...admins, requesterId]));
      memberRoles[requesterId] = 'admin';
    }

    await updateDoc(convRef, updates);

    const actor = actorName || 'Someone';
    const target = targetName || 'Member';
    await this.sendSystemEvent(db, conversationId, `${actor} updated ${target}'s role to ${newRole.toUpperCase()}.`);
  }

  public async transferOwnership(db: Firestore, conversationId: string, currentOwnerId: string, newOwnerId: string, actorName?: string, newOwnerName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();

    const isOwner = data.owner === currentOwnerId || data.createdBy === currentOwnerId;
    if (!isOwner) throw new Error("Only the owner can transfer ownership");

    const memberRoles = { ...(data.memberRoles || {}), [newOwnerId]: 'owner', [currentOwnerId]: 'admin' };
    const admins = Array.from(new Set([...(data.admins || []), newOwnerId, currentOwnerId]));

    await updateDoc(convRef, {
      owner: newOwnerId,
      createdBy: newOwnerId,
      admins,
      memberRoles,
      updatedAt: serverTimestamp()
    });

    const actor = actorName || 'Owner';
    const target = newOwnerName || 'Member';
    await this.sendSystemEvent(db, conversationId, `${actor} transferred group ownership to ${target}.`);
  }

  public async toggleMuteMember(db: Firestore, conversationId: string, memberId: string, isMuted: boolean, actorName?: string, targetName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;

    const data = convSnap.data();
    const mutedMembers = { ...(data.mutedMembers || {}), [memberId]: isMuted };

    await updateDoc(convRef, {
      mutedMembers,
      updatedAt: serverTimestamp()
    });

    const actor = actorName || 'Admin';
    const target = targetName || 'User';
    const actionStr = isMuted ? 'muted' : 'unmuted';
    await this.sendSystemEvent(db, conversationId, `${actor} ${actionStr} ${target} in the group.`);
  }

  public async requestToJoinGroup(db: Firestore, conversationId: string, requesterId: string) {
    const convRef = doc(db, 'conversations', conversationId);
    await updateDoc(convRef, {
        pendingJoinRequests: Array.from(new Set([requesterId])) 
    });
  }

  public async approveJoinRequest(db: Firestore, conversationId: string, adminId: string, requesterId: string, actorName?: string, requesterName?: string) {
    const batch = writeBatch(db);
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists() || !(convSnap.data().admins || []).includes(adminId)) {
        throw new Error("Unauthorized to approve join request");
    }

    const data = convSnap.data();
    const updatedParticipants = Array.from(new Set([...(data.participants || []), requesterId]));

    batch.update(convRef, {
        pendingJoinRequests: (data.pendingJoinRequests || []).filter((id: string) => id !== requesterId),
        participants: updatedParticipants,
        memberCount: updatedParticipants.length,
        updatedAt: serverTimestamp()
    });
    await batch.commit();

    const actor = actorName || 'Admin';
    const target = requesterName || 'New member';
    await this.sendSystemEvent(db, conversationId, `${actor} approved ${target}'s join request.`);
  }

  public async rejectJoinRequest(db: Firestore, conversationId: string, adminId: string, requesterId: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists() || !(convSnap.data().admins || []).includes(adminId)) {
        throw new Error("Unauthorized to reject join request");
    }

    await updateDoc(convRef, {
        pendingJoinRequests: (convSnap.data().pendingJoinRequests || []).filter((id: string) => id !== requesterId)
    });
  }

  public async updateGroupDetails(db: Firestore, conversationId: string, updates: { name?: string; photoURL?: string; wallpaper?: string; settings?: any }, actorName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const payload: any = {
      updatedAt: serverTimestamp()
    };
    let eventMsg = '';
    const actor = actorName || 'An admin';

    if (updates.name !== undefined) {
      payload.name = updates.name;
      payload.groupName = updates.name;
      eventMsg = `${actor} changed the group name to "${updates.name}".`;
    }
    if (updates.photoURL !== undefined) {
      payload.photo = updates.photoURL;
      payload.groupPhotoURL = updates.photoURL;
      eventMsg = `${actor} updated the group photo.`;
    }
    if (updates.wallpaper !== undefined) {
      payload.wallpaper = updates.wallpaper;
      eventMsg = `${actor} changed the chat theme/wallpaper.`;
    }
    if (updates.settings !== undefined) {
      payload.settings = updates.settings;
    }

    await updateDoc(convRef, payload);

    if (eventMsg) {
      await this.sendSystemEvent(db, conversationId, eventMsg);
    }
  }

  public async setGroupNickname(db: Firestore, conversationId: string, memberId: string, nickname: string, setterName?: string, memberName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const cleanNick = nickname.trim();

    await updateDoc(convRef, {
      [`nicknames.${memberId}`]: cleanNick,
      updatedAt: serverTimestamp()
    });

    try {
      const chatSettingsRef = doc(db, 'chat_settings', conversationId);
      await setDoc(chatSettingsRef, {
        nicknames: {
          [memberId]: cleanNick
        }
      }, { merge: true });
    } catch (err) {
      logger.warn("Could not sync nickname to chat_settings:", err);
    }

    const actor = setterName || 'Someone';
    const target = memberName || memberId;
    const msg = cleanNick ? `${actor} set the nickname for ${target} to "${cleanNick}".` : `${actor} cleared ${target}'s nickname.`;
    await this.sendSystemEvent(db, conversationId, msg);
  }

  public async leaveGroup(db: Firestore, conversationId: string, memberId: string, memberUid?: string, memberName?: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();

    const isOwner = data.owner === memberId || data.createdBy === memberId;
    if (isOwner && (data.participants || []).length > 1) {
      throw new Error("OWNER_MUST_TRANSFER");
    }

    const newProfileIds = (data.profileIds || []).filter((id: string) => id !== memberId);
    const newParticipants = (data.participants || []).filter((id: string) => id !== memberId && id !== memberUid);
    const newAdmins = (data.admins || []).filter((id: string) => id !== memberId);

    await updateDoc(convRef, {
      profileIds: newProfileIds,
      participants: newParticipants,
      admins: newAdmins,
      memberCount: newParticipants.length,
      updatedAt: serverTimestamp()
    });

    const target = memberName || 'A member';
    await this.sendSystemEvent(db, conversationId, `${target} left the group.`);
  }

  public async deleteGroup(db: Firestore, conversationId: string, requesterId: string) {
    const convRef = doc(db, 'conversations', conversationId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) return;
    const data = convSnap.data();

    const isOwner = data.owner === requesterId || data.createdBy === requesterId;
    if (!isOwner) {
      throw new Error("Only the group owner can delete the group.");
    }

    await deleteDoc(convRef);
  }

  cleanup(key?: string) {
    if (key) {
      if (this.listeners.has(key)) {
        this.listeners.get(key)!();
        this.listeners.delete(key);
      }
    } else {
      this.listeners.forEach(unsub => unsub());
      this.listeners.clear();
    }
  }
}

export const messagingService = new MessagingService();
