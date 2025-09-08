import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../prisma";
import { authLimiter } from "../middleware/rateLimit";
import { authenticateToken, AuthRequest } from "../middleware/auth";

export const auth = Router();

const registerSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(6),
	role: z.enum(["admin", "editor", "user"]).default("user"),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

// Register new user (admin only)
auth.post("/register", authLimiter, authenticateToken, async (req: AuthRequest, res) => {
	try {
		// Check if user is admin
		if (req.user?.role !== "admin") {
			return res.status(403).json({ error: "Admin access required" });
		}

		const input = registerSchema.parse(req.body);
		
		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: input.email }
		});

		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(input.password, 12);

		// Create user
		const user = await prisma.user.create({
			data: {
				email: input.email,
				name: input.name,
				password: hashedPassword,
				role: input.role,
			}
		});

		// Generate JWT
		const token = jwt.sign(
			{ userId: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || "fallback-secret",
			{ expiresIn: "7d" }
		);

		res.status(201).json({
			user: { id: user.id, email: user.email, name: user.name, role: user.role },
			token
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ error: "Registration failed" });
	}
});

// Login
auth.post("/login", authLimiter, async (req, res) => {
	try {
		const input = loginSchema.parse(req.body);

		// Find user in database
		const user = await prisma.user.findUnique({
			where: { email: input.email }
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Check password if user has one (for database users)
		if (user.password) {
			const isValidPassword = await bcrypt.compare(input.password, user.password);
			if (!isValidPassword) {
				return res.status(401).json({ error: "Invalid credentials" });
			}
		} else {
			// For Auth0 users or demo purposes, use simple password check
			const isValidPassword = input.password === "admin123";
			if (!isValidPassword) {
				return res.status(401).json({ error: "Invalid credentials" });
			}
		}

		// Generate JWT
		const token = jwt.sign(
			{ userId: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || "fallback-secret",
			{ expiresIn: "7d" }
		);

		res.json({
			user: { id: user.id, email: user.email, name: user.name, role: user.role },
			token
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Login failed" });
	}
});

// Get current user
auth.get("/me", authenticateToken, async (req: AuthRequest, res) => {
	// Return the authenticated user from the database
	res.json({ user: req.user });
});

// Create initial admin user (one-time setup)
auth.post("/setup", async (req, res) => {
	try {
		// Check if any admin exists
		const adminExists = await prisma.user.findFirst({
			where: { role: "admin" }
		});

		if (adminExists) {
			return res.status(400).json({ error: "Admin user already exists" });
		}

		// Hash default password
		const hashedPassword = await bcrypt.hash("admin123", 12);

		// Create admin user
		const admin = await prisma.user.create({
			data: {
				email: "admin@portfolio.com",
				name: "Admin User",
				password: hashedPassword,
				role: "admin",
			}
		});

		// Generate JWT
		const token = jwt.sign(
			{ userId: admin.id, email: admin.email, role: admin.role },
			process.env.JWT_SECRET || "fallback-secret",
			{ expiresIn: "7d" }
		);

		res.status(201).json({
			user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
			token,
			message: "Admin user created successfully. Default password: admin123"
		});
	} catch (error) {
		console.error("Setup error:", error);
		res.status(500).json({ error: "Setup failed" });
	}
});
