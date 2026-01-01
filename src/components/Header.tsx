"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = ["Home", "Menu", "About", "Gallery", "Contact"];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent shadow-none py-6"
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="mr-8 z-50 relative block">
                        <Image
                            src="/logo_orange.png"
                            alt="Cafe Logo"
                            width={isScrolled ? 50 : 70}
                            height={isScrolled ? 50 : 70}
                            className="hover:opacity-90 transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-x-8">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === "Home"
                                                ? "/"
                                                : item === "About"
                                                    ? "/about"
                                                    : `/${item.toLowerCase()}`
                                        }
                                        className="text-sm uppercase tracking-[0.15em] font-bold text-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors z-50 relative"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <nav>
                    <ul className="flex flex-col items-center gap-y-8">
                        {navItems.map((item) => (
                            <li key={item}>
                                <Link
                                    href={
                                        item === "Home"
                                            ? "/"
                                            : item === "About"
                                                ? "/story"
                                                : `/${item.toLowerCase()}`
                                    }
                                    className="text-2xl uppercase tracking-[0.15em] font-bold text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
