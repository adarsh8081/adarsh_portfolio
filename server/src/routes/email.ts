import { Router } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

export const email = Router();

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	message: z.string().min(1),
});

email.post("/contact", async (req, res) => {
	const input = schema.parse(req.body);

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		secure: false,
		auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
	});

	await transporter.sendMail({
		from: process.env.MAIL_FROM || input.email,
		to: process.env.MAIL_TO || process.env.SMTP_USER || "",
		subject: `Portfolio Contact: ${input.name}`,
		text: input.message,
		html: `<p>${input.message}</p><p>From: ${input.name} (${input.email})</p>`,
	});

	res.json({ ok: true });
});


