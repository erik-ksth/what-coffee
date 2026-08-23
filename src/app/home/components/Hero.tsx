import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Highlighter } from "@/components/ui/Highlighter";
import styles from "./Hero.module.css";
import SimpleSlider from "./SimpleSlider";

const storeSlides = [
    {
        image: "/menu/edited/interior/Coffee Santa Clara (2) (1).jpeg",
        caption: "The café on Monroe",
    },
    {
        image: "/menu/edited/interior/Coffee Santa Clara (1).jpeg",
        caption: "Coffee with company",
    },
    {
        image: "/menu/edited/interior/Coffee Santa Clara (4).jpeg",
        caption: "Our sunny corner",
    },
    {
        image: "/menu/edited/interior/Coffee Santa Clara (2).jpeg",
        caption: "The pastry case, fully loaded",
    },
];

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <div className={styles.copy}>
                <h1 id="hero-heading" aria-label="Okay, what coffee are we having?">
                    <span className={styles.titleLead}>Okay,</span>
                    <Highlighter
                        className={styles.titleFocus}
                        color="rgba(236, 129, 78, 0.78)"
                        animationDuration={700}
                        iterations={2}
                        padding={1}
                        multiline={false}
                        animateInView
                    >
                        what coffee
                    </Highlighter>
                    <span className={styles.titleQuestion}>are we having?</span>
                </h1>
                <p className={styles.intro}>
                    Roasted in house, pastries baked every morning, and enough room to change your
                    mind twice.
                </p>
                <div className={styles.actions}>
                    <Link href="/menu" className={styles.primaryAction}>
                        Find your order
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <div className={styles.sliderArea}>
                <div className={styles.sliderFrame}>
                    <SimpleSlider slides={storeSlides} />
                </div>
            </div>
        </section>
    );
}
