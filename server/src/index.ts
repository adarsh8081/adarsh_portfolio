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
	res.json({ ok: true });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`API listening on http://localhost:${port}`);
});


