"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const rateLimit_1 = require("../middleware/rateLimit");
exports.cache = (0, express_1.Router)();
// Clear cache endpoint (admin only)
exports.cache.post("/clear", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        rateLimit_1.apiCache.clear();
        res.json({ message: "Cache cleared successfully" });
    }
    catch (error) {
        console.error("Cache clear error:", error);
        res.status(500).json({ error: "Failed to clear cache" });
    }
});
// Get cache stats (admin only)
exports.cache.get("/stats", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        // This would need to be implemented in the cache middleware
        res.json({
            message: "Cache stats endpoint",
            note: "Cache statistics would be implemented here"
        });
    }
    catch (error) {
        console.error("Cache stats error:", error);
        res.status(500).json({ error: "Failed to get cache stats" });
    }
});
