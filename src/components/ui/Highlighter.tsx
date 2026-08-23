"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

type AnnotationAction =
    | "highlight"
    | "underline"
    | "box"
    | "circle"
    | "strike-through"
    | "crossed-off"
    | "bracket";

interface HighlighterProps {
    children: ReactNode;
    className?: string;
    action?: AnnotationAction;
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    animateInView?: boolean;
}

export function Highlighter({
    children,
    className,
    action = "highlight",
    color = "#ffd1dc",
    strokeWidth = 1.5,
    animationDuration = 600,
    iterations = 2,
    padding = 2,
    multiline = true,
    animateInView = false,
}: HighlighterProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(elementRef, { once: true, margin: "-10%" });
    const prefersReducedMotion = useReducedMotion();
    const shouldShow = !animateInView || isInView;

    useLayoutEffect(() => {
        const element = elementRef.current;
        let annotation: RoughAnnotation | null = null;

        if (shouldShow && element) {
            annotation = annotate(element, {
                type: action,
                color,
                strokeWidth,
                animationDuration,
                iterations,
                padding,
                multiline,
                animate: !prefersReducedMotion,
            });
            annotation.show();
        }

        return () => annotation?.remove();
    }, [
        action,
        animationDuration,
        color,
        iterations,
        multiline,
        padding,
        prefersReducedMotion,
        shouldShow,
        strokeWidth,
    ]);

    return (
        <span ref={elementRef} className={className}>
            {children}
        </span>
    );
}
