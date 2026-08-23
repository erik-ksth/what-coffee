import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";

import styles from "./catering.module.css";

export const metadata: Metadata = {
    title: "Catering & Wholesale",
    description: "Explore catering and wholesale options from What Coffee in Santa Clara.",
    openGraph: {
        title: "Catering & Wholesale | What Coffee",
        description: "Explore catering and wholesale options from What Coffee in Santa Clara.",
    },
};

export default function CateringWholesalePage() {
    return (
        <div>
            <PageHeader
                title="Coffee for every gathering."
                subtitle="Catering & wholesale"
                image="/menu/edited/interior/Coffee Santa Clara (3).jpeg"
                imagePosition="center 54%"
            >
                <p>Bring the coffee, pastries, and warmth of our café to your next gathering.</p>
                <Link href="/contact" className={styles.headerLink}>
                    Start an order
                </Link>
            </PageHeader>

            <section className={styles.offerings}>
                <article className={styles.offering}>
                    <figure className={styles.photo}>
                        <Image
                            src="/event1-edited.png"
                            alt="A community event catered by What Coffee"
                            fill
                            sizes="(max-width: 800px) 100vw, 52vw"
                        />
                    </figure>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}>Catering</p>
                        <h2>Made for gathering.</h2>
                        <p>
                            Coffee and pastries for meetings, celebrations, and community events.
                            Tell us the size of your group and we&apos;ll help keep the order
                            simple.
                        </p>
                        <Link href="/contact">Ask about catering</Link>
                    </div>
                </article>

                <article className={`${styles.offering} ${styles.reverse}`}>
                    <figure className={styles.photo}>
                        <Image
                            src="/roaster.jpg"
                            alt="Coffee beans roasting at What Coffee"
                            fill
                            sizes="(max-width: 800px) 100vw, 52vw"
                        />
                    </figure>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}>Wholesale</p>
                        <h2>Our roast, at your place.</h2>
                        <p>
                            Bring What Coffee beans to your office, shop, or hospitality program.
                            We&apos;ll talk through volume, roast preferences, and pickup options.
                        </p>
                        <Link href="/contact">Ask about wholesale</Link>
                    </div>
                </article>
            </section>
        </div>
    );
}
