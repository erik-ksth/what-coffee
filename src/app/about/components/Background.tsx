"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Background() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <section className="relative w-full bg-background px-4 md:px-8 lg:px-16 pt-12 md:pt-20 pb-0">
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          {/* Image cluster */}
          <div className="relative h-[280px] md:h-[380px] lg:h-[460px]">
            {/* Large image (click to open) */}
            <button
              type="button"
              aria-label="Open cafe photo"
              className="absolute inset-x-0 md:inset-x-12 lg:inset-x-24 top-0 h-full overflow-hidden rounded-2xl bg-zinc-100 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary/40"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src="/cafe_front.jpeg"
                alt="Cafe interior"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 55vw"
              />
            </button>

            {/* Overlapping square (desktop only) */}
            <div
              className="
                hidden md:block
                absolute left-2 md:left-6 lg:left-12
                -bottom-20 md:-bottom-24 lg:-bottom-32
                w-[260px] md:w-[300px] lg:w-[400px]
                aspect-square overflow-hidden rounded-2xl bg-zinc-100
                shadow-sm
                transition-transform duration-500 ease-out
                hover:rotate-3
              "
            >
              <Image
                src="/square.jpeg"
                alt="Coffee details"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 300px, 400px"
              />
            </div>
          </div>

          {/* Reserve vertical space so the overlap never collides with text */}
          <div className="hidden md:block h-20 md:h-24 lg:h-32" />

          {/* Text block (improved + consistent with other sections) */}
          <div className="mt-10 md:mt-14 lg:mt-0 max-w-3xl lg:max-w-xl lg:ml-auto text-center lg:text-left">
            <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-3">
              Our Mission
            </p>

            <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4">
              More Than Coffee
            </h2>

            <div className="space-y-4 md:space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                whatcoffee began with a simple idea: create a place where great coffee brings people together.
              </p>

              <p>
                From early mornings to slow afternoons, we’re here for the everyday moments — the conversations,
                the quiet focus, and the small rituals that make a day feel better.
              </p>

              <p>
                We craft each cup with care, pair it with fresh pastries and wholesome dishes, and welcome you
                into a space designed to feel warm, creative, and community-driven.
              </p>

              <p>
                Come as you are. Stay a while. Leave a little more inspired than when you arrived.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Cafe photo preview"
        >
          <div
            className="relative w-full max-w-5xl aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/cafe_front.jpeg"
              alt="Cafe interior enlarged"
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              priority
            />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70 transition"
              aria-label="Close image"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
