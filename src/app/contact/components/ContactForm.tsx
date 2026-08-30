"use client";

import { useState, FormEvent, useRef } from "react";

import styles from "./ContactForm.module.css";

const ContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
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
                            <span>Fri – Sat</span>
                            <p>7:30 AM – 7 PM</p>
                        </div>
                        <div>
                            <span>Sunday</span>
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

                    <label>
                        <span>Name</span>
                        <input type="text" name="name" autoComplete="name" required />
                    </label>

                    <label>
                        <span>Email</span>
                        <input type="email" name="email" autoComplete="email" required />
                    </label>

                    <label>
                        <span>Message</span>
                        <textarea name="message" rows={6} required />
                    </label>

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
        </section>
    );
};

export default ContactForm;
