import { Router } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { authenticateToken, requireEditor, AuthRequest } from "../middleware/auth";

export const cms = Router();

// Projects
const projectSchema = z.object({
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	image: z.string().optional(),
	tech: z.array(z.string()).default([]),
	tags: z.array(z.string()).default([]),
});

cms.get("/projects", async (_req, res) => {
	const data = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
	res.json(data);
});

cms.post("/projects", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const input = projectSchema.parse(req.body);
	const created = await prisma.project.create({ data: { ...input, tech: input.tech as unknown as any, tags: input.tags as unknown as any } });
	res.status(201).json(created);
});

cms.put("/projects/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	const input = projectSchema.partial().parse(req.body);
	const updated = await prisma.project.update({ where: { id }, data: { ...input, tech: input.tech as unknown as any, tags: input.tags as unknown as any } });
	res.json(updated);
});

cms.delete("/projects/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	await prisma.project.delete({ where: { id } });
	res.status(204).send();
});

// Posts
const postSchema = z.object({
	slug: z.string(),
	title: z.string(),
	summary: z.string(),
	content: z.string(),
	date: z.string(),
	tags: z.array(z.string()).default([]),
});

cms.get("/posts", async (_req, res) => {
	const data = await prisma.post.findMany({ orderBy: { date: "desc" } });
	res.json(data);
});

cms.post("/posts", async (req, res) => {
	const input = postSchema.parse(req.body);
	const created = await prisma.post.create({ data: { ...input, date: new Date(input.date), tags: input.tags as unknown as any } });
	res.status(201).json(created);
});

cms.put("/posts/:id", async (req, res) => {
	const id = Number(req.params.id);
	const input = postSchema.partial().parse(req.body);
	const updated = await prisma.post.update({ where: { id }, data: { ...input, date: input.date ? new Date(input.date) : undefined, tags: input.tags as unknown as any } });
	res.json(updated);
});

cms.delete("/posts/:id", async (req, res) => {
	const id = Number(req.params.id);
	await prisma.post.delete({ where: { id } });
	res.status(204).send();
});

// Services
const serviceSchema = z.object({
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	price: z.number().int().optional(),
});

cms.get("/services", async (_req, res) => {
	const data = await prisma.service.findMany();
	res.json(data);
});

cms.post("/services", async (req, res) => {
	const input = serviceSchema.parse(req.body);
	const created = await prisma.service.create({ data: input });
	res.status(201).json(created);
});

cms.put("/services/:id", async (req, res) => {
	const id = Number(req.params.id);
	const input = serviceSchema.partial().parse(req.body);
	const updated = await prisma.service.update({ where: { id }, data: input });
	res.json(updated);
});

cms.delete("/services/:id", async (req, res) => {
	const id = Number(req.params.id);
	await prisma.service.delete({ where: { id } });
	res.status(204).send();
});

// Skills
const skillSchema = z.object({
	name: z.string(),
	level: z.number().int().min(0).max(100),
	category: z.string(),
});

cms.get("/skills", async (_req, res) => {
	const data = await prisma.skill.findMany();
	res.json(data);
});

cms.post("/skills", async (req, res) => {
	const input = skillSchema.parse(req.body);
	const created = await prisma.skill.create({ data: input });
	res.status(201).json(created);
});

cms.put("/skills/:id", async (req, res) => {
	const id = Number(req.params.id);
	const input = skillSchema.partial().parse(req.body);
	const updated = await prisma.skill.update({ where: { id }, data: input });
	res.json(updated);
});

cms.delete("/skills/:id", async (req, res) => {
	const id = Number(req.params.id);
	await prisma.skill.delete({ where: { id } });
	res.status(204).send();
});

// Testimonials
const testimonialSchema = z.object({
	name: z.string(),
	role: z.string(),
	company: z.string().optional(),
	content: z.string(),
	rating: z.number().int().min(1).max(5).default(5),
	avatar: z.string().optional(),
	featured: z.boolean().default(false),
});

cms.get("/testimonials", async (_req, res) => {
	const data = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
	res.json(data);
});

cms.post("/testimonials", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const input = testimonialSchema.parse(req.body);
	const created = await prisma.testimonial.create({ data: input });
	res.status(201).json(created);
});

cms.put("/testimonials/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	const input = testimonialSchema.partial().parse(req.body);
	const updated = await prisma.testimonial.update({ where: { id }, data: input });
	res.json(updated);
});

cms.delete("/testimonials/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	await prisma.testimonial.delete({ where: { id } });
	res.status(204).send();
});

// Achievements
const achievementSchema = z.object({
	title: z.string(),
	description: z.string(),
	icon: z.string().optional(),
	category: z.enum(["award", "certification", "milestone", "recognition"]),
	date: z.string(),
	url: z.string().optional(),
	featured: z.boolean().default(false),
});

cms.get("/achievements", async (_req, res) => {
	const data = await prisma.achievement.findMany({ orderBy: { date: "desc" } });
	res.json(data);
});

cms.post("/achievements", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const input = achievementSchema.parse(req.body);
	const created = await prisma.achievement.create({ 
		data: { ...input, date: new Date(input.date) } 
	});
	res.status(201).json(created);
});

cms.put("/achievements/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	const input = achievementSchema.partial().parse(req.body);
	const updated = await prisma.achievement.update({ 
		where: { id }, 
		data: { ...input, date: input.date ? new Date(input.date) : undefined } 
	});
	res.json(updated);
});

cms.delete("/achievements/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	await prisma.achievement.delete({ where: { id } });
	res.status(204).send();
});

// Timeline Events
const timelineEventSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.string(),
	type: z.enum(["work", "education", "project", "achievement"]),
	location: z.string().optional(),
	company: z.string().optional(),
	url: z.string().optional(),
	featured: z.boolean().default(false),
});

cms.get("/timeline", async (_req, res) => {
	const data = await prisma.timelineEvent.findMany({ orderBy: { date: "desc" } });
	res.json(data);
});

cms.post("/timeline", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const input = timelineEventSchema.parse(req.body);
	const created = await prisma.timelineEvent.create({ 
		data: { ...input, date: new Date(input.date) } 
	});
	res.status(201).json(created);
});

cms.put("/timeline/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	const input = timelineEventSchema.partial().parse(req.body);
	const updated = await prisma.timelineEvent.update({ 
		where: { id }, 
		data: { ...input, date: input.date ? new Date(input.date) : undefined } 
	});
	res.json(updated);
});

cms.delete("/timeline/:id", authenticateToken, requireEditor, async (req: AuthRequest, res) => {
	const id = Number(req.params.id);
	await prisma.timelineEvent.delete({ where: { id } });
	res.status(204).send();
});


