import { Router } from "express";
import { prisma } from "../prisma";
import { authenticateToken, requireAdmin, AuthRequest } from "../middleware/auth";

export const sync = Router();

// Webhook endpoint for data updates
sync.post("/webhook/data-updated", async (req, res) => {
	try {
		// This endpoint can be called when data is updated
		console.log("Data update webhook received:", req.body);
		
		res.json({
			success: true,
			message: "Webhook received",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Webhook error:", error);
		res.status(500).json({
			success: false,
			message: "Webhook processing failed",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});
