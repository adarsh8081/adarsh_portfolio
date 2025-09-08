"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../prisma");
exports.analytics = (0, express_1.Router)();
// Get analytics overview
exports.analytics.get("/overview", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        // Mock analytics data - replace with real Google Analytics/PostHog API calls
        const overview = {
            totalVisits: 1247,
            uniqueVisitors: 892,
            pageViews: 3456,
            bounceRate: 32.5,
            avgSessionDuration: 2.5,
            conversionRate: 4.2,
            trends: {
                visits: generateTrendData(30, 50, 200),
                pageViews: generateTrendData(30, 100, 500),
                bounceRate: generateTrendData(30, 20, 50),
            },
        };
        res.json({ success: true, data: overview });
    }
    catch (error) {
        console.error("Failed to fetch analytics overview:", error);
        res.status(500).json({ success: false, message: "Failed to fetch analytics data" });
    }
});
// Get top pages
exports.analytics.get("/pages", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const topPages = [
            { page: "/", views: 1247, uniqueViews: 892, bounceRate: 28.5, avgTime: 3.2 },
            { page: "/projects", views: 456, uniqueViews: 234, bounceRate: 35.2, avgTime: 2.8 },
            { page: "/about", views: 234, uniqueViews: 189, bounceRate: 42.1, avgTime: 1.9 },
            { page: "/contact", views: 123, uniqueViews: 98, bounceRate: 38.7, avgTime: 2.1 },
            { page: "/blog", views: 89, uniqueViews: 67, bounceRate: 45.3, avgTime: 1.5 },
        ];
        res.json({ success: true, data: topPages });
    }
    catch (error) {
        console.error("Failed to fetch top pages:", error);
        res.status(500).json({ success: false, message: "Failed to fetch top pages" });
    }
});
// Get audience data
exports.analytics.get("/audience", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const audience = {
            devices: { desktop: 65, mobile: 30, tablet: 5 },
            locations: [
                { country: "United States", visits: 456, percentage: 36.6 },
                { country: "United Kingdom", visits: 234, percentage: 18.8 },
                { country: "Canada", visits: 123, percentage: 9.9 },
                { country: "Germany", visits: 89, percentage: 7.1 },
                { country: "France", visits: 67, percentage: 5.4 },
            ],
            referrers: [
                { source: "Direct", visits: 456, percentage: 36.6 },
                { source: "Google", visits: 234, percentage: 18.8 },
                { source: "LinkedIn", visits: 123, percentage: 9.9 },
                { source: "Twitter", visits: 89, percentage: 7.1 },
                { source: "GitHub", visits: 67, percentage: 5.4 },
            ],
        };
        res.json({ success: true, data: audience });
    }
    catch (error) {
        console.error("Failed to fetch audience data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch audience data" });
    }
});
// Get real-time data
exports.analytics.get("/realtime", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const realtime = {
            activeUsers: Math.floor(Math.random() * 20) + 5, // Random between 5-25
            activePages: [
                { page: "/", users: Math.floor(Math.random() * 8) + 2 },
                { page: "/projects", users: Math.floor(Math.random() * 5) + 1 },
                { page: "/about", users: Math.floor(Math.random() * 3) + 1 },
                { page: "/contact", users: Math.floor(Math.random() * 3) + 1 },
            ],
        };
        res.json({ success: true, data: realtime });
    }
    catch (error) {
        console.error("Failed to fetch real-time data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch real-time data" });
    }
});
// Get chatbot analytics
exports.analytics.get("/chatbot", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        // This would typically query your chatbot logs/analytics
        const chatbotStats = {
            totalConversations: 156,
            totalMessages: 1247,
            avgMessagesPerConversation: 8.0,
            mostAskedQuestions: [
                { question: "What projects have you worked on?", count: 45 },
                { question: "What technologies do you use?", count: 32 },
                { question: "How can I contact you?", count: 28 },
                { question: "What is your experience with React?", count: 24 },
                { question: "Do you have any certifications?", count: 18 },
            ],
            voiceUsage: {
                enabled: 67,
                disabled: 89,
            },
            responseTime: {
                avg: 1.2,
                median: 0.8,
            },
        };
        res.json({ success: true, data: chatbotStats });
    }
    catch (error) {
        console.error("Failed to fetch chatbot analytics:", error);
        res.status(500).json({ success: false, message: "Failed to fetch chatbot analytics" });
    }
});
// Get content performance
exports.analytics.get("/content", auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        // Get content performance from database
        const [projects, posts, services] = await Promise.all([
            prisma_1.prisma.project.findMany({
                select: { id: true, title: true, views: true },
                orderBy: { views: 'desc' },
                take: 10,
            }),
            prisma_1.prisma.post.findMany({
                select: { id: true, title: true, views: true },
                orderBy: { views: 'desc' },
                take: 10,
            }),
            prisma_1.prisma.service.findMany({
                select: { id: true, name: true, views: true },
                orderBy: { views: 'desc' },
                take: 10,
            }),
        ]);
        const contentPerformance = {
            topProjects: projects.map(p => ({
                id: p.id,
                title: p.title,
                views: p.views || 0,
            })),
            topPosts: posts.map(p => ({
                id: p.id,
                title: p.title,
                views: p.views || 0,
            })),
            topServices: services.map(s => ({
                id: s.id,
                name: s.name,
                views: s.views || 0,
            })),
        };
        res.json({ success: true, data: contentPerformance });
    }
    catch (error) {
        console.error("Failed to fetch content performance:", error);
        res.status(500).json({ success: false, message: "Failed to fetch content performance" });
    }
});
// Track custom event (for frontend to send events)
exports.analytics.post("/track", async (req, res) => {
    try {
        const { event, properties, userId } = req.body;
        // Log the event (in production, you'd send this to your analytics service)
        console.log('Analytics Event:', {
            event,
            properties,
            userId,
            timestamp: new Date().toISOString(),
            ip: req.ip,
            userAgent: req.get('User-Agent'),
        });
        // You could also store this in your database for custom analytics
        // await prisma.analyticsEvent.create({
        //   data: {
        //     event,
        //     properties: JSON.stringify(properties),
        //     userId,
        //     ip: req.ip,
        //     userAgent: req.get('User-Agent'),
        //   }
        // });
        res.json({ success: true, message: "Event tracked successfully" });
    }
    catch (error) {
        console.error("Failed to track event:", error);
        res.status(500).json({ success: false, message: "Failed to track event" });
    }
});
// Helper function to generate trend data
function generateTrendData(days, min, max) {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toISOString().split('T')[0],
            value: Math.floor(Math.random() * (max - min + 1)) + min,
        });
    }
    return data;
}
