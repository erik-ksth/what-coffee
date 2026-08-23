"use client";

import { usePathname } from "next/navigation";

import styles from "./LeafShade.module.css";

export default function LeafShade() {
    const pathname = usePathname();

    return (
        <div
            className={`${styles.shade} ${pathname === "/" ? styles.staticShade : ""}`}
            aria-hidden="true"
        />
    );
}
