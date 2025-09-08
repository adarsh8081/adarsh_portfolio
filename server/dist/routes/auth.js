"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const rateLimit_1 = require("../middleware/rateLimit");
const auth_1 = require("../middleware/auth");
exports.auth = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["admin", "editor", "user"]).default("user"),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
// Register new user (admin only)
exports.auth.post("/register", rateLimit_1.authLimiter, auth_1.authenticateToken, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user?.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }
        const input = registerSchema.parse(req.body);
        // Check if user already exists
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: input.email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 12);
        // Create user
        const user = await prisma_1.prisma.user.create({
            data: {
                email: input.email,
                name: input.name,
                role: input.role,
            }
        });
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});
// Login
exports.auth.post("/login", rateLimit_1.authLimiter, async (req, res) => {
    try {
        const input = loginSchema.parse(req.body);
        // Find user
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: input.email }
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // For demo purposes, we'll use a simple password check
        // In production, you'd hash and compare passwords
        const isValidPassword = input.password === "admin123"; // Demo password
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});
// Get current user
exports.auth.get("/me", auth_1.authenticateToken, async (req, res) => {
    res.json({ user: req.user });
});
// Create initial admin user (one-time setup)
exports.auth.post("/setup", async (req, res) => {
    try {
        // Check if any admin exists
        const adminExists = await prisma_1.prisma.user.findFirst({
            where: { role: "admin" }
        });
        if (adminExists) {
            return res.status(400).json({ error: "Admin user already exists" });
        }
        // Create admin user
        const admin = await prisma_1.prisma.user.create({
            data: {
                email: "admin@portfolio.com",
                name: "Admin User",
                role: "admin",
            }
        });
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" });
        res.status(201).json({
            user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
            token,
            message: "Admin user created successfully. Default password: admin123"
        });
    }
    catch (error) {
        console.error("Setup error:", error);
        res.status(500).json({ error: "Setup failed" });
    }
});
