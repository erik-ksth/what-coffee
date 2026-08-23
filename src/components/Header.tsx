"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import BubbleMenu from "@/components/react-bits/BubbleMenu";
import styles from "./Header.module.css";

const orderUrl = "https://www.clover.com/online-ordering/whatcoffee-santa-clara";

const navItems = [
    { label: "Menu", href: "/menu" },
    { label: "Catering", href: "/catering-wholesale" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

const mobileMenuBackground = "oklch(62.779% 0.15774 42.873)";
const mobileMenuText = "var(--background)";

const mobileItems = [
    {
        label: "menu",
        href: "/menu",
        ariaLabel: "Menu",
    },
    {
        label: "catering",
        href: "/catering-wholesale",
        ariaLabel: "Catering and wholesale",
    },
    {
        label: "about",
        href: "/about",
        ariaLabel: "About What Coffee",
    },
    {
        label: "gallery",
        href: "/gallery",
        ariaLabel: "Gallery",
    },
    {
        label: "contact",
        href: "/contact",
        ariaLabel: "Contact What Coffee",
    },
].map((item) => ({
    ...item,
    background: mobileMenuBackground,
    color: mobileMenuText,
    hoverStyles: { bgColor: mobileMenuBackground, textColor: mobileMenuText },
}));

export default function Header() {
    const desktopNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frameId = 0;

        const updateHeader = () => {
            const nav = desktopNavRef.current;
            if (!nav) return;

            nav.dataset.scrolled = window.scrollY > 28 ? "true" : "false";
        };

        const onScroll = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(updateHeader);
        };

        updateHeader();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div ref={desktopNavRef} className={styles.desktopPill} data-scrolled="false">
                <Link href="/" className={styles.logo} aria-label="What Coffee home">
                    <Image
                        src="/images/brand/logo-mark.png"
                        alt=""
                        width={48}
                        height={28}
                        priority
                    />
                </Link>

                <nav aria-label="Primary navigation">
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.orderLink}
                >
                    Order online
                </a>
            </div>

            <BubbleMenu
                logo={
                    <Image
                        src="/images/brand/logo-mark.png"
                        alt=""
                        width={40}
                        height={23}
                        priority
                    />
                }
                items={mobileItems}
                menuAriaLabel="Open navigation"
                menuBg="#ffffff"
                menuContentColor="#2a1710"
                useFixedPosition
                animationEase="power4.out"
                animationDuration={0.5}
                staggerDelay={0.12}
            />
        </header>
    );
}
