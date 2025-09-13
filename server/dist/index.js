"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cms_1 = require("./routes/cms");
const email_1 = require("./routes/email");
const auth_1 = require("./routes/auth");
const cache_1 = require("./routes/cache");
const sync_1 = require("./routes/sync");
const analytics_1 = require("./routes/analytics");
const rateLimit_1 = require("./middleware/rateLimit");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Apply rate limiting
app.use(rateLimit_1.generalLimiter);
// Auth routes
app.use("/api/auth", auth_1.auth);
// Cache management routes
app.use("/api/cache", cache_1.cache);
// Data synchronization routes
app.use("/api/sync", sync_1.sync);
// Analytics routes
app.use("/api/analytics", analytics_1.analytics);
// CMS routes with caching and rate limiting
app.use("/api", rateLimit_1.cmsLimiter, (0, rateLimit_1.cacheMiddleware)(), cms_1.cms);
// Email routes
app.use("/api/email", email_1.email);
app.get("/health", (_req, res) => {
    try {
        res.json({
            ok: true,
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage()
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            status: "unhealthy",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        });
    }
});
const port = Number(process.env.PORT || 4000);
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://${host}:${port}`);
});
