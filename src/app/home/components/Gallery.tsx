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

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-24 relative z-10">
                    <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                        Life at What Coffee
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
                        Moments from the Cafe
                    </h2>
                </div>

                {/* Gallery Grid - Parallax Layout */}
                <div className="relative flex flex-col md:flex-row justify-center items-center gap-12 mb-24 py-12">
                    {/* Left Image - moves up slowly */}
                    <div
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out"
                        style={{ transform: `translateY(${-scrollY * 0.5}px)` }}
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
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out"
                        style={{ transform: `translateY(${scrollY * 0.8}px)` }}
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
                        className="relative w-full md:w-72 aspect-3/4 bg-gray-100 overflow-hidden transition-transform duration-300 ease-out"
                        style={{ transform: `translateY(${-scrollY * 1.2}px)` }}
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
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                    >
                        View Full Gallery
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
