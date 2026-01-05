"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
     {
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop",
          alt: "Coffee shop interior",
     },
     {
          image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1920&auto=format&fit=crop",
          alt: "Pouring coffee",
     },
     {
          image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1920&auto=format&fit=crop",
          alt: "Latte art",
     },
];

export default function Hero() {
     const [currentSlide, setCurrentSlide] = useState(0);

     useEffect(() => {
          const timer = setInterval(() => {
               setCurrentSlide((prev) => (prev + 1) % slides.length);
          }, 5000);
          return () => clearInterval(timer);
     }, []);

     return (
          <section className="relative w-full min-h-screen flex flex-col pt-20 overflow-hidden">
               {/* Running Banner */}
               <div className="w-full bg-foreground text-background py-2 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap flex">
                         {[...Array(2)].map((_, i) => (
                              <div key={i} className="flex items-center gap-8 mx-4">
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Fresh Roasted Daily</span>
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Artisan Coffee</span>
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Premium Beans</span>
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Handcrafted with Love</span>
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Locally Sourced</span>
                                   <span className="text-sm font-medium tracking-widest uppercase">★ Organic Options</span>
                              </div>
                         ))}
                    </div>
               </div>

               {/* Carousel Container */}
               <div className="relative flex-1">
                    {/* Image Carousel */}
                    {slides.map((slide, index) => (
                         <div
                              key={index}
                              className={`absolute inset-0 transition-opacity duration-3000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                                   }`}
                         >
                              <Image
                                   src={slide.image}
                                   alt={slide.alt}
                                   fill
                                   className="object-cover"
                                   priority={index === 0}
                                   sizes="100vw"
                              />
                         </div>
                    ))}

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="container mx-auto px-4 text-center text-white">
                              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                                   WHAT COFFEE
                                   <br />
                                   <span className="text-primary">&amp; BAKERY</span>
                              </h1>
                              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
                                   Experience the perfect blend of atmosphere and aroma.
                                   Where every cup tells a story of passion and precision.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                   <Link
                                        href="/menu"
                                        className="px-8 py-4 bg-primary text-white text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all rounded-full"
                                   >
                                        View Menu
                                   </Link>
                                   <Link
                                        href="/about"
                                        className="px-8 py-4 border-2 border-white text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-foreground transition-all rounded-full"
                                   >
                                        Our Story
                                   </Link>
                              </div>
                         </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                         {slides.map((_, index) => (
                              <button
                                   key={index}
                                   onClick={() => setCurrentSlide(index)}
                                   className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                        ? "bg-white w-8"
                                        : "bg-white/50"
                                        }`}
                                   aria-label={`Go to slide ${index + 1}`}
                              />
                         ))}
                    </div>
               </div>
          </section>
     );
}
