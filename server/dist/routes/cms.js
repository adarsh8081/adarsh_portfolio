"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cms = void 0;
const express_1 = require("express");
const prisma_1 = require("../prisma");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
exports.cms = (0, express_1.Router)();
// Projects
const projectSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    image: zod_1.z.string().optional(),
    tech: zod_1.z.array(zod_1.z.string()).default([]),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.cms.get("/projects", async (_req, res) => {
    const data = await prisma_1.prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    res.json(data);
});
exports.cms.post("/projects", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const input = projectSchema.parse(req.body);
    const created = await prisma_1.prisma.project.create({ data: { ...input, tech: input.tech, tags: input.tags } });
    res.status(201).json(created);
});
exports.cms.put("/projects/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    const input = projectSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.project.update({ where: { id }, data: { ...input, tech: input.tech, tags: input.tags } });
    res.json(updated);
});
exports.cms.delete("/projects/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.project.delete({ where: { id } });
    res.status(204).send();
});
// Posts
const postSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    title: zod_1.z.string(),
    summary: zod_1.z.string(),
    content: zod_1.z.string(),
    date: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.cms.get("/posts", async (_req, res) => {
    const data = await prisma_1.prisma.post.findMany({ orderBy: { date: "desc" } });
    res.json(data);
});
exports.cms.post("/posts", async (req, res) => {
    const input = postSchema.parse(req.body);
    const created = await prisma_1.prisma.post.create({ data: { ...input, date: new Date(input.date), tags: input.tags } });
    res.status(201).json(created);
});
exports.cms.put("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const input = postSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.post.update({ where: { id }, data: { ...input, date: input.date ? new Date(input.date) : undefined, tags: input.tags } });
    res.json(updated);
});
exports.cms.delete("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.post.delete({ where: { id } });
    res.status(204).send();
});
// Services
const serviceSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().int().optional(),
});
exports.cms.get("/services", async (_req, res) => {
    const data = await prisma_1.prisma.service.findMany();
    res.json(data);
});
exports.cms.post("/services", async (req, res) => {
    const input = serviceSchema.parse(req.body);
    const created = await prisma_1.prisma.service.create({ data: input });
    res.status(201).json(created);
});
exports.cms.put("/services/:id", async (req, res) => {
    const id = Number(req.params.id);
    const input = serviceSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.service.update({ where: { id }, data: input });
    res.json(updated);
});
exports.cms.delete("/services/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.service.delete({ where: { id } });
    res.status(204).send();
});
// Skills
const skillSchema = zod_1.z.object({
    name: zod_1.z.string(),
    level: zod_1.z.number().int().min(0).max(100),
    category: zod_1.z.string(),
});
exports.cms.get("/skills", async (_req, res) => {
    const data = await prisma_1.prisma.skill.findMany();
    res.json(data);
});
exports.cms.post("/skills", async (req, res) => {
    const input = skillSchema.parse(req.body);
    const created = await prisma_1.prisma.skill.create({ data: input });
    res.status(201).json(created);
});
exports.cms.put("/skills/:id", async (req, res) => {
    const id = Number(req.params.id);
    const input = skillSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.skill.update({ where: { id }, data: input });
    res.json(updated);
});
exports.cms.delete("/skills/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.skill.delete({ where: { id } });
    res.status(204).send();
});
// Testimonials
const testimonialSchema = zod_1.z.object({
    name: zod_1.z.string(),
    role: zod_1.z.string(),
    company: zod_1.z.string().optional(),
    content: zod_1.z.string(),
    rating: zod_1.z.number().int().min(1).max(5).default(5),
    avatar: zod_1.z.string().optional(),
    featured: zod_1.z.boolean().default(false),
});
exports.cms.get("/testimonials", async (_req, res) => {
    const data = await prisma_1.prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    res.json(data);
});
exports.cms.post("/testimonials", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const input = testimonialSchema.parse(req.body);
    const created = await prisma_1.prisma.testimonial.create({ data: input });
    res.status(201).json(created);
});
exports.cms.put("/testimonials/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    const input = testimonialSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.testimonial.update({ where: { id }, data: input });
    res.json(updated);
});
exports.cms.delete("/testimonials/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.testimonial.delete({ where: { id } });
    res.status(204).send();
});
// Achievements
const achievementSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
    category: zod_1.z.enum(["award", "certification", "milestone", "recognition"]),
    date: zod_1.z.string(),
    url: zod_1.z.string().optional(),
    featured: zod_1.z.boolean().default(false),
});
exports.cms.get("/achievements", async (_req, res) => {
    const data = await prisma_1.prisma.achievement.findMany({ orderBy: { date: "desc" } });
    res.json(data);
});
exports.cms.post("/achievements", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const input = achievementSchema.parse(req.body);
    const created = await prisma_1.prisma.achievement.create({
        data: { ...input, date: new Date(input.date) }
    });
    res.status(201).json(created);
});
exports.cms.put("/achievements/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    const input = achievementSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.achievement.update({
        where: { id },
        data: { ...input, date: input.date ? new Date(input.date) : undefined }
    });
    res.json(updated);
});
exports.cms.delete("/achievements/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.achievement.delete({ where: { id } });
    res.status(204).send();
});
// Timeline Events
const timelineEventSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    type: zod_1.z.enum(["work", "education", "project", "achievement"]),
    location: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    featured: zod_1.z.boolean().default(false),
});
exports.cms.get("/timeline", async (_req, res) => {
    const data = await prisma_1.prisma.timelineEvent.findMany({ orderBy: { date: "desc" } });
    res.json(data);
});
exports.cms.post("/timeline", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const input = timelineEventSchema.parse(req.body);
    const created = await prisma_1.prisma.timelineEvent.create({
        data: { ...input, date: new Date(input.date) }
    });
    res.status(201).json(created);
});
exports.cms.put("/timeline/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    const input = timelineEventSchema.partial().parse(req.body);
    const updated = await prisma_1.prisma.timelineEvent.update({
        where: { id },
        data: { ...input, date: input.date ? new Date(input.date) : undefined }
    });
    res.json(updated);
});
exports.cms.delete("/timeline/:id", auth_1.authenticateToken, auth_1.requireEditor, async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.timelineEvent.delete({ where: { id } });
    res.status(204).send();
});
