import Image from "next/image";

export default function About() {
     return (
          <section className="relative w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
               <div className="container mx-auto max-w-6xl grid lg:grid-cols-[3fr_2.5fr] gap-10 md:gap-14 items-center">
                    {/* Text Content */}
                    <div className="flex flex-col gap-5 md:gap-7 text-center lg:text-left items-center lg:items-start max-w-2xl">
                         {/* Eyebrow (matches your other sections like Gallery/Team) */}
                         <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase">
                              Our Story
                         </p>

                         <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                              A Dream Brewed to Life
                         </h2>

                         {/* Body copy (consistent sizing + spacing) */}
                         <div className="space-y-4 md:space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                              <p>whatcoffee began with a dream and a young woman.</p>

                              <p>
                                   She arrived in the United States as a teenager with her family, who opened a small coffee roastery
                                   and bakery. From a young age, she immersed herself in the art of coffee roasting and baking,
                                   finding joy in every detail — from the satisfying crack of roasting beans to the smiles on
                                   customers’ faces.
                              </p>

                              <p>
                                   For her, coffee became more than just a drink; it was a way to connect, build community, and share
                                   warmth.
                              </p>

                              <p>
                                   Driven by this passion, she decided to open whatcoffee Roastery and Bakery — a place that offers
                                   great coffee, pastries, and healthy dishes, and a place that embodies her love for community,
                                   freshness, and creativity.
                              </p>

                              <p>
                                   Join us at whatcoffee, where our founder’s journey becomes your experience, and every visit feels
                                   like coming home.
                              </p>
                         </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full aspect-[3101/3741] overflow-hidden rounded-2xl bg-zinc-100">
                         <Image
                              src="/mural.jpeg"
                              alt="Mural"
                              fill
                              className="object-cover scale-[1.05]"
                              priority
                              sizes="(max-width: 1024px) 100vw, 40vw"
                         />
                    </div>
               </div>
          </section>
     );
}
