import { logger } from '@/src/utils/logger';

export interface OutboxItem {
  id: string; // Optimistic unique client ID
  conversationId: string;
  text: string;
  type: string;
  mediaUrl?: string | null;
  metadata?: any;
  status: 'sending' | 'failed' | 'delivered';
  timestampMs: number;
  retryCount: number;
  error?: string | null;
}

class MessageOutboxService {
  private readonly STORAGE_PREFIX = 'aeirmist_msg_outbox_';

  private getStorageKey(conversationId: string): string {
    return `${this.STORAGE_PREFIX}${conversationId}`;
  }

  public getOutbox(conversationId: string): OutboxItem[] {
    if (!conversationId) return [];
    try {
      const data = localStorage.getItem(this.getStorageKey(conversationId));
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Purge items older than 48 hours to prevent unbounded accumulation
        const cutoff = Date.now() - 48 * 3600 * 1000;
        return parsed.filter(item => item && item.timestampMs > cutoff);
      }
      return [];
    } catch (e) {
      logger.warn('[MessageOutboxService] Failed to read outbox:', e);
      return [];
    }
  }

  private saveOutbox(conversationId: string, items: OutboxItem[]): void {
    if (!conversationId) return;
    try {
      localStorage.setItem(this.getStorageKey(conversationId), JSON.stringify(items.slice(-50)));
    } catch (e) {
      logger.warn('[MessageOutboxService] Failed to persist outbox:', e);
    }
  }

  public enqueue(
    conversationId: string,
    message: {
      id: string;
      text: string;
      type?: string;
      mediaUrl?: string | null;
      metadata?: any;
    }
  ): OutboxItem {
    const items = this.getOutbox(conversationId);
    // Deduplicate if already queued
    const existingIndex = items.findIndex(i => i.id === message.id);
    const outboxItem: OutboxItem = {
      id: message.id,
      conversationId,
      text: message.text,
      type: message.type || 'text',
      mediaUrl: message.mediaUrl || null,
      metadata: message.metadata || {},
      status: 'sending',
      timestampMs: Date.now(),
      retryCount: 0,
      error: null
    };

    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...outboxItem };
    } else {
      items.push(outboxItem);
    }

    this.saveOutbox(conversationId, items);
    return outboxItem;
  }

  public markFailed(conversationId: string, id: string, error?: string): void {
    const items = this.getOutbox(conversationId);
    const item = items.find(i => i.id === id);
    if (item) {
      item.status = 'failed';
      item.retryCount += 1;
      item.error = error || 'Message delivery failed. Tap to retry.';
      this.saveOutbox(conversationId, items);
    }
  }

  public markDelivered(conversationId: string, id: string): void {
    const items = this.getOutbox(conversationId);
    // Remove completed items from outbox
    const filtered = items.filter(i => i.id !== id);
    this.saveOutbox(conversationId, filtered);
  }

  public remove(conversationId: string, id: string): void {
    const items = this.getOutbox(conversationId);
    const filtered = items.filter(i => i.id !== id);
    this.saveOutbox(conversationId, filtered);
  }

  public clearConversation(conversationId: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(conversationId));
    } catch (e) {
      logger.warn('[MessageOutboxService] Failed to clear outbox:', e);
    }
  }
}

export const messageOutboxService = new MessageOutboxService();
