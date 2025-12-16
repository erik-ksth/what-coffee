"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MenuItemCard from "@/app/menu/components/MenuItemCard";
import type { MenuItem } from "@/app/menu/menu-data";

const topHits: MenuItem[] = [
     {
          name: "Coconut Coffee",
          description: "Creamy iced latte made with toasted coconut milk and rich espresso.",
          image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
     },
     {
          name: "Tiramisu",
          description: "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone.",
          image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d4?w=600&q=80",
     },
     {
          name: "Matcha",
          description: "Premium Japanese matcha whisked with your choice of milk, served over ice.",
          image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80",
     },
];

export default function TopHits() {
     return (
          <section className="py-12 md:py-20 px-4">
               <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-16">
                         <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2 md:mb-3">
                              Best Sellers
                         </p>
                         <h2 className="text-3xl md:text-6xl font-bold text-foreground tracking-tighter">
                              Our Top Hits
                         </h2>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
                         {topHits.map((item, index) => (
                              <MenuItemCard key={index} item={item} />
                         ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                         <Link
                              href="/menu"
                              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors rounded-full"
                         >
                              Explore Full Menu
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </Link>
                    </div>
               </div>
          </section>
     );
}
