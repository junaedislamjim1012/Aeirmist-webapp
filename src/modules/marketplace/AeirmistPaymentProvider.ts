import { logger } from '@/src/utils/logger';
export class AeirmistPaymentProvider {
  public async startCheckout(userId: string, type: 'premium' | 'verified') {
    try {
      // TEMPORARY: Full Feature Unlock Override
      // Payments are disabled; all premium UI features are already unlocked via AeirmistContext.
      logger.info('[Payment] Payment system coming soon. Free premium access during beta phase.');
      return;
    } catch (e) {
      logger.error('Digital Transaction Interrupted:', e);
      throw e;
    }
  }
}

export const aeirmistPaymentProvider = new AeirmistPaymentProvider();
