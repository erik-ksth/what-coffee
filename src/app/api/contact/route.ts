import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "aungag1998@gmail.com";
const CONTACT_FROM_EMAIL =
    process.env.CONTACT_FROM_EMAIL || "WhatCoffee Contact <onboarding@resend.dev>";
const RATE_LIMIT_MAX_REQUESTS = getPositiveInteger(process.env.CONTACT_RATE_LIMIT_MAX, 3);
const RATE_LIMIT_WINDOW_MS =
    getPositiveInteger(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS, 15 * 60) * 1000;
const MAX_REQUEST_BODY_BYTES = getPositiveInteger(process.env.CONTACT_MAX_BODY_BYTES, 16 * 1024);
const MAX_TRACKED_CLIENTS = 10_000;

interface RateLimitBucket {
    count: number;
    resetAt: number;
}

const rateLimitBuckets = new Map<string, RateLimitBucket>();

interface ContactPayload {
    name?: string;
    email?: string;
    message?: string;
    honeypot?: string;
    recaptchaToken?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class RequestBodyTooLargeError extends Error {}

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY || !process.env.RECAPTCHA_SECRET_KEY) {
        return NextResponse.json(
            { error: "The contact form is temporarily unavailable." },
            { status: 500 }
        );
    }

    let body: unknown;
    try {
        body = await parseRequestBody(request);
    } catch (error) {
        if (error instanceof RequestBodyTooLargeError) {
            return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
        }

        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (!isContactPayload(body)) {
        return NextResponse.json({ error: "Contact form fields must be text." }, { status: 400 });
    }

    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { error: "Too many contact requests. Please try again later." },
            {
                status: 429,
                headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
            }
        );
    }

    // Honeypot spam protection
    if (body.honeypot) {
        return NextResponse.json({ success: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    // Validation
    if (!name || name.length < 2 || name.length > 120) {
        return NextResponse.json(
            { error: "Please provide a valid name (2-120 characters)." },
            { status: 400 }
        );
    }

    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { error: "Please provide a valid email address." },
            { status: 400 }
        );
    }

    if (message.length < 10 || message.length > 3000) {
        return NextResponse.json(
            { error: "Message should be between 10 and 3000 characters." },
            { status: 400 }
        );
    }

    const recaptchaToken = body.recaptchaToken?.trim();
    if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
        return NextResponse.json(
            { error: "reCAPTCHA verification failed. Please try again." },
            { status: 403 }
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: CONTACT_FROM_EMAIL,
            to: [CONTACT_TO_EMAIL],
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            html: generateEmailHtml({ name, email, message }),
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: "Unable to send message right now. Please try again later." },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true, messageId: data?.id });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}

function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();

    return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
    const now = Date.now();
    const bucket = rateLimitBuckets.get(ip);

    if (bucket && bucket.resetAt > now) {
        if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
            return {
                allowed: false,
                retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
            };
        }

        bucket.count += 1;
        return { allowed: true, retryAfterSeconds: 0 };
    }

    // Bounds memory if an attacker sends requests with many unique IP values.
    if (rateLimitBuckets.size >= MAX_TRACKED_CLIENTS) {
        const oldestIp = rateLimitBuckets.keys().next().value as string | undefined;
        if (oldestIp) rateLimitBuckets.delete(oldestIp);
    }

    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
}

function getPositiveInteger(value: string | undefined, fallback: number): number {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function isContactPayload(value: unknown): value is ContactPayload {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;

    return ["name", "email", "message", "honeypot", "recaptchaToken"].every((field) => {
        const fieldValue = (value as Record<string, unknown>)[field];
        return fieldValue === undefined || typeof fieldValue === "string";
    });
}

async function parseRequestBody(request: Request): Promise<unknown> {
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_REQUEST_BODY_BYTES) {
        throw new RequestBodyTooLargeError();
    }

    if (!request.body) throw new SyntaxError("Request body is missing");

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            totalBytes += value.byteLength;
            if (totalBytes > MAX_REQUEST_BODY_BYTES) {
                await reader.cancel();
                throw new RequestBodyTooLargeError();
            }

            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }

    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new SyntaxError("JSON payload must be an object");
    }

    return parsed;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return false;

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
            signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) return false;

        const result: { success?: boolean } = await response.json();
        return result.success === true;
    } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        return false;
    }
}

function generateEmailHtml({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; border-left: 4px solid #ec814e;">
          <h2 style="color: #111827; margin-top: 0; font-size: 24px;">New Contact Form Message</h2>

          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 8px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #111827;">${escapeHtml(name)}</span></p>
            <p style="margin: 8px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #ec814e; text-decoration: none;">${escapeHtml(email)}</a></p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #374151;">Message:</strong></p>
            <div style="color: #111827; white-space: pre-wrap; line-height: 1.8;">${escapeHtml(message)}</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
