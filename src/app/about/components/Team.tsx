"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const teamImages = [
  {
    src: "/barista_team.jpeg",
    alt: "What Coffee team smiling together behind the bar",
    className: "md:col-span-2",
    speed: -0.4,
    priority: true,
  },
  {
    src: "/barista_1.jpg",
    alt: "Barista preparing espresso",
    className: "",
    speed: 0.3,
  },
  {
    src: "/barista_2.jpeg",
    alt: "Team member holding a latte",
    className: "",
    speed: -0.2,
  },
  {
    src: "/barista_1.jpg",
    alt: "Barista steaming milk",
    className: "",
    speed: 0.3,
  },
  {
    src: "/barista_2.jpeg",
    alt: "Team member smiling in the cafe",
    className: "",
    speed: -0.5,
  },
];

export default function MeetTheTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 768) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.top > -rect.height) {
        setScrollY((windowHeight - rect.top) * 0.08);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-3">
            People Behind the Brew
          </p>
          <h2 className="text-2xl md:text-5xl font-semibold tracking-tight">
            Meet the Team
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Friendly faces, thoughtful craft, and a whole lot of love for coffee.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-25 auto-rows-[380px] md:auto-rows-[500px] lg:auto-rows-[600px]">

          {teamImages.map((img, i) => (
            <div
              key={img.src + i}
              className={[
                "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm",
                "transition-transform duration-300 ease-out",
                img.className,
              ].join(" ")}
              style={{
                transform:
                  !isMobile && img.speed
                    ? `translateY(${scrollY * img.speed}px)`
                    : "none",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={Boolean(img.priority)}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Optional overlay for a premium feel */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
