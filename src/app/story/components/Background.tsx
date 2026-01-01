"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Background() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape
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

          {/* Text block */}
          <div className="mt-10 md:mt-14 lg:mt-0 max-w-3xl lg:max-w-xl lg:ml-auto text-center lg:text-left">
            <h2 className="text-2xl md:text-5xl font-bold mb-4">Our Mission</h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              whatcoffee began with a dream and a young woman.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              She arrived in the United States as a teenager with her family, who opened a small coffee
              roastery and bakery. From a young age, she immersed herself in the art of coffee roasting and
              baking, finding joy in every detail — from the satisfying crack of roasting beans to the smiles
              on customers’ faces.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              For her, coffee became more than just a drink; it was a way to connect, build community, and
              share warmth.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Driven by this passion, she decided to open whatcoffee Roastery and Bakery — a place that offers
              great coffee, pastries, and healthy dishes, and a place that embodies her love for community,
              freshness, and creativity.
            </p>
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
