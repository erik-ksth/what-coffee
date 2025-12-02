"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CarouselSlide {
     src: string;
     alt: string;
}

interface HeroCarouselProps {
     slides?: CarouselSlide[];
     autoPlayInterval?: number;
}

const defaultSlides: CarouselSlide[] = [
     {
          src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80",
          alt: "Cozy cafe interior with warm lighting",
     },
     {
          src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&q=80",
          alt: "Aesthetic coffee shop with plants",
     },
     {
          src: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1920&q=80",
          alt: "Minimalist cafe with natural light",
     },
];

export default function HeroCarousel({
     slides = defaultSlides,
     autoPlayInterval = 5000,
}: HeroCarouselProps) {
     const [currentIndex, setCurrentIndex] = useState(0);
     const [direction, setDirection] = useState<"left" | "right">("right");
     const [isAnimating, setIsAnimating] = useState(false);

     const goToNext = useCallback(() => {
          if (isAnimating) return;
          setDirection("right");
          setIsAnimating(true);
          setCurrentIndex((prev) => (prev + 1) % slides.length);
     }, [slides.length, isAnimating]);

     const goToPrev = useCallback(() => {
          if (isAnimating) return;
          setDirection("left");
          setIsAnimating(true);
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
     }, [slides.length, isAnimating]);

     const goToSlide = (index: number) => {
          if (isAnimating || index === currentIndex) return;
          setDirection(index > currentIndex ? "right" : "left");
          setIsAnimating(true);
          setCurrentIndex(index);
     };

     useEffect(() => {
          const timer = setTimeout(() => setIsAnimating(false), 700);
          return () => clearTimeout(timer);
     }, [currentIndex]);

     useEffect(() => {
          const interval = setInterval(goToNext, autoPlayInterval);
          return () => clearInterval(interval);
     }, [goToNext, autoPlayInterval]);

     const getSlideStyle = (index: number) => {
          if (index === currentIndex) {
               return "translate-x-0 opacity-100";
          }
          if (direction === "right") {
               return index === (currentIndex - 1 + slides.length) % slides.length
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0";
          }
          return index === (currentIndex + 1) % slides.length
               ? "translate-x-full opacity-0"
               : "-translate-x-full opacity-0";
     };

     return (
          <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
               {/* Slides */}
               {slides.map((slide, index) => (
                    <div
                         key={index}
                         className={`absolute inset-0 transition-all duration-700 ease-in-out ${getSlideStyle(index)}`}
                    >
                         <Image
                              src={slide.src}
                              alt={slide.alt}
                              fill
                              className="object-cover"
                              priority={index === 0}
                              sizes="100vw"
                         />
                         {/* Overlay */}
                         <div className="absolute inset-0 bg-black/40" />
                    </div>
               ))}

               {/* Navigation Arrows */}
               <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3"
                    aria-label="Previous slide"
               >
                    <svg
                         className="w-6 h-6 text-white"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                         />
                    </svg>
               </button>
               <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3"
                    aria-label="Next slide"
               >
                    <svg
                         className="w-6 h-6 text-white"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                         />
                    </svg>
               </button>

               {/* Dots Indicator */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                         <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                   ? "bg-white scale-110"
                                   : "bg-white/50 hover:bg-white/75"
                                   }`}
                              aria-label={`Go to slide ${index + 1}`}
                         />
                    ))}
               </div>
          </section>
     );
}
