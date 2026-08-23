"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./Gallery.module.css";

const parallaxImages = [
    {
        src: "/yellow-table.jpeg",
        alt: "Coffee and a pastry on the café patio",
        depth: 1,
    },
    {
        src: "/aesthetic-pastries.jpeg",
        alt: "Fresh pastries at What Coffee",
        depth: -0.42,
    },
    {
        src: "/sunrise.jpeg",
        alt: "Morning light at What Coffee",
        depth: 0.58,
    },
    {
        src: "/cafeinside.jpeg",
        alt: "Inside the What Coffee café",
        depth: 0.88,
    },
    {
        src: "/event1.jpeg",
        alt: "A community event at What Coffee",
        depth: 0.72,
    },
    {
        src: "/cream_croissant.jpeg",
        alt: "A filled croissant made at What Coffee",
        depth: -0.55,
    },
    {
        src: "/donuts.jpeg",
        alt: "Freshly made donuts",
        depth: 0.48,
    },
    {
        src: "/menu/edited/interior/Coffee Santa Clara.jpeg",
        alt: "The What Coffee shop in Santa Clara",
        depth: 1.08,
    },
];

const HORIZONTAL_RANGE = 28;
const VERTICAL_RANGE = 20;
const FOLLOW_STRENGTH = 0.13;

export default function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRefs = useRef<Array<HTMLElement | null>>([]);
    const frameRef = useRef<number | null>(null);
    const currentRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    const renderFrame = () => {
        const current = currentRef.current;
        const target = targetRef.current;

        current.x += (target.x - current.x) * FOLLOW_STRENGTH;
        current.y += (target.y - current.y) * FOLLOW_STRENGTH;

        imageRefs.current.forEach((image, index) => {
            if (!image) return;

            const depth = parallaxImages[index].depth;
            image.style.setProperty("--parallax-x", `${current.x * depth}px`);
            image.style.setProperty("--parallax-y", `${current.y * depth}px`);
        });

        const isSettled =
            Math.abs(target.x - current.x) < 0.02 && Math.abs(target.y - current.y) < 0.02;

        if (isSettled) {
            currentRef.current = { ...target };
            frameRef.current = null;
            return;
        }

        frameRef.current = window.requestAnimationFrame(renderFrame);
    };

    const requestFrame = () => {
        if (frameRef.current === null) {
            frameRef.current = window.requestAnimationFrame(renderFrame);
        }
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === "touch") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const section = sectionRef.current;
        if (!section) return;

        const bounds = section.getBoundingClientRect();
        const normalizedX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const normalizedY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        targetRef.current = {
            x: normalizedX * HORIZONTAL_RANGE,
            y: normalizedY * VERTICAL_RANGE,
        };
        requestFrame();
    };

    const handlePointerLeave = () => {
        targetRef.current = { x: 0, y: 0 };
        requestFrame();
    };

    useEffect(() => {
        const images = imageRefs.current;

        return () => {
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
            images.forEach((image) => {
                image?.style.removeProperty("--parallax-x");
                image?.style.removeProperty("--parallax-y");
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-labelledby="closing-heading"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <div className={styles.parallaxStage} aria-label="Moments from What Coffee">
                {parallaxImages.map((image, index) => (
                    <figure
                        className={styles.photo}
                        key={image.src}
                        ref={(node) => {
                            imageRefs.current[index] = node;
                        }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 700px) 46vw, 22vw"
                            className={styles.image}
                        />
                    </figure>
                ))}
            </div>

            <div className={styles.content}>
                <p className={styles.prompt}>
                    {/* <span className={styles.desktopPrompt}>Move your cursor</span> */}
                    <span className={styles.touchPrompt}>Life at What Coffee</span>
                </p>
                <h2 id="closing-heading">
                    A few moments <em>from the café.</em>
                </h2>
                <Link href="/gallery" className={styles.action}>
                    See the gallery
                </Link>
            </div>
        </section>
    );
}
