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

const mobileItems = [
    {
        label: "menu",
        href: "/menu",
        ariaLabel: "Menu",
        background: "#f6ec58",
        color: "#2a1710",
        hoverStyles: { bgColor: "#fff7a6", textColor: "#2a1710" },
    },
    {
        label: "catering",
        href: "/catering-wholesale",
        ariaLabel: "Catering and wholesale",
        background: "#f46735",
        color: "#2a1710",
        hoverStyles: { bgColor: "#ff8254", textColor: "#2a1710" },
    },
    {
        label: "about",
        href: "/about",
        ariaLabel: "About What Coffee",
        background: "#ffffff",
        color: "#2a1710",
        hoverStyles: { bgColor: "#f4efff", textColor: "#2a1710" },
    },
    {
        label: "gallery",
        href: "/gallery",
        ariaLabel: "Gallery",
        background: "#f6ec58",
        color: "#2a1710",
        hoverStyles: { bgColor: "#fff7a6", textColor: "#2a1710" },
    },
    {
        label: "contact",
        href: "/contact",
        ariaLabel: "Contact What Coffee",
        background: "#2a1710",
        color: "#ffffff",
        hoverStyles: { bgColor: "#49271d", textColor: "#ffffff" },
    },
];

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
                    <Image src="/whatcoffee_logo.png" alt="" width={48} height={28} priority />
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
                logo={<Image src="/whatcoffee_logo.png" alt="" width={40} height={23} priority />}
                items={mobileItems}
                menuAriaLabel="Open navigation"
                menuBg="#ffffff"
                menuContentColor="#2a1710"
                useFixedPosition
                animationEase="power4.out"
                animationDuration={0.46}
                staggerDelay={0.07}
            />
        </header>
    );
}
