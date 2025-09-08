import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export interface AuthRequest extends Request {
	user?: {
		id: number;
		email: string;
		role: string;
	};
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

	if (!token) {
		return res.status(401).json({ error: "Access token required" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
		
		// Verify user still exists and get current role
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
			select: { id: true, email: true, role: true }
		});

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Invalid or expired token" });
	}
};

export const requireRole = (roles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ error: "Authentication required" });
		}

		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ error: "Insufficient permissions" });
		}

		next();
	};
};

export const requireAdmin = requireRole(["admin"]);
export const requireEditor = requireRole(["admin", "editor"]);
