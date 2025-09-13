"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
const express_1 = require("express");
exports.sync = (0, express_1.Router)();
// Webhook endpoint for data updates
exports.sync.post("/webhook/data-updated", async (req, res) => {
    try {
        // This endpoint can be called when data is updated
        console.log("Data update webhook received:", req.body);
        res.json({
            success: true,
            message: "Webhook received",
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({
            success: false,
            message: "Webhook processing failed",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
