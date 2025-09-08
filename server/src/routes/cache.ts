import { Router } from "express";
import { authenticateToken, requireAdmin, AuthRequest } from "../middleware/auth";
import { apiCache } from "../middleware/rateLimit";

export const cache = Router();

// Clear cache endpoint (admin only)
cache.post("/clear", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
	try {
		apiCache.clear();
		res.json({ message: "Cache cleared successfully" });
	} catch (error) {
		console.error("Cache clear error:", error);
		res.status(500).json({ error: "Failed to clear cache" });
	}
});

// Get cache stats (admin only)
cache.get("/stats", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
	try {
		// This would need to be implemented in the cache middleware
		res.json({ 
			message: "Cache stats endpoint",
			note: "Cache statistics would be implemented here"
		});
	} catch (error) {
		console.error("Cache stats error:", error);
		res.status(500).json({ error: "Failed to get cache stats" });
	}
});
