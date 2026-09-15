import Redis from 'ioredis';
import { logger } from '@/src/utils/logger';

// In-memory fallback store when Redis is unavailable
const memoryStore = new Map<string, string>();

class MockRedis {
  async get(key: string) { return memoryStore.get(key) ?? null; }
  async set(key: string, value: string) { memoryStore.set(key, String(value)); return 'OK'; }
  async del(key: string) { const ex = memoryStore.has(key); memoryStore.delete(key); return ex ? 1 : 0; }
  async incr(key: string) {
    const val = Number(memoryStore.get(key) || 0) + 1;
    memoryStore.set(key, String(val));
    return val;
  }
  async expire() { return 1; }
  async ttl() { return -1; }
  on() { return this; }
}

let redisClient: any = null;

export function getRedisClient(): any {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      logger.info('[AI Studio] REDIS_URL is not defined. Using in-memory fallback for caching/rate-limiting.');
      redisClient = new MockRedis();
    } else {
      try {
        const client = new Redis(redisUrl, {
          maxRetriesPerRequest: 1,
          enableOfflineQueue: false,
          retryStrategy: () => null // Don't retry indefinitely
        });
        client.on('error', (err) => {
          logger.warn('Redis Connection Error - switching to in-memory fallback:', err.message);
          redisClient = new MockRedis();
        });
        redisClient = client;
      } catch {
        redisClient = new MockRedis();
      }
    }
  }
  return redisClient;
}

