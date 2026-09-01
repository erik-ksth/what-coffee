"use client";

import { motion, useReducedMotion } from "motion/react";

import type { MenuCategory } from "../menu-data";
import styles from "./MenuTabs.module.css";

interface MenuTabsProps {
    filters: Array<"All" | MenuCategory>;
    selected: "All" | MenuCategory;
    onChange: (value: "All" | MenuCategory) => void;
}

export default function MenuTabs({ filters, selected, onChange }: MenuTabsProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className={styles.tabs} role="group" aria-label="Filter menu items">
            {filters.map((category) => {
                const isActive = category === selected;
                return (
                    <button
                        key={category}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(category)}
                        className={isActive ? styles.active : undefined}
                    >
                        <span>{category}</span>
                        {isActive && (
                            <motion.span
                                layoutId="menu-tab-indicator"
                                className={styles.indicator}
                                aria-hidden="true"
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.24,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
