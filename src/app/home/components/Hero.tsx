import Link from "next/link";
import { ArrowRight } from "lucide-react";

import MorphSlider from "@/components/react-bits/MorphSlider";
import { Highlighter } from "@/components/ui/Highlighter";
import styles from "./Hero.module.css";

const storeSlides = [
    {
        image: "/menu/edited/interior/Coffee Santa Clara (2) (1).jpeg",
        caption: "The café on Monroe",
    },
    {
        image: "/cafeinside.jpeg",
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
                    <MorphSlider
                        items={storeSlides}
                        transition="melt"
                        duration={1.15}
                        ease="power2.inOut"
                        intensity={0.42}
                        scale={2.6}
                        aberration={0.12}
                        drift={0.22}
                        autoplay
                        autoplayDelay={4.5}
                        radius={36}
                        overlayColor="#24130d"
                        showCaptions={false}
                        showControls={false}
                        showIndicators
                    />
                </div>
            </div>
        </section>
    );
}
