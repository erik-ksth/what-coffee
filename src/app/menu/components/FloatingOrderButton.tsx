"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingOrderButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("main-footer");
      let footerVisible = false;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          footerVisible = true;
        }
      }

      // Show if scrolled enough AND footer is NOT visible
      if (window.scrollY > 700 && !footerVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-6 z-50 transition-all duration-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
    >
      <Link
        href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
        className="group flex items-center gap-3 rounded-full bg-primary p-4 md:px-6 md:py-3 text-white shadow-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="hidden md:block font-bold uppercase tracking-wide text-sm whitespace-nowrap">
          Order Online
        </span>
        <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
      </Link>
    </div>
  );
}
