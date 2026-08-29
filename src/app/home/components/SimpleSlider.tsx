"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Image from "next/image";

import styles from "./SimpleSlider.module.css";

type Slide = {
    image: string;
    caption: string;
};

type SimpleSliderProps = {
    slides: Slide[];
    autoplayDelay?: number;
};

export default function SimpleSlider({ slides, autoplayDelay = 2000 }: SimpleSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isInteractionPaused, setIsInteractionPaused] = useState(false);
    const [isRotationStopped, setIsRotationStopped] = useState(false);
    const [isInView, setIsInView] = useState(true);
    const [isDocumentVisible, setIsDocumentVisible] = useState(true);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
            threshold: 0.2,
        });
        observer.observe(slider);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => setIsDocumentVisible(!document.hidden);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (
            reducedMotion ||
            isInteractionPaused ||
            isRotationStopped ||
            !isInView ||
            !isDocumentVisible ||
            slides.length < 2
        ) {
            return;
        }

        const timer = window.setTimeout(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, autoplayDelay);

        return () => window.clearTimeout(timer);
    }, [
        activeIndex,
        autoplayDelay,
        isDocumentVisible,
        isInView,
        isInteractionPaused,
        isRotationStopped,
        slides.length,
    ]);

    if (slides.length === 0) return null;

    return (
        <div
            ref={sliderRef}
            className={styles.slider}
            role="region"
            aria-roledescription="carousel"
            aria-label="Inside What Coffee"
            onPointerEnter={() => setIsInteractionPaused(true)}
            onPointerLeave={() => setIsInteractionPaused(false)}
            onFocusCapture={() => setIsInteractionPaused(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsInteractionPaused(false);
                }
            }}
        >
            {slides.length > 1 ? (
                <button
                    type="button"
                    className={styles.rotationControl}
                    aria-label={
                        isRotationStopped
                            ? "Start automatic photo rotation"
                            : "Stop automatic photo rotation"
                    }
                    onClick={() => setIsRotationStopped((stopped) => !stopped)}
                >
                    {isRotationStopped ? (
                        <Play aria-hidden="true" size={18} fill="currentColor" />
                    ) : (
                        <Pause aria-hidden="true" size={18} fill="currentColor" />
                    )}
                </button>
            ) : null}

            <div className={styles.slides}>
                {slides.map((slide, index) => (
                    <div
                        className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`}
                        aria-hidden={index !== activeIndex}
                        key={slide.image}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.caption}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 900px) 100vw, (max-width: 1240px) 56vw, 680px"
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>

            {slides.length > 1 ? (
                <div className={styles.indicators} aria-label="Choose a café photo">
                    {slides.map((slide, index) => (
                        <button
                            type="button"
                            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
                            aria-label={`Show image ${index + 1}: ${slide.caption}`}
                            aria-current={index === activeIndex ? "true" : undefined}
                            onClick={() => setActiveIndex(index)}
                            key={slide.image}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
