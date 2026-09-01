"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import type { MenuItem } from "../menu-data";
import MenuItemCard from "./MenuItemCard";
import MenuLightbox from "./MenuLightbox";
import styles from "./MenuGrid.module.css";

interface MenuGridProps {
    items: MenuItem[];
    animationKey: string;
    direction: number;
}

const transitionVariants = {
    enter: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: reducedMotion ? 1 : 0,
        x: reducedMotion ? 0 : direction * 14,
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: reducedMotion ? 1 : 0,
        x: reducedMotion ? 0 : direction * -10,
    }),
};

export default function MenuGrid({ items, animationKey, direction }: MenuGridProps) {
    const shouldReduceMotion = useReducedMotion();
    const custom = { direction, reducedMotion: Boolean(shouldReduceMotion) };
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [opener, setOpener] = useState<HTMLButtonElement | null>(null);

    return (
        <div className={styles.transitionFrame}>
            <AnimatePresence initial={false} mode="wait" custom={custom}>
                <motion.div
                    key={animationKey}
                    className={styles.grid}
                    custom={custom}
                    variants={transitionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.22,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {items.map((item, index) => (
                        <MenuItemCard
                            key={item.name}
                            item={item}
                            onOpen={(trigger) => {
                                setOpener(trigger);
                                setSelectedIndex(index);
                            }}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <MenuLightbox
                        items={items}
                        selectedIndex={selectedIndex}
                        onSelect={setSelectedIndex}
                        onClose={() => setSelectedIndex(null)}
                        returnFocusTo={opener}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
