import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// In-memory cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const apiCache = {
	get: (key: string) => {
		const item = cache.get(key);
		if (item && Date.now() - item.timestamp < CACHE_TTL) {
			return item.data;
		}
		cache.delete(key);
		return null;
	},
	set: (key: string, data: any) => {
		cache.set(key, { data, timestamp: Date.now() });
	},
	clear: () => {
		cache.clear();
	}
};

// Rate limiting configurations
export const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: { error: "Too many requests, please try again later." },
	standardHeaders: true,
	legacyHeaders: false,
});

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // limit each IP to 5 auth requests per windowMs
	message: { error: "Too many authentication attempts, please try again later." },
	standardHeaders: true,
	legacyHeaders: false,
});

export const searchLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 30, // limit each IP to 30 search requests per minute
	message: { error: "Too many search requests, please slow down." },
	standardHeaders: true,
	legacyHeaders: false,
});

export const cmsLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200, // limit each IP to 200 CMS requests per windowMs
	message: { error: "Too many CMS requests, please try again later." },
	standardHeaders: true,
	legacyHeaders: false,
});

// Cache middleware for GET requests
export const cacheMiddleware = (duration: number = CACHE_TTL) => {
	return (req: Request, res: Response, next: any) => {
		if (req.method !== "GET") {
			return next();
		}

		const cacheKey = `${req.originalUrl}:${JSON.stringify(req.query)}`;
		const cached = apiCache.get(cacheKey);

		if (cached) {
			return res.json(cached);
		}

		// Store original res.json
		const originalJson = res.json;
		res.json = function(data: any) {
			apiCache.set(cacheKey, data);
			return originalJson.call(this, data);
		};

		next();
	};
};
