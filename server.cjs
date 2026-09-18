var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils/logger.ts
var import_meta, isProd, SENSITIVE_KEYS, sanitize, logger;
var init_logger = __esm({
  "src/utils/logger.ts"() {
    import_meta = {};
    isProd = typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production" || typeof import_meta !== "undefined" && import_meta.env && import_meta.env.PROD;
    SENSITIVE_KEYS = [
      "password",
      "token",
      "secret",
      "credential",
      "session",
      "card",
      "key",
      "private",
      "billing",
      "stripe",
      "auth",
      "2fa"
    ];
    sanitize = (data) => {
      if (data === void 0 || data === null) return data;
      if (typeof data !== "object") return data;
      if (Array.isArray(data)) return data.map(sanitize);
      if (data instanceof Error) {
        return {
          message: data.message,
          name: data.name,
          code: data.code || "UNKNOWN_ERROR",
          // Explicitly omit stack trace in prod for security, keep in dev
          stack: isProd ? void 0 : data.stack
        };
      }
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        const keyLower = key.toLowerCase();
        if (SENSITIVE_KEYS.some((sk) => keyLower.includes(sk))) {
          sanitized[key] = "[REDACTED]";
        } else if (keyLower === "user" || keyLower === "profile" || keyLower === "account") {
          sanitized[key] = value && typeof value === "object" ? { id: value.uid || value.id, role: value.role } : value;
        } else {
          sanitized[key] = sanitize(value);
        }
      }
      return sanitized;
    };
    logger = {
      debug: (message, ...args) => {
        if (!isProd) {
          console.debug(`[DEBUG] ${typeof message === "string" ? message : ""}`, ...[typeof message === "string" ? void 0 : message, ...args].filter(Boolean).map(sanitize));
        }
      },
      info: (message, ...args) => {
        if (!isProd) {
          console.info(`[INFO] ${typeof message === "string" ? message : ""}`, ...[typeof message === "string" ? void 0 : message, ...args].filter(Boolean).map(sanitize));
        }
      },
      warn: (message, ...args) => {
        console.warn(`[WARN] ${typeof message === "string" ? message : ""}`, ...[typeof message === "string" ? void 0 : message, ...args].filter(Boolean).map(sanitize));
      },
      error: (message, ...args) => {
        console.error(`[ERROR] ${typeof message === "string" ? message : ""}`, ...[typeof message === "string" ? void 0 : message, ...args].filter(Boolean).map(sanitize));
      },
      security: (message, ...args) => {
        console.info(`[SECURITY] ${typeof message === "string" ? message : ""}`, ...[typeof message === "string" ? void 0 : message, ...args].filter(Boolean).map(sanitize));
      }
    };
  }
});

// firebase-applet-config.json
var firebase_applet_config_default;
var init_firebase_applet_config = __esm({
  "firebase-applet-config.json"() {
    firebase_applet_config_default = {
      projectId: "aeirmist-d4dd8",
      appId: "1:999048341395:web:d35840bee522900be9aa66",
      apiKey: "AIzaSyBmk_p1QK7VEI6VM0z2oX3Ut4TpEme3pkk",
      authDomain: "aeirmist-d4dd8.firebaseapp.com",
      firestoreDatabaseId: "(default)",
      storageBucket: "aeirmist-d4dd8.firebasestorage.app",
      messagingSenderId: "999048341395",
      measurementId: "",
      recaptchaSiteKey: ""
    };
  }
});

// src/services/FirebaseAdminService.ts
var FirebaseAdminService_exports = {};
__export(FirebaseAdminService_exports, {
  admin: () => import_firebase_admin.default,
  getFirebaseAdmin: () => getFirebaseAdmin,
  getFirestoreAdmin: () => getFirestoreAdmin
});
function getFirebaseAdmin() {
  if (!adminApp) {
    try {
      adminApp = import_firebase_admin.default.initializeApp({
        projectId: activeConfig.projectId
      });
      logger.info("Admin Auth Initialized with project:", activeConfig.projectId);
    } catch (e) {
      if (e.code === "app/duplicate-app") {
        adminApp = import_firebase_admin.default.app();
      } else {
        logger.error("Admin Auth Failed:", e);
        throw e;
      }
    }
  }
  return adminApp;
}
function getFirestoreAdmin() {
  const app = getFirebaseAdmin();
  const dbId = activeConfig.firestoreDatabaseId === "(default)" ? void 0 : activeConfig.firestoreDatabaseId;
  const db = (0, import_firestore.getFirestore)(app, dbId);
  return db;
}
var import_firebase_admin, import_firestore, activeConfig, adminApp;
var init_FirebaseAdminService = __esm({
  "src/services/FirebaseAdminService.ts"() {
    import_firebase_admin = __toESM(require("firebase-admin"), 1);
    import_firestore = require("firebase-admin/firestore");
    init_firebase_applet_config();
    init_logger();
    activeConfig = {
      projectId: firebase_applet_config_default.projectId,
      firestoreDatabaseId: firebase_applet_config_default.firestoreDatabaseId
    };
    logger.info("\u2705 [Firebase Admin] Initializing with:", {
      projectId: activeConfig.projectId,
      firestoreDatabaseId: activeConfig.firestoreDatabaseId
    });
    adminApp = null;
  }
});

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_express_session = __toESM(require("express-session"), 1);
var import_cookie_parser = __toESM(require("cookie-parser"), 1);

// src/middleware/rateLimiter.ts
var import_rate_limiter_flexible = require("rate-limiter-flexible");

