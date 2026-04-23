"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
    <section className="relative w-full bg-background px-4 md:px-8 lg:px-16 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Image Column - Spans 7 columns on large screens */}
          <div className="lg:col-span-7 relative order-1">
            <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/3] w-full">
              {/* Subtle background accent */}
              <div className="absolute -inset-4 md:-inset-8 bg-zinc-50 rounded-[2rem] lg:rounded-[3rem] -z-10 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
              
              <button
                type="button"
                aria-label="Open cafe photo"
                className="group relative h-full w-full overflow-hidden rounded-2xl lg:rounded-[2.5rem] bg-zinc-100 cursor-zoom-in focus:outline-none shadow-sm"
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src="/cafe_front.jpeg"
                  alt="Cafe interior"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500" />
              </button>
            </div>
          </div>

          {/* Text Column - Spans 5 columns, slightly offset/overlapping on large screens */}
          <div className="lg:col-span-5 lg:pl-16 xl:pl-24 order-2 relative">
            <div className="flex flex-col">
              
              <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-primary uppercase mb-4">
                Our Narrative
              </p>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-zinc-900 leading-[1.1]">
                Where craft <br />
                meets <span className="text-primary italic">connection.</span>
              </h2>

              <div className="space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                <p>
                  We believe the perfect cup of coffee is only half the story. The other half is the space 
                  it creates for conversations to spark and ideas to brew.
                </p>
                <p>
                  Our mission is to cultivate a sanctuary where quality is never compromised, and 
                  every guest is treated like a local from their very first visit.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm" />
          
          <div
            className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/10] animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/cafe_front.jpeg"
              alt="Cafe interior enlarged"
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
              priority
            />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close image"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
