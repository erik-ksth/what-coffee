"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingOrderButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32); // Default to matching bottom-8

  useEffect(() => {
    const handleScroll = () => {
      // Visibility Check
      if (window.scrollY > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Footer Overlap Check
      const footer = document.getElementById("main-footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the footer is visible
        const distanceToTop = footerRect.top;

        // If footer is entering or inside the viewport
        if (distanceToTop < windowHeight) {
          // We want the button to stay above the footer with some padding (e.g., 24px)
          // standard position is 80px from bottom.
          // If footer is at windowHeight (just touching bottom), valid space is windowHeight.
          // We want button bottom at: windowHeight - distanceToTop + padding.

          const overlap = windowHeight - distanceToTop;
          // Only adjust if overlap would push it higher than the default 32px
          const newBottom = Math.max(32, overlap + 24);
          setBottomOffset(newBottom);
        } else {
          setBottomOffset(32);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ bottom: `${isVisible ? bottomOffset : 32}px` }}
      className={`fixed right-6 z-50 transition-all duration-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
    >
      <Link
        href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
        className="group flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-white shadow-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="font-bold uppercase tracking-wide text-sm whitespace-nowrap">
          Order Online
        </span>
        <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
      </Link>
    </div>
  );
}