// src/lib/redis.ts
var import_ioredis = __toESM(require("ioredis"), 1);
init_logger();
var memoryStore = /* @__PURE__ */ new Map();
var MockRedis = class {
  async get(key) {
    return memoryStore.get(key) ?? null;
  }
  async set(key, value) {
    memoryStore.set(key, String(value));
    return "OK";
  }
  async del(key) {
    const ex = memoryStore.has(key);
    memoryStore.delete(key);
    return ex ? 1 : 0;
  }
  async incr(key) {
    const val = Number(memoryStore.get(key) || 0) + 1;
    memoryStore.set(key, String(val));
    return val;
  }
  async expire() {
    return 1;
  }
  async ttl() {
    return -1;
  }
  on() {
    return this;
  }
};
var redisClient = null;
function getRedisClient() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      logger.info("[AI Studio] REDIS_URL is not defined. Using in-memory fallback for caching/rate-limiting.");
      redisClient = new MockRedis();
    } else {
      try {
        const client = new import_ioredis.default(redisUrl, {
          maxRetriesPerRequest: 1,
          enableOfflineQueue: false,
          retryStrategy: () => null
          // Don't retry indefinitely
        });
        client.on("error", (err) => {
          logger.warn("Redis Connection Error - switching to in-memory fallback:", err.message);
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

// src/middleware/rateLimiter.ts
init_logger();
var LIMITS = {
  GUEST: { points: 5e3, duration: 60 },
  AUTH: { points: 1e4, duration: 60 },
  PREMIUM: { points: 5e4, duration: 60 },
  MESSAGING: { points: 3e3, duration: 60 },
  TYPING: { points: 1e4, duration: 60 },
  RECEIPTS: { points: 2e4, duration: 60 },
  DDoS: { points: 200, duration: 1 },
  ABUSE: { points: 500, duration: 3600 },
  PAYMENTS: { points: 100, duration: 600 }
};
var generalLimiterGuest;
var generalLimiterAuth;
var generalLimiterPremium;
var messagingLimiter;
var typingLimiter;
var receiptsLimiter;
var ddosLimiter;
var abuseLimiter;
var paymentsLimiter;
function initMemoryLimiters() {
  logger.warn("Initializing Local In-Memory Rate Limiters (No REDIS_URL or Offline Redis)...");
  generalLimiterGuest = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_gen_gst",
    points: LIMITS.GUEST.points,
    duration: LIMITS.GUEST.duration,
    blockDuration: 60 * 15
  });
  generalLimiterAuth = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_gen_ath",
    points: LIMITS.AUTH.points,
    duration: LIMITS.AUTH.duration,
    blockDuration: 60 * 15
  });
  generalLimiterPremium = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_gen_prm",
    points: LIMITS.PREMIUM.points,
    duration: LIMITS.PREMIUM.duration,
    blockDuration: 60 * 15
  });
  messagingLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_msg",
    points: LIMITS.MESSAGING.points,
    duration: LIMITS.MESSAGING.duration
  });
  typingLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_typ",
    points: LIMITS.TYPING.points,
    duration: LIMITS.TYPING.duration
  });
  receiptsLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_rec",
    points: LIMITS.RECEIPTS.points,
    duration: LIMITS.RECEIPTS.duration
  });
  ddosLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_ddos",
    points: LIMITS.DDoS.points,
    duration: LIMITS.DDoS.duration,
    blockDuration: 60 * 60
  });
  abuseLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_abuse",
    points: LIMITS.ABUSE.points,
    duration: LIMITS.ABUSE.duration,
    blockDuration: 60 * 60 * 24
  });
  paymentsLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
    keyPrefix: "rl_pay",
    points: LIMITS.PAYMENTS.points,
    duration: LIMITS.PAYMENTS.duration,
    blockDuration: 60 * 30
  });
}
function initLimiters() {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    try {
      logger.info("Saving Scalable Distributed Redis Rate Limiters...");
      const redis = getRedisClient();
      generalLimiterGuest = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_gen_gst",
        points: LIMITS.GUEST.points,
        duration: LIMITS.GUEST.duration,
        blockDuration: 60 * 15
      });
      generalLimiterAuth = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_gen_ath",
        points: LIMITS.AUTH.points,
        duration: LIMITS.AUTH.duration,
        blockDuration: 60 * 15
      });
      generalLimiterPremium = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_gen_prm",
        points: LIMITS.PREMIUM.points,
        duration: LIMITS.PREMIUM.duration,
        blockDuration: 60 * 15
      });
      messagingLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_msg",
        points: LIMITS.MESSAGING.points,
        duration: LIMITS.MESSAGING.duration
      });
      typingLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_typ",
        points: LIMITS.TYPING.points,
        duration: LIMITS.TYPING.duration
      });
      receiptsLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_rec",
        points: LIMITS.RECEIPTS.points,
        duration: LIMITS.RECEIPTS.duration
      });
      ddosLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_ddos",
        points: LIMITS.DDoS.points,
        duration: LIMITS.DDoS.duration,
        blockDuration: 60 * 60
      });
      abuseLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_abuse",
        points: LIMITS.ABUSE.points,
        duration: LIMITS.ABUSE.duration,
        blockDuration: 60 * 60 * 24
      });
      paymentsLimiter = new import_rate_limiter_flexible.RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rl_pay",
        points: LIMITS.PAYMENTS.points,
        duration: LIMITS.PAYMENTS.duration,
        blockDuration: 60 * 30
      });
      return;
    } catch (e) {
      logger.error("Failed to initialize Redis rate limiters, falling back to local memory:", e);
    }
  }
  initMemoryLimiters();
}
var paymentRateLimiter = async (req, res, next) => {
  if (!paymentsLimiter) initLimiters();
  const userId = req.user?.uid || req.ip || "unknown";
  try {
    await paymentsLimiter.consume(userId);
    next();
  } catch (error) {
    res.status(429).json({
      error: "PAYMENT_OVERLOAD",
      message: "Payment rate limit exceeded. Please wait 30 minutes before trying again.",
      retryAfter: Math.round(error instanceof import_rate_limiter_flexible.RateLimiterRes ? error.msBeforeNext / 1e3 : 1800)
    });
  }
};
var aeirmistRateLimiter = async (req, res, next) => {
  if (!generalLimiterGuest) initLimiters();
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const user = req.user;
  const userId = user?.uid || ip;
  const role = user?.role || "guest";
  if (role === "admin") return next();
  try {
    await ddosLimiter.consume(ip);
    if (role === "premium") {
      await generalLimiterPremium.consume(userId, 1);
    } else if (role === "authenticated") {
      await generalLimiterAuth.consume(userId, 1);
    } else {
      await generalLimiterGuest.consume(userId, 1);
    }
    const path3 = req.path;
    if (path3.startsWith("/api/messages")) {
      await messagingLimiter.consume(userId);
    } else if (path3.startsWith("/api/typing")) {
      await typingLimiter.consume(userId);
    } else if (path3.startsWith("/api/receipts")) {
      await receiptsLimiter.consume(userId);
    }
    next();
  } catch (error) {
    if (error instanceof import_rate_limiter_flexible.RateLimiterRes) {
      try {
        await abuseLimiter.consume(userId);
      } catch (abuseError) {
        logger.error(`AUTO-BAN triggered for ${userId}`);
        return res.status(403).json({
          error: "ACCESS_DENIED",
          message: "Your account has been temporarily suspended due to suspicious activity. Please contact support.",
          retryAfter: Math.round(abuseError instanceof import_rate_limiter_flexible.RateLimiterRes ? abuseError.msBeforeNext / 1e3 : 86400)
        });
      }
      res.status(429).json({
        error: "TOO_MANY_REQUESTS",
        message: "Feedback overloaded. Please wait before attempting activity again.",
        retryAfter: Math.round(error.msBeforeNext / 1e3),
        limit: points_for_tier(role),
        remaining: error.remainingPoints
      });
    } else {
      logger.error("Rate Limiter Error:", error);
      next();
    }
  }
};
function points_for_tier(role) {
  if (role === "premium") return LIMITS.PREMIUM.points;
  if (role === "authenticated") return LIMITS.AUTH.points;
  return LIMITS.GUEST.points;
}

