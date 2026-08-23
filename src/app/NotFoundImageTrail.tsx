"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import ImageTrail from "@/components/ui/image-trail";

import styles from "./not-found.module.css";

const trailImages = [
    { src: "/images/menu/drinks/edited/cappuccino.jpeg", alt: "" },
    { src: "/images/menu/drinks/edited/matcha-latte-creamy.png", alt: "" },
    { src: "/images/menu/drinks/edited/butterfly-lemonade.jpeg", alt: "" },
    { src: "/images/menu/drinks/edited/ube-latte.jpeg", alt: "" },
    { src: "/images/menu/food/edited/pistachio-croissant.jpeg", alt: "" },
    { src: "/images/menu/food/edited/tiramisu.jpeg", alt: "" },
    { src: "/images/menu/food/edited/breakfast-sandwich.jpeg", alt: "" },
    { src: "/images/menu/food/edited/fruit-danish.jpeg", alt: "" },
    { src: "/images/site/interiors/coffee-santa-clara-main.jpeg", alt: "" },
    { src: "/images/site/events/yellow-table-edited.jpg", alt: "" },
    { src: "/images/site/events/community-edited.jpg", alt: "" },
    { src: "/images/menu/beans/edited/south-bay-package.jpeg", alt: "" },
];

export default function NotFoundImageTrail() {
    const shouldReduceMotion = useReducedMotion();
    const [hasFinePointer, setHasFinePointer] = useState(false);

    useEffect(() => {
        const pointerQuery = window.matchMedia("(pointer: fine)");
        const updatePointer = () => setHasFinePointer(pointerQuery.matches);

        updatePointer();
        pointerQuery.addEventListener("change", updatePointer);
        return () => pointerQuery.removeEventListener("change", updatePointer);
    }, []);

    const isInteractive = hasFinePointer && !shouldReduceMotion;

    return (
        <div className={styles.trailStage}>
            <ImageTrail
                images={trailImages}
                className={styles.trail}
                staticPreview={!isInteractive}
                maxTrailImages={12}
                trailSettings={{
                    duration: 900,
                    spacing: isInteractive ? 44 : 54,
                    smoothness: 0.82,
                }}
                appearance={{
                    imageSize: isInteractive ? 138 : 96,
                    aspectRatio: 1,
                    cornerRadius: 14,
                    objectFit: "cover",
                }}
                animation={{
                    fadeInDuration: 0.2,
                    fadeOutDuration: 0.48,
                    fadeInBlur: 5,
                    fadeOutBlur: 4,
                }}
            />
        </div>
    );
}
