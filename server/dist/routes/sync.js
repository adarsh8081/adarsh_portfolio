"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const axios_1 = __importDefault(require("axios"));
exports.sync = (0, express_1.Router)();
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://localhost:8000";
// Trigger data refresh in Python service
exports.sync.post("/refresh-ai-data", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        // Call Python service to refresh data
        const response = await axios_1.default.post(`${PYTHON_SERVICE_URL}/refresh-data`, {}, {
            timeout: 30000, // 30 second timeout
        });
        res.json({
            success: true,
            message: response.data.message || "AI data refreshed successfully",
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error("Failed to refresh AI data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to refresh AI data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Get AI service status
exports.sync.get("/ai-status", async (_req, res) => {
    try {
        const response = await axios_1.default.get(`${PYTHON_SERVICE_URL}/health`, {
            timeout: 5000, // 5 second timeout
        });
        res.json({
            success: true,
            status: response.data,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error("Failed to get AI service status:", error);
        res.status(503).json({
            success: false,
            message: "AI service unavailable",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Get AI service statistics
exports.sync.get("/ai-stats", async (_req, res) => {
    try {
        const response = await axios_1.default.get(`${PYTHON_SERVICE_URL}/stats`, {
            timeout: 5000,
        });
        res.json({
            success: true,
            stats: response.data,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error("Failed to get AI service stats:", error);
        res.status(503).json({
            success: false,
            message: "AI service unavailable",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Webhook endpoint for automatic data sync (called by Python service)
exports.sync.post("/webhook/data-updated", async (req, res) => {
    try {
        // This endpoint can be called by the Python service when data is updated
        // For now, we'll just acknowledge the webhook
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
