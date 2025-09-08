"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEditor = exports.requireAdmin = exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma");
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback-secret");
        // Verify user still exists and get current role
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true }
        });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication required" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireAdmin = (0, exports.requireRole)(["admin"]);
exports.requireEditor = (0, exports.requireRole)(["admin", "editor"]);
