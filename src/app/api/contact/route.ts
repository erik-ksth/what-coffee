import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "aungbobo.dev@gmail.com";
const CONTACT_FROM_EMAIL =
    process.env.CONTACT_FROM_EMAIL || "WhatCoffee Contact <onboarding@resend.dev>";

interface ContactPayload {
    name?: string;
    email?: string;
    message?: string;
    honeypot?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    let body: ContactPayload;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
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
