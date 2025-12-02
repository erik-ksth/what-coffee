"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
     name: string;
     rating: number;
     text: string;
     source: string;
}

const testimonials: Testimonial[] = [
     {
          name: "Sarah M.",
          rating: 5,
          text: "The best coffee shop in town! Their coconut coffee is absolutely divine, and the atmosphere is so cozy. I come here every morning before work.",
          source: "Google",
     },
     {
          name: "James L.",
          rating: 5,
          text: "Amazing matcha lattes and the pastries are always fresh. The staff is incredibly friendly and remembers my order. Highly recommend!",
          source: "Yelp",
     },
     {
          name: "Emily R.",
          rating: 5,
          text: "We had What Coffee cater our company event and it was a huge hit. Professional service and delicious drinks. Will definitely use them again!",
          source: "Google",
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
          if (diff === 0) {
               return "z-20 scale-100 opacity-100";
          } else if (diff === -1 || (currentIndex === 0 && index === testimonials.length - 1)) {
               return "z-10 -translate-x-1/2 scale-90 opacity-60";
          } else if (diff === 1 || (currentIndex === testimonials.length - 1 && index === 0)) {
               return "z-10 translate-x-1/2 scale-90 opacity-60";
          }
          return "opacity-0";
     };

     return (
          <section className="py-20 px-4 bg-gray-100">
               <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                              What our customers say
                         </p>
                         <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
                              Testimonials
                         </h2>
                    </div>

                    {/* Carousel */}
                    <div className="relative flex items-center justify-center h-80">
                         {/* Navigation Buttons */}
                         <button
                              onClick={goToPrev}
                              className="absolute left-0 z-30 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                              aria-label="Previous testimonial"
                         >
                              <ChevronLeft className="w-8 h-8" />
                         </button>

                         {/* Cards */}
                         <div className="relative w-full max-w-lg h-full flex items-center justify-center">
                              {testimonials.map((testimonial, index) => (
                                   <div
                                        key={index}
                                        className={`absolute w-full bg-white p-8 shadow-lg transition-all duration-300 ${getCardStyle(index)}`}
                                   >
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4 justify-center">
                                             {[...Array(testimonial.rating)].map((_, i) => (
                                                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                             ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="text-gray-600 text-center mb-6 leading-relaxed">
                                             &ldquo;{testimonial.text}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="text-center">
                                             <p className="font-medium text-gray-900">{testimonial.name}</p>
                                             <p className="text-sm text-gray-500">{testimonial.source}</p>
                                        </div>
                                   </div>
                              ))}
                         </div>

                         <button
                              onClick={goToNext}
                              className="absolute right-0 z-30 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                              aria-label="Next testimonial"
                         >
                              <ChevronRight className="w-8 h-8" />
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
