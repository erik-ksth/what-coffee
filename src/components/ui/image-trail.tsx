"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type ImageTrailImage = {
    src: string;
    alt?: string;
};

export type ImageTrailSettings = {
    /** How long (ms) each image stays visible before fading out. */
    duration?: number;
    /** Minimum cursor travel distance (px) before spawning the next image. */
    spacing?: number;
    /** Animation smoothness multiplier from 0–1. */
    smoothness?: number;
};

export type ImageTrailAppearance = {
    /** Width of each trail image (px). */
    imageSize?: number;
    /** CSS aspect ratio expressed as width / height. */
    aspectRatio?: number;
    /** Border radius of each image (px). */
    cornerRadius?: number;
    /** CSS object-fit used by the image. */
    objectFit?: "cover" | "contain";
};

export type ImageTrailAnimation = {
    /** Fade-in duration (seconds). */
    fadeInDuration?: number;
    /** Fade-out duration (seconds). */
    fadeOutDuration?: number;
    /** Blur applied on entry (px). */
    fadeInBlur?: number;
    /** Blur applied on exit (px). */
    fadeOutBlur?: number;
};

export type ImageTrailMagneticSettings = {
    /** Strength multiplier of the magnetic force from 0–1. */
    magneticStrength?: number;
    /** Max distance (px) at which magnetic force kicks in. */
    magneticRadius?: number;
};

export type ImageTrailProps = {
    images?: ImageTrailImage[];
    trailSettings?: ImageTrailSettings;
    appearance?: ImageTrailAppearance;
    animation?: ImageTrailAnimation;
    magneticEffect?: boolean;
    magneticSettings?: ImageTrailMagneticSettings;
    staticPreview?: boolean;
    maxTrailImages?: number;
    className?: string;
    children?: React.ReactNode;
    spacing?: number;
    duration?: number;
    smoothness?: number;
    imageSize?: number;
    aspectRatio?: number;
    cornerRadius?: number;
    objectFit?: "cover" | "contain";
    fadeInDuration?: number;
    fadeOutDuration?: number;
    fadeInBlur?: number;
    fadeOutBlur?: number;
    magneticRadius?: number;
    magneticStrength?: number;
};

type TrailEntry = {
    id: number;
    x: number;
    y: number;
    timestamp: number;
    imageIndex: number;
};

const DEFAULT_IMAGES: ImageTrailImage[] = [];

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

