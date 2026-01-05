"use client";

import { useState, FormEvent, useRef } from "react";
import { ArrowRight } from "lucide-react";

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
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-32 md:px-16">
            <div className="grid gap-16 lg:grid-cols-2 items-start">
                {/* Left column – contact details */}
                <div className="space-y-12 text-base text-zinc-600 md:mt-18">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-[2px] bg-primary"></div>
                        <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-primary uppercase">
                            Get in Touch
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-foreground text-xl">1002 Monroe Street,</p>
                        <p className="font-bold text-foreground text-xl">Santa Clara, CA 95050</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <p className="font-bold text-foreground uppercase tracking-wider text-sm">
                                Monday – Thursday
                            </p>
                            <p className="text-lg">7:30 AM – 5:00 PM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground uppercase tracking-wider text-sm">
                                Friday – Saturday
                            </p>
                            <p className="text-lg">7:30 AM – 7:00 PM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground uppercase tracking-wider text-sm">
                                Sunday
                            </p>
                            <p className="text-lg">8:00 AM – 5:00 PM</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="font-medium text-lg hover:text-primary transition-colors cursor-pointer">
                            (408) 279-3333
                        </p>
                        <p className="font-medium text-lg hover:text-primary transition-colors cursor-pointer">
                            hello@whatcoffee.com
                        </p>
                    </div>

                    <div className="h-px w-full bg-stone-200" />
                </div>

                {/* Right column – form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 bg-zinc-50 p-8 md:p-12 rounded-3xl"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground pb-4">
                            Send a Message
                        </h2>
                        <p className="mt-2 text-lg text-zinc-600 font-light leading-relaxed">
                            Have a question about catering, hosting an event, or our menu? Leave us
                            a note and we&apos;ll get back to you as soon as we can.
                        </p>
                    </div>

                    {/* Success/Error messages */}
                    {submitStatus.type && (
                        <div
                            className={`rounded-xl p-4 text-sm font-medium ${submitStatus.type === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                                }`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <label className="flex flex-col gap-3 text-sm font-bold text-foreground uppercase tracking-wider">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            className="h-16 w-full border border-stone-200 bg-white px-6 text-base text-stone-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                        />
                    </label>

                    <label className="flex flex-col gap-3 text-sm font-bold text-foreground uppercase tracking-wider">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="h-16 w-full border border-stone-200 bg-white px-6 text-base text-stone-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                        />
                    </label>

                    <label className="flex flex-col gap-3 text-sm font-bold text-foreground uppercase tracking-wider">
                        <span>Message</span>
                        <textarea
                            name="message"
                            rows={6}
                            className="w-full resize-y border border-stone-200 bg-white px-6 py-4 text-base text-stone-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                        />
                    </label>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground disabled:hover:text-background"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && (
                                <span
                                    aria-hidden="true"
                                    className="group-hover:translate-x-1 transition-transform"
                                >
                                    ›
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
