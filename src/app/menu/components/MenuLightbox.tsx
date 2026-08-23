"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { MenuItem } from "../menu-data";
import styles from "./MenuLightbox.module.css";

interface MenuLightboxProps {
    items: MenuItem[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    onClose: () => void;
    returnFocusTo: HTMLButtonElement | null;
}

const imageVariants = {
    enter: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: 0,
        x: reducedMotion ? 0 : direction * 64,
        scale: reducedMotion ? 1 : 0.985,
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
    },
    exit: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: 0,
        x: reducedMotion ? 0 : direction * -64,
        scale: reducedMotion ? 1 : 0.985,
    }),
};

export default function MenuLightbox({
    items,
    selectedIndex,
    onSelect,
    onClose,
    returnFocusTo,
}: MenuLightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [direction, setDirection] = useState(1);
    const item = items[selectedIndex];
    const hasMultipleItems = items.length > 1;

    const move = (step: -1 | 1) => {
        setDirection(step);
        onSelect((selectedIndex + step + items.length) % items.length);
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        const previousBodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        dialog?.showModal();

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            returnFocusTo?.focus();
        };
    }, [returnFocusTo]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (!hasMultipleItems) return;

            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    if (!item) return null;

    const motionContext = { direction, reducedMotion: Boolean(shouldReduceMotion) };

    return (
        <motion.dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="menu-lightbox-title"
            aria-describedby="menu-lightbox-description"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
        >
            <motion.div
                className={styles.viewer}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.965 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                transition={{
                    type: "spring",
                    bounce: 0,
                    duration: shouldReduceMotion ? 0.1 : 0.34,
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close photo"
                >
                    <X aria-hidden="true" size={21} strokeWidth={2.2} />
                </button>

                {hasMultipleItems && (
                    <>
                        <button
                            type="button"
                            className={`${styles.navigation} ${styles.previous}`}
                            onClick={() => move(-1)}
                            aria-label="View previous menu item"
                        >
                            <ChevronLeft aria-hidden="true" size={25} strokeWidth={2.2} />
                        </button>
                        <button
                            type="button"
                            className={`${styles.navigation} ${styles.next}`}
                            onClick={() => move(1)}
                            aria-label="View next menu item"
                        >
                            <ChevronRight aria-hidden="true" size={25} strokeWidth={2.2} />
                        </button>
                    </>
                )}

                <div className={styles.stage}>
                    <AnimatePresence initial={false} mode="popLayout" custom={motionContext}>
                        <motion.div
                            key={item.name}
                            className={styles.imageFrame}
                            custom={motionContext}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                type: "spring",
                                bounce: 0,
                                duration: shouldReduceMotion ? 0.1 : 0.34,
                            }}
                            drag={shouldReduceMotion || !hasMultipleItems ? false : "x"}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.16}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -60 || info.velocity.x < -500) move(1);
                                if (info.offset.x > 60 || info.velocity.x > 500) move(-1);
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                priority
                                sizes="100vw"
                                className={styles.image}
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    key={`caption-${item.name}`}
                    className={styles.caption}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.22 }}
                >
                    <div>
                        <h2 id="menu-lightbox-title">{item.name}</h2>
                        <p id="menu-lightbox-description">{item.description}</p>
                    </div>
                    <span aria-label={`${selectedIndex + 1} of ${items.length}`}>
                        {selectedIndex + 1} / {items.length}
                    </span>
                </motion.div>
            </motion.div>
        </motion.dialog>
    );
}
