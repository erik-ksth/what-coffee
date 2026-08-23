"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./FloatingOrderButton.module.css";

export default function FloatingOrderButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById("main-footer");
            let footerVisible = false;

            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) {
                    footerVisible = true;
                }
            }

            // Show if scrolled enough AND footer is NOT visible
            if (window.scrollY > 700 && !footerVisible) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${styles.wrap} ${isVisible ? styles.visible : styles.hidden}`}>
            <Link
                href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
                className={styles.link}
            >
                <span>Order online</span>
                <ShoppingBag aria-hidden="true" size={18} />
            </Link>
        </div>
    );
}
