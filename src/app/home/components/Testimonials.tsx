"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
    name: string;
    rating: number;
    text: string;
    source: string;
    link?: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Dr Nada",
        rating: 5,
        text: "I really loved this café! The atmosphere was super cozy and welcoming. Noor was absolutely wonderful , and she was so friendly and helpful the whole time. The coffee was great, the prices were very reasonable, and the whole place had such a nice vibe. Definitely coming back soon! ☕💛",
        source: "Google",
        link: "https://maps.app.goo.gl/HqtJzii5hiBNEDH88",
    },
    {
        name: "Doug Bourne",
        rating: 5,
        text: "Nice place.  Pistachio croissant is on the savory side, but quite good that way.  Cappuccino is dark and rich.  Cup is super fun looking.  Friendly staff.  Plain donut was fine - I'd prefer the dough a little more sweet, but probably just a preference thing. Definitely worth a try.",
        source: "Google",
        link: "https://maps.app.goo.gl/x6h4e1kGkwwTwrWB8",
    },
    {
        name: "F Lee",
        rating: 5,
        text: "The pastry is soo good. Tried their pistachio croissant, the taste is so rich and not too sweet!  They have cute outdoor tables as well, but would suggest setting up parasol.  Worth giving this cafe a try! I definitely will come back.",
        source: "Google",
        link: "https://maps.app.goo.gl/YYXDLtkZySyF21vn8",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const getCardStyle = (index: number) => {
        const diff = index - currentIndex;
        // Active card
        if (diff === 0) {
            return "z-20 scale-100 opacity-100 relative";
        }

        // Previous/Next cards (desktop only)
        if (diff === -1 || (currentIndex === 0 && index === testimonials.length - 1)) {
            return "z-10 -translate-x-1/2 scale-90 opacity-60 hidden md:block absolute top-0";
        }
        if (diff === 1 || (currentIndex === testimonials.length - 1 && index === 0)) {
            return "z-10 translate-x-1/2 scale-90 opacity-60 hidden md:block absolute top-0";
        }

        return "opacity-0 hidden absolute top-0";
    };

    return (
        <section className="py-12 md:py-20 px-4 bg-muted">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
                        What our customers say
                    </p>
                    <h2 className="text-3xl md:text-6xl font-bold text-foreground tracking-tighter">
                        Testimonials
                    </h2>
                </div>

                {/* Carousel */}
                <div className="relative flex items-center justify-center h-auto md:h-[420px]">
                    {/* Navigation Buttons */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 z-30 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/50 rounded-full md:bg-transparent"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Cards */}
                    <div className="relative w-full max-w-lg min-h-[300px] md:h-full flex items-center justify-center">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`w-full h-full bg-white p-6 md:p-10 shadow-lg transition-all duration-300 ${getCardStyle(index)} cursor-pointer flex flex-col justify-between rounded-3xl`}
                                onClick={() => window.open(testimonial.link, "_blank")}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-4 justify-center">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-600 text-center mb-6 leading-relaxed text-sm md:text-base">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="text-center">
                                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                                    <p className="text-xs md:text-sm text-gray-500">{testimonial.source}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 z-30 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/50 rounded-full md:bg-transparent"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-gray-900" : "bg-gray-300"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
