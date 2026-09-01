"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";

import styles from "./ContactForm.module.css";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
    interface Window {
        grecaptcha?: {
            render: (
                container: HTMLElement,
                parameters: {
                    sitekey: string;
                    callback: (token: string) => void;
                    "expired-callback": () => void;
                    "error-callback": () => void;
                }
            ) => number;
            reset: (widgetId?: number) => void;
        };
    }
}

const ContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);
    const recaptchaWidgetIdRef = useRef<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    useEffect(() => {
        if (!recaptchaSiteKey || !isRecaptchaReady || !recaptchaContainerRef.current) return;

        const renderWidget = () => {
            if (recaptchaWidgetIdRef.current !== null) return true;

            const recaptcha = window.grecaptcha;
            if (typeof recaptcha?.render !== "function") return false;

            recaptchaWidgetIdRef.current = recaptcha.render(recaptchaContainerRef.current!, {
                sitekey: recaptchaSiteKey,
                callback: (token) => setRecaptchaToken(token),
                "expired-callback": () => setRecaptchaToken(null),
                "error-callback": () => setRecaptchaToken(null),
            });
            return true;
        };

        if (renderWidget()) return;

        const retryInterval = window.setInterval(() => {
            if (renderWidget()) window.clearInterval(retryInterval);
        }, 100);
        const timeout = window.setTimeout(() => window.clearInterval(retryInterval), 10_000);

        return () => {
            window.clearInterval(retryInterval);
            window.clearTimeout(timeout);
        };
    }, [isRecaptchaReady]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!recaptchaSiteKey) {
            setSubmitStatus({
                type: "error",
                message: "This form is temporarily unavailable. Please try again later.",
            });
            return;
        }

        if (!recaptchaToken) {
            setSubmitStatus({ type: "error", message: "Please complete the reCAPTCHA check." });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            honeypot: formData.get("honeypot") as string,
            recaptchaToken,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setSubmitStatus({
                type: "success",
                message: "Thank you! Your message has been sent. We'll get back to you soon.",
            });
            formRef.current?.reset();
            setRecaptchaToken(null);
            if (recaptchaWidgetIdRef.current !== null) {
                window.grecaptcha?.reset(recaptchaWidgetIdRef.current);
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.details}>
                    <p className={styles.eyebrow}>Visit</p>
                    <h2>Find us in Santa Clara.</h2>

                    <address>
                        1002 Monroe Street
                        <br />
                        Santa Clara, CA 95050
                    </address>

                    <div className={styles.hours}>
                        <div>
                            <span>Mon – Thu</span>
                            <p>7:30 AM – 5 PM</p>
                        </div>
                        <div>
                            <span>Fri</span>
                            <p>7:30 AM – 7 PM</p>
                        </div>
                        <div>
                            <span>Sat - Sunday</span>
                            <p>8 AM – 7 PM</p>
                        </div>
                    </div>

                    <div className={styles.contactLinks}>
                        <a href="tel:+14082793333">(408) 609-3146</a>
                        <a href="tel:+14082907777">(408) 290-7777</a>

                        <a href="mailto:contact@whatcoffeeandbakery.com">
                            contact@whatcoffeeandbakery.com
                        </a>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <h2>Send a message.</h2>
                        <p className={styles.intro}>
                            Have a question about catering, hosting an event, or our menu? Leave us
                            a note.
                        </p>
                    </div>

                    {submitStatus.type && (
                        <div
                            className={`${styles.status} ${submitStatus.type === "success" ? styles.success : styles.error}`}
                            role="status"
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <div className={styles.honeypot} aria-hidden="true">
                        <label htmlFor="contact-website">Website</label>
                        <input
                            id="contact-website"
                            type="text"
                            name="honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            minLength={2}
                            maxLength={120}
                            required
                        />
                    </label>

                    <label>
                        <span>Email</span>
                        <input type="email" name="email" autoComplete="email" required />
                    </label>

                    <label>
                        <span>Message</span>
                        <textarea
                            name="message"
                            rows={6}
                            minLength={10}
                            maxLength={3000}
                            required
                        />
                    </label>

                    {recaptchaSiteKey ? (
                        <div className={styles.recaptcha} ref={recaptchaContainerRef} />
                    ) : null}

                    <p className={styles.privacyNotice}>
                        By submitting, you agree that What Coffee may use your name, email, and
                        message to respond to your request, as described in our Privacy Policy.
                        Please do not include payment, medical, or other sensitive information.
                    </p>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send message"}
                    </button>
                </form>
            </div>
            {recaptchaSiteKey ? (
                <Script
                    src="https://www.google.com/recaptcha/api.js?render=explicit"
                    strategy="afterInteractive"
                    onLoad={() => setIsRecaptchaReady(true)}
                    onError={() =>
                        setSubmitStatus({
                            type: "error",
                            message: "Unable to load reCAPTCHA. Please refresh and try again.",
                        })
                    }
                />
            ) : null}
        </section>
    );
};

export default ContactForm;