// src/middleware/errorHandler.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
init_logger();
var requestTracer = (req, res, next) => {
  req.id = req.headers["x-request-id"] || Math.random().toString(36).substring(2, 15);
  res.setHeader("X-Aeirmist-Trace-ID", req.id);
  next();
};
var globalErrorHandler = (err, req, res, next) => {
  const traceId = req.id || "N/A";
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let statusCode = err.statusCode || 500;
  let errorCode = err.code || "UNKNOWN_RESONANCE_FAILURE";
  let message = err.message || "An unexpected error occurred..";
  if (err.code?.startsWith("auth/")) {
    statusCode = 401;
    errorCode = "AUTH_CONNECTION_FAILED";
  } else if (err.name === "FirebaseError" || err.code === "permission-denied") {
    statusCode = 403;
    errorCode = "DATABASE_ACCESS_DENIED";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    errorCode = "INVALID_DATA_STREAM";
  }
  const logEntry = {
    timestamp,
    traceId,
    method: req.method,
    url: req.url,
    statusCode,
    errorCode,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    body: req.body,
    user: req.user?.uid || "anonymous"
  };
  const logString = `[${timestamp}] [TRACE:${traceId}] [${req.method} ${req.url}] ERROR:${errorCode} STATUS:${statusCode} MSG:${message}
`;
  import_fs.default.appendFile(import_path.default.join(process.cwd(), "server-error.log"), logString, (fsErr) => {
    if (fsErr) logger.error("CRITICAL: Failed to write to server-error.log", fsErr);
  });
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      traceId,
      // Only show details in dev
      details: process.env.NODE_ENV !== "production" ? err.details : void 0
    }
  });
};

// src/services/PaymentService.ts
var import_stripe = __toESM(require("stripe"), 1);
init_FirebaseAdminService();

