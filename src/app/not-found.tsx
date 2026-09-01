import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
    title: "Page Not Found",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <section className={styles.page} aria-labelledby="not-found-title">
            <div className={styles.copy}>
                <p className={styles.code} aria-hidden="true">
                    404
                </p>
                <h1 id="not-found-title">
                    That page isn’t <span>on the menu.</span>
                </h1>
                <p className={styles.message}>
                    It may have moved, or the link might be out of date. Let’s get you back to
                    something fresh.
                </p>
                <Link href="/" className={styles.homeLink}>
                    <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.4} />
                    Back to home
                </Link>
            </div>
        </section>
    );
}
