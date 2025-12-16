"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80",
        alt: "Friends gathering at the cafe",
    },
    {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        alt: "Barista making pour over coffee",
    },
    {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
        alt: "Cafe outdoor patio",
    },
];

export default function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleScroll = () => {
            if (sectionRef.current && window.innerWidth >= 768) {
                const rect = sectionRef.current.getBoundingClientRect();
                const sectionTop = rect.top;
                const windowHeight = window.innerHeight;

                if (sectionTop < windowHeight && sectionTop > -rect.height) {
                    setScrollY((windowHeight - sectionTop) * 0.1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-32 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-24 relative z-10">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-3">
                        Life at What Coffee
                    </p>
                    <h2 className="text-3xl md:text-6xl font-bold text-foreground tracking-tighter">
                        Moments from the Cafe
                    </h2>
                </div>

                {/* Gallery Grid - Parallax Layout */}
                <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-12 md:mb-24 py-0 md:py-12">
                    {/* Left Image - moves up slowly */}
                    <div
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out rounded-2xl"
                        style={{ transform: !isMobile ? `translateY(${-scrollY * 0.5}px)` : 'none' }}
                    >
                        <Image
                            src={galleryImages[0].src}
                            alt={galleryImages[0].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 288px"
                        />
                    </div>

                    {/* Center Image - moves down */}
                    <div
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out rounded-2xl"
                        style={{ transform: !isMobile ? `translateY(${scrollY * 0.8}px)` : 'none' }}
                    >
                        <Image
                            src={galleryImages[1].src}
                            alt={galleryImages[1].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 288px"
                        />
                    </div>

                    {/* Right Image - moves up faster */}
                    <div
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out rounded-2xl"
                        style={{ transform: !isMobile ? `translateY(${-scrollY * 1.2}px)` : 'none' }}
                    >
                        <Image
                            src={galleryImages[2].src}
                            alt={galleryImages[2].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 288px"
                        />
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center relative z-10">
                    <Link
                        href="/gallery"
                        className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors rounded-full"
                    >
                        View Full Gallery
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