export function ImageTrail({
    images = DEFAULT_IMAGES,
    trailSettings,
    appearance,
    animation,
    magneticEffect = false,
    magneticSettings,
    staticPreview = false,
    maxTrailImages = 24,
    className,
    children,
    spacing,
    duration,
    smoothness,
    imageSize,
    aspectRatio,
    cornerRadius,
    objectFit,
    fadeInDuration,
    fadeOutDuration,
    fadeInBlur,
    fadeOutBlur,
    magneticRadius,
    magneticStrength,
}: ImageTrailProps) {
    const reduceMotion = useReducedMotion() === true;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lastPositionRef = React.useRef<{ x: number; y: number } | null>(null);
    const imageIdRef = React.useRef(0);
    const imageIndexRef = React.useRef(0);
    const [trailImages, setTrailImages] = React.useState<TrailEntry[]>([]);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const resolvedDuration = Math.max(120, duration ?? trailSettings?.duration ?? 1000);
    const resolvedSpacing = Math.max(4, spacing ?? trailSettings?.spacing ?? 40);
    const resolvedSmoothness = clamp(smoothness ?? trailSettings?.smoothness ?? 0.7, 0, 1);
    const resolvedImageSize = Math.max(20, imageSize ?? appearance?.imageSize ?? 100);
    const resolvedAspectRatio = Math.max(0.1, aspectRatio ?? appearance?.aspectRatio ?? 1);
    const resolvedImageHeight = resolvedImageSize / resolvedAspectRatio;
    const resolvedCornerRadius = Math.max(0, cornerRadius ?? appearance?.cornerRadius ?? 4);
    const resolvedObjectFit = objectFit ?? appearance?.objectFit ?? "cover";
    const resolvedFadeInDuration = Math.max(
        0.05,
        fadeInDuration ?? animation?.fadeInDuration ?? 0.3
    );
    const resolvedFadeOutDuration = Math.max(
        0.05,
        fadeOutDuration ?? animation?.fadeOutDuration ?? 0.5
    );
    const resolvedFadeInBlur = Math.max(0, fadeInBlur ?? animation?.fadeInBlur ?? 0);
    const resolvedFadeOutBlur = Math.max(0, fadeOutBlur ?? animation?.fadeOutBlur ?? 5);
    const resolvedMagneticStrength = clamp(
        magneticStrength ?? magneticSettings?.magneticStrength ?? 0.3,
        0,
        1
    );
    const resolvedMagneticRadius = Math.max(
        20,
        magneticRadius ?? magneticSettings?.magneticRadius ?? 100
    );

    const addTrailImage = React.useCallback(
        (x: number, y: number) => {
            if (images.length === 0) return;

            const nextPosition = { x, y };
            if (
                lastPositionRef.current &&
                distance(nextPosition, lastPositionRef.current) < resolvedSpacing
            ) {
                return;
            }

            lastPositionRef.current = nextPosition;

            React.startTransition(() => {
                setTrailImages((previous) => {
                    const next: TrailEntry = {
                        id: imageIdRef.current,
                        x,
                        y,
                        timestamp: Date.now(),
                        imageIndex: imageIndexRef.current % images.length,
                    };

                    imageIdRef.current += 1;
                    imageIndexRef.current += 1;
                    return [next, ...previous].slice(0, Math.max(1, maxTrailImages));
                });
            });
        },
        [images.length, maxTrailImages, resolvedSpacing]
    );

    const updateFromPointer = React.useCallback(
        (clientX: number, clientY: number) => {
            const node = containerRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const position = {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };

            if (magneticEffect) setMousePosition(position);
            addTrailImage(position.x, position.y);
        },
        [addTrailImage, magneticEffect]
    );

    React.useEffect(() => {
        if (staticPreview || reduceMotion) return;

        const container = containerRef.current;
        const finePointer = window.matchMedia("(pointer: fine)");
        if (!container || !finePointer.matches) return;

        const handleMouseMove = (event: MouseEvent) => {
            updateFromPointer(event.clientX, event.clientY);
        };
        const handleMouseLeave = () => {
            lastPositionRef.current = null;
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [reduceMotion, staticPreview, updateFromPointer]);

    React.useEffect(() => {
        if (staticPreview || reduceMotion) return;

        const interval = window.setInterval(() => {
            const now = Date.now();
            React.startTransition(() => {
                setTrailImages((previous) => {
                    if (previous.length === 0) return previous;

                    const activeImages = previous.filter(
                        (image) => now - image.timestamp < resolvedDuration
                    );
                    return activeImages.length === previous.length ? previous : activeImages;
                });
            });
        }, 50);

        return () => window.clearInterval(interval);
    }, [reduceMotion, resolvedDuration, staticPreview]);

    React.useEffect(() => {
        images.forEach((image) => {
            const img = new window.Image();
            img.src = image.src;
        });
    }, [images]);

    const calculateMagneticOffset = React.useCallback(
        (imageX: number, imageY: number) => {
            if (!magneticEffect) return { x: 0, y: 0 };

            const dx = mousePosition.x - imageX;
            const dy = mousePosition.y - imageY;
            const dist = Math.hypot(dx, dy);
            if (dist > resolvedMagneticRadius) return { x: 0, y: 0 };

            const force = (resolvedMagneticRadius - dist) / resolvedMagneticRadius;
            return {
                x: dx * force * resolvedMagneticStrength,
                y: dy * force * resolvedMagneticStrength,
            };
        },
        [magneticEffect, mousePosition, resolvedMagneticRadius, resolvedMagneticStrength]
    );

    const previewTrail = React.useMemo<TrailEntry[]>(() => {
        if (!staticPreview || images.length === 0) return [];

        return Array.from({ length: Math.min(images.length, 5) }, (_, index) => ({
            id: index,
            x: 100 + index * resolvedSpacing * 0.8,
            y: 110 + index * 20,
            timestamp: 0,
            imageIndex: index % images.length,
        }));
    }, [images.length, resolvedSpacing, staticPreview]);

    const entries = staticPreview ? previewTrail : trailImages;

    return (
        <div
            ref={containerRef}
            aria-hidden={children ? undefined : true}
            className={["transform-gpu overflow-visible", className].filter(Boolean).join(" ")}
        >
            {children ? <div className="relative z-10">{children}</div> : null}
            <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => {
                    const image = images[entry.imageIndex];
                    if (!image) return null;

                    const magneticOffset = calculateMagneticOffset(entry.x, entry.y);
                    const staticOpacity = Math.max(0.2, 1 - index * 0.15);

                    return (
                        <motion.div
                            key={entry.id}
                            initial={
                                reduceMotion || staticPreview
                                    ? { opacity: staticPreview ? staticOpacity : 0.7 }
                                    : {
                                          opacity: 1,
                                          scale: 0.82,
                                          filter: `blur(${resolvedFadeInBlur}px)`,
                                      }
                            }
                            animate={
                                reduceMotion || staticPreview
                                    ? {
                                          opacity: staticPreview ? staticOpacity : 0.7,
                                          x: staticPreview ? 0 : magneticOffset.x,
                                          y: staticPreview ? 0 : magneticOffset.y,
                                          filter: `blur(${resolvedFadeInBlur}px)`,
                                      }
                                    : {
                                          opacity: 1,
                                          scale: 1,
                                          filter: "blur(0px)",
                                          x: magneticOffset.x,
                                          y: magneticOffset.y,
                                      }
                            }
                            exit={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : {
                                          opacity: 0,
                                          scale: 0.72,
                                          filter: `blur(${resolvedFadeOutBlur}px)`,
                                      }
                            }
                            transition={
                                reduceMotion
                                    ? { duration: 0.15 }
                                    : {
                                          duration:
                                              resolvedSmoothness * resolvedFadeInDuration * 0.8,
                                          ease: "easeOut",
                                          opacity: {
                                              duration: resolvedFadeOutDuration * 0.7,
                                              ease: "easeIn",
                                          },
                                          x: { duration: 0.1, ease: "easeOut" },
                                          y: { duration: 0.1, ease: "easeOut" },
                                      }
                            }
                            style={{
                                position: "absolute",
                                left: entry.x - resolvedImageSize / 2,
                                top: entry.y - resolvedImageHeight / 2,
                                width: resolvedImageSize,
                                height: resolvedImageHeight,
                                pointerEvents: "none",
                                zIndex: entries.length - index,
                                willChange: "transform, opacity, filter",
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.src}
                                alt={image.alt ?? ""}
                                loading="eager"
                                decoding="async"
                                draggable={false}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: resolvedObjectFit,
                                    borderRadius: resolvedCornerRadius,
                                    display: "block",
                                    backfaceVisibility: "hidden",
                                }}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

export const MagneticImageTrail = ImageTrail;

export default ImageTrail;
