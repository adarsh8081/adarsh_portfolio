"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = exports.cmsLimiter = exports.searchLimiter = exports.authLimiter = exports.generalLimiter = exports.apiCache = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// In-memory cache for API responses
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
exports.apiCache = {
    get: (key) => {
        const item = cache.get(key);
        if (item && Date.now() - item.timestamp < CACHE_TTL) {
            return item.data;
        }
        cache.delete(key);
        return null;
    },
    set: (key, data) => {
        cache.set(key, { data, timestamp: Date.now() });
    },
    clear: () => {
        cache.clear();
    }
};
// Rate limiting configurations
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 auth requests per windowMs
    message: { error: "Too many authentication attempts, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.searchLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // limit each IP to 30 search requests per minute
    message: { error: "Too many search requests, please slow down." },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.cmsLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 CMS requests per windowMs
    message: { error: "Too many CMS requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
// Cache middleware for GET requests
const cacheMiddleware = (duration = CACHE_TTL) => {
    return (req, res, next) => {
        if (req.method !== "GET") {
            return next();
        }
        const cacheKey = `${req.originalUrl}:${JSON.stringify(req.query)}`;
        const cached = exports.apiCache.get(cacheKey);
        if (cached) {
            return res.json(cached);
        }
        // Store original res.json
        const originalJson = res.json;
        res.json = function (data) {
            exports.apiCache.set(cacheKey, data);
            return originalJson.call(this, data);
        };
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
