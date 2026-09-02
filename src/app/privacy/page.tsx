import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, SOCIAL_IMAGE } from "@/config/site";

import styles from "./privacy.module.css";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how What Coffee collects, uses, and protects personal information.",
    alternates: {
        canonical: absoluteUrl("/privacy"),
    },
    openGraph: {
        title: "Privacy Policy | What Coffee",
        description: "Learn how What Coffee collects, uses, and protects personal information.",
        url: absoluteUrl("/privacy"),
        images: [SOCIAL_IMAGE],
    },
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.page}>
            <article className={styles.policy}>
                <p className={styles.eyebrow}>Legal</p>
                <h1>Privacy Policy</h1>
                <p className={styles.updated}>Last updated: September 1, 2026</p>

                <p>
                    What Coffee Roastery &amp; Bakery (&ldquo;What Coffee,&rdquo; &ldquo;we,&rdquo;
                    &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy
                    explains how we collect, use, and share information when you visit our website
                    or contact us.
                </p>

                <section>
                    <h2>Information we collect</h2>
                    <p>When you use our contact form, we collect the information you provide:</p>
                    <ul>
                        <li>Your name</li>
                        <li>Your email address</li>
                        <li>The content of your message</li>
                    </ul>
                    <p>
                        We also use Google reCAPTCHA to help prevent spam and abuse. reCAPTCHA may
                        collect technical information, such as IP address, device, browser, and
                        interaction data, under Google&apos;s privacy practices.
                    </p>
                </section>

                <section>
                    <h2>How we use information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Respond to your questions, catering, event, or wholesale inquiries</li>
                        <li>Protect our contact form and website from spam, fraud, and abuse</li>
                        <li>Maintain and improve our website and customer service</li>
                    </ul>
                    <p>
                        We do not use contact-form submissions to send marketing messages unless you
                        separately agree to receive them.
                    </p>
                </section>

                <section>
                    <h2>How we share information</h2>
                    <p>
                        We share information only as needed to operate our website and respond to
                        you. This includes service providers that help us deliver email and protect
                        the contact form, including Resend and Google reCAPTCHA. These providers
                        process information under their own terms and privacy policies.
                    </p>
                    <p>
                        We do not sell personal information collected through the contact form or
                        use it for cross-context behavioral advertising.
                    </p>
                </section>

                <section>
                    <h2>Retention and security</h2>
                    <p>
                        We keep contact-form submissions for as long as reasonably necessary to
                        respond to you, maintain business records, and meet legal obligations. We
                        use reasonable administrative and technical safeguards, but no method of
                        internet transmission or storage is completely secure.
                    </p>
                </section>

                <section>
                    <h2>Your choices and privacy rights</h2>
                    <p>
                        Depending on where you live and applicable law, you may have rights to
                        request access to, correction of, or deletion of your personal information.
                        To make a request, contact us using the details below. We may need to verify
                        your identity before responding.
                    </p>
                </section>

                <section>
                    <h2>Children&apos;s privacy</h2>
                    <p>
                        Our website is not directed to children under 13, and we do not knowingly
                        collect personal information from children under 13.
                    </p>
                </section>

                <section>
                    <h2>Third-party policies</h2>
                    <p>
                        Google reCAPTCHA is subject to Google&apos;s{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Terms of Service
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2>Contact us</h2>
                    <p>
                        For questions about this policy or our privacy practices, email{" "}
                        <a href="mailto:contact@whatcoffeeandbakery.com">
                            contact@whatcoffeeandbakery.com
                        </a>{" "}
                        or write to What Coffee Roastery &amp; Bakery, 1002 Monroe Street, Santa
                        Clara, CA 95050.
                    </p>
                </section>

                <p className={styles.backLink}>
                    <Link href="/contact">Back to contact</Link>
                </p>
            </article>
        </main>
    );
}
