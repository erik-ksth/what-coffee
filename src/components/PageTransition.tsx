"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import styles from "./PageTransition.module.css";

const revealEase = [0.16, 1, 0.3, 1] as const;
const coverEase = [0.76, 0, 0.24, 1] as const;
const textEase = [0.25, 1, 0.5, 1] as const;
const zoomEase = [0.7, 0, 0.84, 0] as const;
const panelIndexes = [0, 1, 2];
const panelStagger = 0.07;
const transitionTextRows = [0, 1, 2, 3, 4, 5, 6];
const textRowStagger = 0.03;
const curtainTextOverlapDelay = 0.24;

const transitionCopyByPath: Record<string, string> = {
    "/": "What Coffee",
    "/menu": "Take Your Pick",
    "/catering-wholesale": "Catering",
    "/about": "Our Story",
    "/gallery": "Café Moments",
    "/contact": "Come Say Hi",
};

const getTransitionCopy = (pathname: string) => {
    const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    return transitionCopyByPath[normalizedPath] ?? "What Coffee";
};

const panelVariants = {
    hidden: { y: "105%" },
    cover: (index: number) => ({
        y: "0%",
        transition: {
            duration: 0.34,
            delay: index * panelStagger,
            ease: coverEase,
        },
    }),
    reveal: (index: number) => ({
        y: "-105%",
        transition: {
            duration: 0.42,
            delay: index * panelStagger,
            ease: revealEase,
        },
    }),
};

const textRowVariants = {
    hidden: { y: "90%", opacity: 0 },
    visible: (index: number) => ({
        y: "0%",
        opacity: 1,
        transition: {
            duration: 0.36,
            delay: (transitionTextRows.length - index - 1) * textRowStagger,
            ease: textEase,
        },
    }),
};

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const controls = useAnimationControls();
    const textControls = useAnimationControls();
    const textRowControls = useAnimationControls();
    const prefersReducedMotion = useReducedMotion() === true;
    const [transitionCopy, setTransitionCopy] = useState(() => getTransitionCopy(pathname));
    const isTransitioningRef = useRef(false);
    const destinationPathRef = useRef<string | null>(null);

    const playTextSequence = useCallback(async () => {
        textControls.set({ opacity: 1, scale: 1, x: 0, y: 0 });
        textRowControls.set("hidden");
        await textRowControls.start("visible");
        await textControls.start({
            opacity: [1, 1, 0],
            scale: 5.5,
            transition: {
                duration: 0.54,
                ease: zoomEase,
                opacity: {
                    duration: 0.54,
                    times: [0, 0.84, 1],
                    ease: "linear",
                },
            },
        });
        textControls.set({ opacity: 0, scale: 1, x: 0, y: 0 });
        textRowControls.set("hidden");
    }, [textControls, textRowControls]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        let cancelled = false;
        isTransitioningRef.current = true;
        destinationPathRef.current = null;
        controls.set("cover");
        textControls.set({ opacity: 0 });
        textRowControls.set("hidden");

        const frameId = window.requestAnimationFrame(() => {
            void (async () => {
                await document.fonts.ready;
                if (cancelled) return;

                await playTextSequence();
                if (cancelled) return;

                await controls.start("reveal");
                if (cancelled) return;

                controls.set("hidden");
                isTransitioningRef.current = false;
            })();
        });

        return () => {
            cancelled = true;
            window.cancelAnimationFrame(frameId);
        };
    }, [controls, playTextSequence, prefersReducedMotion, textControls, textRowControls]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleNavigation = async (event: MouseEvent) => {
            if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const target = event.target;
            if (!(target instanceof Element)) return;

            const anchor = target.closest("a");
            if (!anchor || anchor.hasAttribute("download")) return;
            if (anchor.target && anchor.target !== "_self") return;

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            const destination = new URL(anchor.href, window.location.href);
            const current = new URL(window.location.href);

            if (destination.origin !== current.origin) return;
            if (
                destination.pathname === current.pathname &&
                destination.search === current.search &&
                destination.hash === current.hash
            ) {
                return;
            }

            event.preventDefault();

            if (isTransitioningRef.current) return;

            isTransitioningRef.current = true;
            destinationPathRef.current = destination.pathname;
            setTransitionCopy(getTransitionCopy(destination.pathname));

            await Promise.all([
                controls.start("cover"),
                (async () => {
                    await new Promise((resolve) =>
                        window.setTimeout(resolve, curtainTextOverlapDelay * 1000)
                    );
                    await playTextSequence();
                })(),
            ]);
            router.push(`${destination.pathname}${destination.search}${destination.hash}`);
        };

        document.addEventListener("click", handleNavigation, true);
        return () => document.removeEventListener("click", handleNavigation, true);
    }, [controls, playTextSequence, prefersReducedMotion, router]);

    useEffect(() => {
        if (
            prefersReducedMotion ||
            !isTransitioningRef.current ||
            destinationPathRef.current !== pathname
        ) {
            return;
        }

        let cancelled = false;
        const frameId = window.requestAnimationFrame(() => {
            void (async () => {
                await controls.start("reveal");
                if (cancelled) return;

                controls.set("hidden");
                destinationPathRef.current = null;
                isTransitioningRef.current = false;
            })();
        });

        return () => {
            cancelled = true;
            window.cancelAnimationFrame(frameId);
        };
    }, [controls, pathname, prefersReducedMotion]);

    return (
        <div className={styles.page}>
            {children}

            {!prefersReducedMotion && (
                <>
                    <div className={styles.panels} aria-hidden="true">
                        {panelIndexes.map((index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                className={styles.panel}
                                variants={panelVariants}
                                initial="cover"
                                animate={controls}
                            />
                        ))}
                    </div>

                    <div className={styles.textStage} aria-hidden="true">
                        <motion.div
                            className={styles.textStack}
                            initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
                            animate={textControls}
                        >
                            {transitionTextRows.map((index) => (
                                <span key={index} className={styles.textRowMask}>
                                    <motion.span
                                        custom={index}
                                        className={
                                            index === 3 ? styles.filledText : styles.outlineText
                                        }
                                        variants={textRowVariants}
                                        initial="hidden"
                                        animate={textRowControls}
                                    >
                                        {transitionCopy}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
}
