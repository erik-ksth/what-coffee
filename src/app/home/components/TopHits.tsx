"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TopHitItem {
     name: string;
     image: string;
}

const topHits: TopHitItem[] = [
     {
          name: "Coconut Coffee",
          image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
     },
     {
          name: "Tiramisu",
          image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d4?w=600&q=80",
     },
     {
          name: "Matcha",
          image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80",
     },
];

export default function TopHits() {
     return (
          <section className="py-20 px-4 bg-white">
               <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                              Best sellers at What Coffee
                         </p>
                         <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
                              Our Top Hits
                         </h2>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                         {topHits.map((item, index) => (
                              <div key={index} className="group">
                                   <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                        <Image
                                             src={item.image}
                                             alt={item.name}
                                             fill
                                             className="object-cover transition-transform duration-500 group-hover:scale-105"
                                             sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                   </div>
                                   <h3 className="text-xl md:text-2xl font-serif text-gray-900 text-center mt-4">
                                        {item.name}
                                   </h3>
                              </div>
                         ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                         <Link
                              href="/menu"
                              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                         >
                              Explore Full Menu
                              <ArrowRight className="w-5 h-5" />
                         </Link>
                    </div>
               </div>
          </section>
     );
}
