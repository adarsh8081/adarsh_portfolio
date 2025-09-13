import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cms } from "./routes/cms";
import { email } from "./routes/email";
import { auth } from "./routes/auth";
import { cache } from "./routes/cache";
import { sync } from "./routes/sync";
import { analytics } from "./routes/analytics";
import { generalLimiter, searchLimiter, cmsLimiter, cacheMiddleware } from "./middleware/rateLimit";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Apply rate limiting
app.use(generalLimiter);

// Auth routes
app.use("/api/auth", auth);

// Cache management routes
app.use("/api/cache", cache);

// Data synchronization routes
app.use("/api/sync", sync);

// Analytics routes
app.use("/api/analytics", analytics);

// CMS routes with caching and rate limiting
app.use("/api", cmsLimiter, cacheMiddleware(), cms);

// Email routes
app.use("/api/email", email);

app.get("/health", (_req, res) => {
	try {
		res.json({ 
			ok: true, 
			status: "healthy",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			memory: process.memoryUsage()
		});
	} catch (error) {
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

// For Vercel deployment, export the app
if (process.env.NODE_ENV === 'production') {
	module.exports = app;
} else {
	app.listen(port, host, () => {
		// eslint-disable-next-line no-console
		console.log(`API listening on http://${host}:${port}`);
	});
}

// Also export as default for ES6 compatibility
export default app;


