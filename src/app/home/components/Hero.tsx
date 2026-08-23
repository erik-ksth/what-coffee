import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Highlighter } from "@/components/ui/Highlighter";
import styles from "./Hero.module.css";
import SimpleSlider from "./SimpleSlider";

const storeSlides = [
    {
        image: "/images/site/interiors/cafe-interior-edited.jpg",
        caption: "The neighborhood table",
    },
    {
        image: "/images/site/interiors/coffee-santa-clara-2-alt.jpeg",
        caption: "The café on Monroe",
    },
    {
        image: "/images/site/pastries/donuts-edited.jpg",
        caption: "Freshly made donuts",
    },
    {
        image: "/images/site/interiors/coffee-santa-clara-1.jpeg",
        caption: "Coffee with company",
    },
    {
        image: "/images/site/interiors/coffee-santa-clara-4.jpeg",
        caption: "Our sunny corner",
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