// src/services/TransactionAuditService.ts
var import_firebase_admin2 = __toESM(require("firebase-admin"), 1);
init_FirebaseAdminService();
init_logger();
var TransactionAuditService = class {
  async logPaymentActivity(userId, action, details, severity = "info") {
    const db = getFirestoreAdmin();
    try {
      await db.collection("audit_logs").add({
        timestamp: import_firebase_admin2.default.firestore.FieldValue.serverTimestamp(),
        userId,
        action,
        details,
        severity,
        service: "payment"
      });
      logger.info(`[AUDIT] ${action} logged for user ${userId}`);
    } catch (e) {
      logger.error("Audit Logging failed:", e);
    }
  }
  async getTransactionHistory(userId) {
    const db = getFirestoreAdmin();
    const snap = await db.collection("transactions").where("userId", "==", userId).orderBy("timestamp", "desc").get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
var transactionAudit = new TransactionAuditService();

// src/services/PaymentService.ts
init_logger();
var stripeClient = null;
function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      logger.warn("STRIPE_SECRET_KEY environment variable is missing. Initialization in safe sandbox mode.");
      return null;
    }
    stripeClient = new import_stripe.default(key, {
      apiVersion: "2025-01-27-acacia"
    });
  }
  return stripeClient;
}
var PAYMENT_CONFIG = {
  PREMIUM: {
    price_id: "price_premium_placeholder",
    amount: 1999,
    // $19.99
    currency: "usd",
    name: "Aeirmist Premium Upgrade",
    type: "premium"
  },
  VERIFIED_BADGE: {
    price_id: "price_verified_placeholder",
    amount: 499,
    // $4.99
    currency: "usd",
    name: "Aeirmist Verified Badge",
    type: "verified"
  }
};
async function createAeirmistCheckoutSession(userId, type, successUrl, cancelUrl) {
  const db = getFirestoreAdmin();
  const userDoc = await db.collection("users").doc(userId).get();
  const userData = userDoc.data();
  if (type === "premium" && userData?.isPremium) {
    throw new Error("ALREADY_PREMIUM");
  }
  if (type === "verified" && userData?.isVerified) {
    throw new Error("ALREADY_VERIFIED");
  }
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("STRIPE_SYSTEM_OFFLINE");
  }
  const config = type === "premium" ? PAYMENT_CONFIG.PREMIUM : PAYMENT_CONFIG.VERIFIED_BADGE;
  await transactionAudit.logPaymentActivity(userId, "CHECKOUT_INITIATED", {
    type,
    amount: config.amount,
    currency: config.currency
  });
  const sessionParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: config.currency,
          product_data: {
            name: config.name
          },
          unit_amount: config.amount
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      type
    }
  };
  const idempotencyKey = `checkout_${userId}_${type}_${Math.floor(Date.now() / 6e4)}`;
  return await stripe.checkout.sessions.create(sessionParams, {
    idempotencyKey
  });
}
async function handleStripeEvent(event) {
  const db = getFirestoreAdmin();
  const eventId = event.id;
  const processedEventRef = db.collection("processed_events").doc(eventId);
  const processedEventDoc = await processedEventRef.get();
  if (processedEventDoc.exists) {
    logger.info(`Message Already Processed: ${eventId}`);
    return;
  }
  await processedEventRef.set({
    timestamp: import_firebase_admin.default.firestore.FieldValue.serverTimestamp(),
    type: event.type
  });
  switch (event.type) {
    case "checkout.session.completed": {
      const session2 = event.data.object;
      const userId = session2.client_reference_id;
      const type = session2.metadata?.type;
      if (!userId) {
        logger.error("No userId found in checkout session");
        return;
      }
      logger.info(`Transaction Verified: ${type} for User ${userId}`);
      await db.collection("transaction_logs").add({
        userId,
        stripeSessionId: session2.id,
        paymentType: type,
        amount: session2.amount_total,
        currency: session2.currency,
        status: "completed",
        purchaseTimestamp: import_firebase_admin.default.firestore.FieldValue.serverTimestamp(),
        metadata: session2.metadata
      });
      await transactionAudit.logPaymentActivity(userId, "PURCHASE_COMPLETED", {
        sessionId: session2.id,
        type,
        amount: session2.amount_total
      });
      const userUpdate = {
        updatedAt: import_firebase_admin.default.firestore.FieldValue.serverTimestamp()
      };
      const profileUpdate = {
        updatedAt: import_firebase_admin.default.firestore.FieldValue.serverTimestamp()
      };
      if (type === "premium") {
        const expirationDate = /* @__PURE__ */ new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        userUpdate.isPremium = true;
        userUpdate.premiumUntil = expirationDate.toISOString();
        profileUpdate.isPremium = true;
      } else if (type === "verified") {
        userUpdate.isVerified = true;
        userUpdate.verificationStatus = "active";
        profileUpdate.isVerified = true;
      }
      await db.collection("users").doc(userId).update(userUpdate);
      const profilesSnap = await db.collection("profiles").where("ownerUid", "==", userId).get();
      if (!profilesSnap.empty) {
        const batch = db.batch();
        profilesSnap.docs.forEach((doc) => {
          batch.update(doc.ref, profileUpdate);
        });
        await batch.commit();
        logger.info(`Profiles Swapped: Syncing ${profilesSnap.size} users.`);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const userId = subscription.metadata.userId;
      if (userId) {
        await db.collection("users").doc(userId).update({
          isPremium: false,
          updatedAt: import_firebase_admin.default.firestore.FieldValue.serverTimestamp()
        });
      }
      break;
    }
    // Add more cases as needed (refunds, failures)
    case "charge.refunded": {
      const charge = event.data.object;
      const userId = charge.metadata.userId;
      if (userId) {
        logger.info(`Refund Message: Reversing access for user ${userId}`);
        await db.collection("users").doc(userId).update({
          isPremium: false,
          isVerified: false,
          updatedAt: import_firebase_admin.default.firestore.FieldValue.serverTimestamp()
        });
        const profilesSnap = await db.collection("profiles").where("ownerUid", "==", userId).get();
        if (!profilesSnap.empty) {
          const batch = db.batch();
          profilesSnap.docs.forEach((doc) => {
            batch.update(doc.ref, {
              isPremium: false,
              isVerified: false,
              updatedAt: import_firebase_admin.default.firestore.FieldValue.serverTimestamp()
            });
          });
          await batch.commit();
          logger.info(`Refund Processed: Revoking access for ${profilesSnap.size} users.`);
        }
        await transactionAudit.logPaymentActivity(userId, "REFUND_PROCESSED", {
          chargeId: charge.id,
          amount: charge.amount_refunded
        }, "warning");
      }
      break;
    }
  }
}

// server.ts
import_dotenv.default.config({ override: true });
var isProduction = process.env.NODE_ENV === "production";
var cachedSpotifyToken = null;
var spotifyTokenExpiry = 0;
async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  console.log("[SPOTIFY DIAGNOSTIC] Checking environment variables:");
  console.log(`- SPOTIFY_CLIENT_ID defined: ${!!clientId}`);
  console.log(`- SPOTIFY_CLIENT_SECRET defined: ${!!clientSecret}`);
  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET environment variables.");
  }
  const now = Date.now();
  if (cachedSpotifyToken && now < spotifyTokenExpiry) {
    console.log("[SPOTIFY DIAGNOSTIC] Using cached access token.");
    return cachedSpotifyToken;
  }
  console.log("[SPOTIFY DIAGNOSTIC] No valid cached token found. Requesting a new token...");
  const authHeader = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  console.log(`[SPOTIFY DIAGNOSTIC] Token Request HTTP Status Code: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[SPOTIFY DIAGNOSTIC] Token Request Failed! Status: ${response.status} - Body: ${errorText}`);
    throw new Error(`Failed to request Spotify token: ${response.statusText} - ${errorText}`);
  }
  const data = await response.json();
  if (!data.access_token) {
    console.error("[SPOTIFY DIAGNOSTIC] Invalid token response data:", data);
    throw new Error("Invalid response from Spotify token endpoint.");
  }
  console.log("[SPOTIFY DIAGNOSTIC] Successfully obtained a new Spotify access token.");
  cachedSpotifyToken = data.access_token;
  const expiresInSeconds = data.expires_in || 3600;
  spotifyTokenExpiry = now + expiresInSeconds * 1e3 - 3e4;
  return cachedSpotifyToken;
}
async function syncAppBrandingIcons(customLogoDataUrl) {
  try {
    let logoDataUrl = customLogoDataUrl;
    if (!logoDataUrl) {
      const { getFirestoreAdmin: getFirestoreAdmin2 } = await Promise.resolve().then(() => (init_FirebaseAdminService(), FirebaseAdminService_exports));
      const adminDb = getFirestoreAdmin2();
      const docSnap = await adminDb.collection("system_config").doc("app_branding").get();
      if (docSnap.exists) {
        const data = docSnap.data();
        logoDataUrl = data?.darkLogoUrl || data?.lightLogoUrl;
      }
    }
    if (!logoDataUrl || typeof logoDataUrl !== "string" || !logoDataUrl.startsWith("data:image/")) {
      return;
    }
    const sharp = (await import("sharp")).default;
    const base64Data = logoDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const png512 = await sharp(imageBuffer).resize(512, 512, { fit: "contain", background: { r: 3, g: 7, b: 18, alpha: 1 } }).png().toBuffer();
    const png192 = await sharp(imageBuffer).resize(192, 192, { fit: "contain", background: { r: 3, g: 7, b: 18, alpha: 1 } }).png().toBuffer();
    const png64 = await sharp(imageBuffer).resize(64, 64, { fit: "contain", background: { r: 3, g: 7, b: 18, alpha: 1 } }).png().toBuffer();
    const png180 = await sharp(imageBuffer).resize(180, 180, { fit: "contain", background: { r: 3, g: 7, b: 18, alpha: 1 } }).png().toBuffer();
    const base64Png = png512.toString("base64");
    const svgWrapper = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#030712"/>
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512"/>
</svg>`;
    const targets = ["public", "dist"];
    for (const dir of targets) {
      if (import_fs2.default.existsSync(dir)) {
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "favicon.png"), png64);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "apple-touch-icon.png"), png180);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "icon-192.png"), png192);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "icon-512.png"), png512);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "icon-maskable-512.png"), png512);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "logo-full.png"), png512);
        import_fs2.default.writeFileSync(import_path2.default.join(dir, "favicon.svg"), svgWrapper);
      }
    }
    console.log("[App Branding Sync] Successfully synced custom logo to all public & dist icon files!");
  } catch (err) {
    console.warn("[App Branding Sync Note]:", err);
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = Number(3e3);
  app.set("trust proxy", 1);
  app.use((0, import_compression.default)());
  app.use((0, import_helmet.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: { action: "sameorigin" },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  }));
  app.post("/api/payments/webhook", import_express.default.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
      if (!sig) {
        throw new Error("Missing Stripe signature");
      }
      const stripe = getStripe();
      if (!stripe || !endpointSecret) {
        console.warn("System Boundary Warning: Webhook hit but Stripe system is in sandbox mode (MISSING_SECRET). Pulse ignored.");
        return res.status(200).json({ received: true, mode: "sandbox" });
      }
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Signature Verification Failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
      await handleStripeEvent(event);
      res.json({ received: true });
    } catch (err) {
      console.error(`Webhook Processing Failed: ${err.message}`);
      res.status(500).send(`Processing Error: ${err.message}`);
    }
  });
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use((0, import_cookie_parser.default)());
  const sessionSecret = process.env.SESSION_SECRET || import_crypto.default.randomBytes(32).toString("hex");
  if (!process.env.SESSION_SECRET && isProduction) {
    console.warn("Security Warning: SESSION_SECRET is not defined. Using dynamically generated secure key. Persistent handshake integrity across restarts compromised.");
  }
  const secureCookies = isProduction || process.env.COOKIE_SECURE === "true";
  const sameSiteCookie = secureCookies ? "none" : "lax";
  app.use((0, import_express_session.default)({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: "__aeirmist_sid",
    // Obfuscate session cookie name
    cookie: {
      secure: secureCookies,
      httpOnly: true,
      sameSite: sameSiteCookie,
      maxAge: 1e3 * 60 * 60 * 24
      // 24 hours
    }
  }));
  const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Identity handshake failed: Missing token." });
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
      const { getFirebaseAdmin: getFirebaseAdmin2 } = await Promise.resolve().then(() => (init_FirebaseAdminService(), FirebaseAdminService_exports));
      const adminApp2 = getFirebaseAdmin2();
      const decodedToken = await adminApp2.auth().verifyIdToken(idToken);
      const userRole = decodedToken.role || (decodedToken.premium ? "premium" : "authenticated");
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: userRole,
        isPremium: decodedToken.premium === true,
        isVerified: decodedToken.verified === true,
        ...decodedToken
      };
      next();
    } catch (error) {
      console.error("Neural Auth Verification Failure:", error);
      res.status(401).json({ error: "UNAUTHORIZED", message: "Identity handshake failed: Invalid pulse." });
    }
  };
  app.use((req, res, next) => {
    if (req.path === "/api/payments/webhook" || req.method === "GET") {
      if (!req.session.csrfToken) {
        req.session.csrfToken = import_crypto.default.randomBytes(16).toString("hex");
      }
      res.cookie("XSRF-TOKEN", req.session.csrfToken, {
        sameSite: sameSiteCookie,
        secure: secureCookies,
        httpOnly: false
        // Must be false so the client-side JavaScript can read it
      });
      return next();
    }
    const authHeader = req.headers.authorization;
    const hasBearerToken = authHeader?.startsWith("Bearer ");
    const originHeader = req.headers.origin || req.headers.referer || "";
    const allowedOrigins = [
      "ai.studio",
      "localhost:3000",
      "localhost:5173"
    ];
    const isVerifiedLocalOrIframe = originHeader.includes(".run.app") || allowedOrigins.some((origin) => originHeader.includes(origin)) || !isProduction;
    if (hasBearerToken || isVerifiedLocalOrIframe) {
      return next();
    }
    const csrfTokenHeader = req.headers["x-csrf-token"];
    const sessionToken = req.session?.csrfToken;
    if (!sessionToken) {
      console.warn(`[Security] CSRF blocking: No session token found for ${req.method} ${req.path}`);
      return res.status(403).json({
        error: "NEURAL_PULSE_MISSING",
        message: "Security handshake required. Please reload the neural interface."
      });
    }
    if (!csrfTokenHeader || csrfTokenHeader !== sessionToken) {
      console.warn(`[Security] CSRF pulse mismatch for ${req.path}`);
      return res.status(403).json({
        error: "NEURAL_PULSE_INVALID",
        message: "Security handshake failed. Integrity scan mismatch."
      });
    }
    res.cookie("XSRF-TOKEN", sessionToken, {
      sameSite: sameSiteCookie,
      secure: secureCookies,
      httpOnly: false
    });
    next();
  });
  app.use("/api", aeirmistRateLimiter);
  app.post("/api/payments/create-checkout-session", authMiddleware, paymentRateLimiter, async (req, res, next) => {
    try {
      const { type, successUrl, cancelUrl } = req.body;
      if (!req.user) {
        return res.status(401).json({ error: "UNAUTHORIZED" });
      }
      const userId = req.user.uid;
      if (!type || !successUrl || !cancelUrl) {
        return res.status(400).json({ error: "MISSING_PARAMS", message: "Type and redirect URLs are required" });
      }
      const validateUrl = (url) => {
        try {
          const parsed = new URL(url, `http://${req.headers.host}`);
          return ["http:", "https:"].includes(parsed.protocol);
        } catch (e) {
          return url.startsWith("/");
        }
      };
      if (!validateUrl(successUrl) || !validateUrl(cancelUrl)) {
        return res.status(400).json({ error: "INVALID_URL", message: "Redirect URLs must be valid and safe" });
      }
      const session2 = await createAeirmistCheckoutSession(userId, type, successUrl, cancelUrl);
      res.json({ url: session2.url });
    } catch (error) {
      next(error);
    }
  });
  app.post("/api/auth/device-link/generate", authMiddleware, async (req, res, next) => {
    try {
      const { getFirebaseAdmin: getFirebaseAdmin2, getFirestoreAdmin: getFirestoreAdmin2, admin: admin3 } = await Promise.resolve().then(() => (init_FirebaseAdminService(), FirebaseAdminService_exports));
      const adminApp2 = getFirebaseAdmin2();
      const adminDb = getFirestoreAdmin2();
      const userId = req.user.uid;
      const token = import_crypto.default.randomBytes(16).toString("hex");
      const pairCode = Math.floor(1e5 + Math.random() * 9e5).toString();
      const customToken = await adminApp2.auth().createCustomToken(userId);
      await adminDb.collection("device_links").doc(token).set({
        uid: userId,
        customToken,
        createdAt: admin3.firestore.FieldValue.serverTimestamp(),
        status: "pending"
      });
      await adminDb.collection("numeric_device_links").doc(pairCode).set({
        uid: userId,
        customToken,
        createdAt: admin3.firestore.FieldValue.serverTimestamp(),
        status: "pending"
      });
      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const host = req.get("host");
      const link = `${protocol}://${host}/?link=${token}`;
      res.json({ token, link, pairCode });
    } catch (error) {
      console.error("Device link generation failed:", error);
      res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to generate pairing pulse." });
    }
  });
  app.post("/api/auth/set-password", authMiddleware, async (req, res, next) => {
    try {
      const userId = req.user.uid;
      const { getFirestoreAdmin: getFirestoreAdmin2 } = await Promise.resolve().then(() => (init_FirebaseAdminService(), FirebaseAdminService_exports));
      const adminDb = getFirestoreAdmin2();
      const profileQuery = adminDb.collection("profiles").where("ownerUid", "==", userId).limit(1);
      const snap = await profileQuery.get();
      if (snap.empty) {
        return res.status(404).json({ error: "PROFILE_NOT_FOUND" });
      }
      await snap.docs[0].ref.update({ hasPassword: true });
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  });
  app.post("/api/auth/device-link/consume", async (req, res, next) => {
    try {
      const { token, pairCode } = req.body;
      if (!token && !pairCode) {
        return res.status(400).json({ error: "MISSING_PARAMS", message: "Link token or pairing code is missing." });
      }
      const { getFirestoreAdmin: getFirestoreAdmin2 } = await Promise.resolve().then(() => (init_FirebaseAdminService(), FirebaseAdminService_exports));
      const adminDb = getFirestoreAdmin2();
      let docRef;
      if (pairCode) {
        const cleanCode = pairCode.toString().trim().replace(/\s/g, "");
        docRef = adminDb.collection("numeric_device_links").doc(cleanCode);
      } else {
        docRef = adminDb.collection("device_links").doc(token);
      }
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        return res.status(404).json({ error: "NOT_FOUND", message: "Pulse connection node not found or has expired." });
      }
      const data = docSnap.data();
      if (!data || data.status !== "pending") {
        return res.status(400).json({ error: "ALREADY_CONSUMED", message: "Pulse connection link has already been consumed or deactivated." });
      }
      const createdAt = data.createdAt;
      if (createdAt) {
        const createdMs = createdAt.toDate().getTime();
        const durationMs = Date.now() - createdMs;
        const fiveMinutes = 5 * 60 * 1e3;
        if (durationMs > fiveMinutes) {
          await docRef.delete();
          return res.status(400).json({ error: "EXPIRED", message: "Pulse connection link has expired (5-minute security limit)." });
        }
      }
      await docRef.delete();
      res.json({ customToken: data.customToken });
    } catch (error) {
      console.error("Device link consumption failed:", error);
      res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to process pairing pulse." });
    }
  });
  app.use(requestTracer);
  app.get("/api/diagnostics", (req, res) => {
    res.json({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "listening",
      project_id: process.env.GOOGLE_CLOUD_PROJECT || "provisioned",
      gemini_key_present: !!process.env.GEMINI_API_KEY,
      env: process.env.NODE_ENV || "development"
    });
  });
  app.post("/api/gemini/generate", async (req, res, next) => {
    try {
      const { prompt, systemInstruction, image } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY_MISSING");
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const contents = [];
      if (prompt) {
        contents.push(prompt);
      }
      if (image && image.data && image.mimeType) {
        contents.push({
          inlineData: {
            data: image.data,
            mimeType: image.mimeType
          }
        });
      }
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents
      });
      res.json({ text: result.text });
    } catch (error) {
      next(error);
    }
  });
  app.post("/api/writing/refine", async (req, res, next) => {
    try {
      const { text, mode, context } = req.body;
      if (!text && mode !== "caption" && mode !== "hashtags") {
        return res.status(400).json({ error: "MISSING_TEXT", message: "Content required" });
      }
      if (!process.env.GEMINI_API_KEY) {
        if (mode === "hashtags") {
          return res.json({ suggestions: ["#aeirmist", "#trending", "#vibes", "#daily", "#community"] });
        }
        if (mode === "caption") {
          return res.json({ suggestions: [text || "Living for moments like this \u2728", "A glimpse into today.", "Current mood: simple & golden."] });
        }
        return res.json({ result: text });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      let systemInstruction = "";
      let jsonResponse = false;
      switch (mode) {
        case "better_wording":
          systemInstruction = "Rewrite the given text to make it sound natural, clear, engaging, and expressive. Keep original intent. Return ONLY the refined text without extra quotes or intro.";
          break;
        case "grammar":
          systemInstruction = "Correct all grammatical and syntax errors while preserving the author's tone. Return ONLY the corrected text.";
          break;
        case "spelling":
          systemInstruction = "Correct any spelling mistakes in the provided text. Return ONLY the corrected text.";
          break;
        case "punctuation":
          systemInstruction = "Fix punctuation, capitalization, and sentence breaks. Return ONLY the corrected text.";
          break;
        case "shorter":
          systemInstruction = "Make the text shorter, concise, and direct while retaining core meaning. Return ONLY the shortened text.";
          break;
        case "longer":
          systemInstruction = "Expand the text with natural descriptive flow and detail. Return ONLY the expanded text.";
          break;
        case "caption":
          systemInstruction = 'Generate 3 natural, creative social media captions matching the post context or draft topic. Do NOT use fake promotional hype or generic phrases. Return JSON array of strings: ["caption 1", "caption 2", "caption 3"]';
          jsonResponse = true;
          break;
        case "hashtags":
          systemInstruction = `Recommend 5 to 8 relevant, authentic hashtags (each starting with '#') for this post content or topic. No spam tags. Return JSON array of strings: ["#tag1", "#tag2", ...]`;
          jsonResponse = true;
          break;
        case "product_title":
          systemInstruction = 'Suggest 3 clean, appealing, clear product titles for a marketplace item described. Return JSON array of strings: ["Title 1", "Title 2", "Title 3"]';
          jsonResponse = true;
          break;
        case "product_desc":
          systemInstruction = "Improve and clean up this marketplace product description. Make it well-structured, clear, legible, and helpful for prospective buyers. Return ONLY the improved description.";
          break;
        case "product_details":
          systemInstruction = 'Analyze this product title/description. Identify 2-4 missing key details buyers look for (e.g., Condition, Key Features, Specs, Included Accessories, Warranty). Return JSON object: { "missingInfo": ["detail1", "detail2"], "recommendation": "brief helpful tip" }';
          jsonResponse = true;
          break;
        case "price_format":
          systemInstruction = 'Format and validate this product price input. Return JSON object: { "formatted": "$XX.XX", "note": "Clean currency formatting applied", "rangeTip": "Suggested pricing guidance tip if helpful" }';
          jsonResponse = true;
          break;
        default:
          systemInstruction = "Refine the provided text for clarity and quality. Return ONLY the refined text.";
      }
      const promptStr = `Content: "${text || ""}"${context ? `
Context/Topic: "${context}"` : ""}`;
      const config = { systemInstruction };
      if (jsonResponse) {
        config.responseMimeType = "application/json";
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: promptStr,
        config
      });
      const rawText = response.text || "";
      if (jsonResponse) {
        try {
          const parsed = JSON.parse(rawText);
          if (Array.isArray(parsed)) {
            return res.json({ suggestions: parsed });
          }
          return res.json(parsed);
        } catch (e) {
          return res.json({ result: rawText });
        }
      }
      res.json({ result: rawText.trim() });
    } catch (err) {
      console.warn("Writing refinement fallback triggered:", err?.message);
      res.json({ result: req.body.text || "", suggestions: [] });
    }
  });
  app.post("/api/writing/moderate", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string") {
        return res.json({ isSpam: false, isAbusive: false });
      }
      if (!process.env.GEMINI_API_KEY) {
        const lower = text.toLowerCase();
        const spamKeywords = ["http://", "https://", "free crypto", "click here to win", "telegram @", "whatsapp +"];
        const abusiveKeywords = ["hate you", "kill yourself", "stupid idiot", "trash human"];
        const isSpam = spamKeywords.some((k) => lower.includes(k));
        const isAbusive = abusiveKeywords.some((k) => lower.includes(k));
        return res.json({
          isSpam,
          isAbusive,
          reason: isAbusive ? "Contains potentially harsh language." : isSpam ? "Contains promotional or link spam pattern." : null,
          suggestion: isAbusive ? "Consider rephrasing with constructive feedback." : null
        });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Text: "${text}"`,
        config: {
          systemInstruction: `Analyze the provided comment/text for social platform safety.
Check for:
1. Obvious spam (scams, suspicious repeated external links, bot phrases, crypto spam).
2. Abusive/harassing/hate/offensive language.
Do NOT flag normal slang, casual banter, constructive disagreement, or standard emojis.
Return JSON object:
{
  "isSpam": boolean,
  "isAbusive": boolean,
  "reason": string or null (polite message if flagged),
  "suggestion": string or null (polite constructive alternative if abusive)
}`,
          responseMimeType: "application/json"
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      res.json({
        isSpam: !!parsed.isSpam,
        isAbusive: !!parsed.isAbusive,
        reason: parsed.reason || null,
        suggestion: parsed.suggestion || null
      });
    } catch (e) {
      res.json({ isSpam: false, isAbusive: false, reason: null, suggestion: null });
    }
  });
  app.post("/api/writing/typo-check", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || query.trim().length < 3) {
        return res.json({ suggestion: null });
      }
      if (!process.env.GEMINI_API_KEY) {
        return res.json({ suggestion: null });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Search query: "${query}"`,
        config: {
          systemInstruction: `Analyze this search query for obvious spelling typos or wrong character keys. If there is a clear typo or misspelled word, return the corrected query string. If the query is already correctly spelled or looks like a proper name/handle, return null.
Return JSON object: { "suggestion": string or null }`,
          responseMimeType: "application/json"
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      res.json({ suggestion: parsed.suggestion || null });
    } catch (e) {
      res.json({ suggestion: null });
    }
  });
  app.get("/api/giphy/trending", async (req, res) => {
    try {
      const apiKey = process.env.GIPHY_API_KEY;
      if (!apiKey) {
        return res.json({ data: [] });
      }
      const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20&rating=g`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Giphy trending error:", error);
      res.status(500).json({ error: "Failed to fetch trending GIFs" });
    }
  });
  app.get("/api/giphy/search", async (req, res) => {
    try {
      const { q } = req.query;
      const apiKey = process.env.GIPHY_API_KEY;
      if (!apiKey) {
        return res.json({ data: [] });
      }
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=20&rating=g`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Giphy search error:", error);
      res.status(500).json({ error: "Failed to search GIFs" });
    }
  });
  app.get("/api/spotify/search", async (req, res) => {
    try {
      const { q } = req.query;
      console.log(`[SPOTIFY DIAGNOSTIC] Incoming search query: "${q}"`);
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Missing query parameter 'q'" });
      }
      const token = await getSpotifyAccessToken();
      const spotifyUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=20`;
      console.log(`[SPOTIFY DIAGNOSTIC] Exact URL being called: ${spotifyUrl}`);
      const response = await fetch(spotifyUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(`[SPOTIFY DIAGNOSTIC] Spotify API Search response status: ${response.status}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[SPOTIFY DIAGNOSTIC] Search response failed! Status: ${response.status} - Body: ${errorText}`);
        throw new Error(`Spotify API response not ok: ${response.statusText} - ${errorText}`);
      }
      const rawBody = await response.text();
      console.log(`[SPOTIFY DIAGNOSTIC] Search raw response body preview (first 500 chars): ${rawBody.substring(0, 500)}`);
      const data = JSON.parse(rawBody);
      const tracks = data.tracks?.items || [];
      const results = tracks.map((t) => ({
        name: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        albumArtURL: t.album?.images?.[0]?.url || "",
        spotifyURL: t.external_urls?.spotify || ""
      }));
      console.log(`[SPOTIFY DIAGNOSTIC] Successfully parsed ${results.length} results. Sending to client.`);
      res.json(results);
    } catch (error) {
      console.error("[SPOTIFY DIAGNOSTIC] Spotify search proxy error:", error);
      res.status(500).json({ error: "Failed to fetch tracks from Spotify", message: error.message });
    }
  });
  app.post("/api/admin/sync-logo", async (req, res) => {
    try {
      const { logoUrl } = req.body;
      if (logoUrl) {
        await syncAppBrandingIcons(logoUrl);
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get(["/favicon.png", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png", "/apple-touch-icon.png", "/logo-full.png"], (req, res, next) => {
    const fileName = import_path2.default.basename(req.path);
    const publicFile = import_path2.default.join(process.cwd(), "public", fileName);
    const distFile = import_path2.default.join(process.cwd(), "dist", fileName);
    const targetFile = import_fs2.default.existsSync(publicFile) ? publicFile : import_fs2.default.existsSync(distFile) ? distFile : null;
    if (targetFile) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Content-Type", "image/png");
      return res.sendFile(targetFile);
    }
    next();
  });
  if (!isProduction) {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path2.default.resolve(process.cwd(), "dist");
    if (import_fs2.default.existsSync(import_path2.default.join(distPath, "index.html"))) {
      app.use(import_express.default.static(distPath, {
        maxAge: "1d",
        index: false
        // we handle / with sendFile
      }));
      app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
          res.sendFile(import_path2.default.join(distPath, "index.html"));
        } else {
          res.status(404).json({ error: "API route not found" });
        }
      });
    } else {
      console.warn("CRITICAL: dist/index.html not found. System operating in API-only mode.");
      app.get("/", (req, res) => {
        res.status(503).send("System core synchronized but interface artifacts missing. Please rebuild.");
      });
    }
  }
  app.use(globalErrorHandler);
  syncAppBrandingIcons();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
startServer();
//# sourceMappingURL=server.cjs.map
