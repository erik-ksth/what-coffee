"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import "./BubbleMenu.css";

const DEFAULT_ITEMS = [
    { label: "menu", href: "/menu", ariaLabel: "Menu" },
    { label: "about", href: "/about", ariaLabel: "About" },
    { label: "contact", href: "/contact", ariaLabel: "Contact" },
];

export default function BubbleMenu({
    logo,
    onMenuClick = undefined,
    className = "",
    style = undefined,
    menuAriaLabel = "Toggle navigation",
    menuBg = "#ffffff",
    menuContentColor = "#111111",
    useFixedPosition = false,
    items,
    animationEase = "power4.out",
    animationDuration = 0.5,
    staggerDelay = 0.08,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const overlayRef = useRef(null);
    const bubblesRef = useRef([]);
    const labelRefs = useRef([]);
    const toggleRef = useRef(null);
    const menuItems = items?.length ? items : DEFAULT_ITEMS;
    const containerClassName = ["bubble-menu", useFixedPosition ? "fixed" : "absolute", className]
        .filter(Boolean)
        .join(" ");

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
        onMenuClick?.(false);
    }, [onMenuClick]);

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isMenuOpen) {
            gsap.set(overlay, { display: "flex" });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: reducedMotion ? 1 : 0, transformOrigin: "50% 50%" });
            gsap.set(labels, { y: reducedMotion ? 0 : 20, autoAlpha: reducedMotion ? 1 : 0 });

            if (!reducedMotion) {
                bubbles.forEach((bubble, index) => {
                    const timeline = gsap.timeline({ delay: index * staggerDelay });
                    timeline.to(bubble, {
                        scale: 1,
                        duration: animationDuration,
                        ease: animationEase,
                    });
                    if (labels[index]) {
                        timeline.to(
                            labels[index],
                            {
                                y: 0,
                                autoAlpha: 1,
                                duration: animationDuration,
                                ease: "power4.out",
                            },
                            `-=${animationDuration * 0.88}`
                        );
                    }
                });
            }
        } else if (showOverlay) {
            if (reducedMotion) {
                gsap.set(overlay, { display: "none" });
                window.queueMicrotask(() => setShowOverlay(false));
                return;
            }
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.to(labels, { y: 20, autoAlpha: 0, duration: 0.18, ease: "power3.in" });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.2,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(overlay, { display: "none" });
                    setShowOverlay(false);
                },
            });
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const body = document.body;
        const scrollLockClass = "bubble-menu-scroll-lock";
        body.classList.toggle(scrollLockClass, isMenuOpen);
        const pageRegions = Array.from(document.querySelectorAll("main, footer"));
        const previousInertStates = pageRegions.map((element) => ({
            element,
            inert: element.inert,
        }));
        let focusFrame = 0;

        if (isMenuOpen) {
            pageRegions.forEach((element) => {
                element.inert = true;
            });
            focusFrame = window.requestAnimationFrame(() => {
                bubblesRef.current.find(Boolean)?.focus();
            });
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                toggleRef.current?.focus();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableItems = [
                toggleRef.current,
                ...bubblesRef.current.filter(Boolean),
            ].filter((element) => !element.hasAttribute("disabled"));
            if (!focusableItems.length) return;

            const firstItem = focusableItems[0];
            const lastItem = focusableItems[focusableItems.length - 1];
            const activeElement = document.activeElement;

            if (
                event.shiftKey &&
                (activeElement === firstItem || !focusableItems.includes(activeElement))
            ) {
                event.preventDefault();
                lastItem.focus();
            } else if (
                !event.shiftKey &&
                (activeElement === lastItem || !focusableItems.includes(activeElement))
            ) {
                event.preventDefault();
                firstItem.focus();
            }
        };
        if (isMenuOpen) window.addEventListener("keydown", handleKeyDown);

        return () => {
            body.classList.remove(scrollLockClass);
            window.cancelAnimationFrame(focusFrame);
            previousInertStates.forEach(({ element, inert }) => {
                element.inert = inert;
            });
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen, closeMenu]);

    return (
        <>
            <nav className={containerClassName} style={style} aria-label="Mobile navigation">
                <Link
                    href="/"
                    className="bubble logo-bubble"
                    aria-label="What Coffee home"
                    style={{ backgroundColor: menuBg }}
                >
                    <span className="logo-content">{logo}</span>
                </Link>

                <button
                    ref={toggleRef}
                    type="button"
                    className={`bubble toggle-bubble menu-btn ${isMenuOpen ? "open" : ""}`}
                    onClick={handleToggle}
                    aria-label={isMenuOpen ? "Close navigation" : menuAriaLabel}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-bubble-menu"
                    style={{ backgroundColor: menuBg }}
                >
                    <span className="menu-line" style={{ background: menuContentColor }} />
                    <span className="menu-line short" style={{ background: menuContentColor }} />
                </button>
            </nav>

            {showOverlay && (
                <div
                    ref={overlayRef}
                    id="mobile-bubble-menu"
                    className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"}`}
                    aria-hidden={!isMenuOpen}
                >
                    <ul className="pill-list" aria-label="Menu links">
                        {menuItems.map((item, index) => (
                            <li key={item.href} className="pill-col">
                                <Link
                                    href={item.href}
                                    aria-label={item.ariaLabel || item.label}
                                    className="pill-link"
                                    onClick={closeMenu}
                                    style={{
                                        "--item-rot": `${item.rotation ?? 0}deg`,
                                        "--pill-bg": item.background || menuBg,
                                        "--pill-color": item.color || menuContentColor,
                                        "--hover-bg": item.hoverStyles?.bgColor || "#f3f4f6",
                                        "--hover-color":
                                            item.hoverStyles?.textColor || menuContentColor,
                                    }}
                                    ref={(element) => {
                                        bubblesRef.current[index] = element;
                                    }}
                                >
                                    <span
                                        className="pill-label"
                                        ref={(element) => {
                                            labelRefs.current[index] = element;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
