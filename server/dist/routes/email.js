"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const zod_1 = require("zod");
exports.email = (0, express_1.Router)();
const schema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    message: zod_1.z.string().min(1),
});
exports.email.post("/contact", async (req, res) => {
    const input = schema.parse(req.body);
    const transporter = nodemailer_1.default.createTransport({
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
