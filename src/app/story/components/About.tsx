import Image from "next/image";

export default function About() {
     return (
          <section className="relative w-full min-h-[70svh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-background px-4 md:px-8 lg:px-16 pt-16 md:pt-14 pb-6 md:pb-0">

               {/* 3:2 ratio grid */}
               <div className="container mx-auto grid lg:grid-cols-[3fr_2.5fr] gap-8 md:gap-12 items-center">

                    {/* Text Content */}
                    <div className="flex flex-col gap-4 md:gap-6 z-10 text-center lg:text-left items-center lg:items-start justify-center h-full max-w-2xl">
                         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                              A Dream Brewed to Life
                         </h2>

                         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              whatcoffee began with a dream and a young woman.
                         </p>

                         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              She arrived in the United States as a teenager with her family, who opened a small coffee roastery and bakery.
                              From a young age, she immersed herself in the art of coffee roasting and baking, finding joy in every detail —
                              from the satisfying crack of roasting beans to the smiles on customers’ faces.
                         </p>

                         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              For her, coffee became more than just a drink; it was a way to connect, build community, and share warmth.
                         </p>

                         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              Driven by this passion, she decided to open whatcoffee Roastery and Bakery — a place that offers great coffee,
                              pastries, and healthy dishes, and a place that embodies her love for community, freshness, and creativity.
                         </p>

                         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              Join us at whatcoffee, where our founder’s journey becomes your experience, and every visit feels like coming home.
                         </p>
                    </div>

                    {/* Hero Image */}
                    {/* 
                        Using aspect-ratio on the container and 'fill' on the image guarantees 
                        the image covers the full rounded area without gaps.
                    */}
                    <div className="relative w-full aspect-[3101/3741] overflow-hidden rounded-2xl">
                         <Image
                              src="/mural.jpeg"
                              alt="Mural"
                              fill
                              className="object-cover scale-[1.05]"
                              priority
                         />
                    </div>

               </div>
          </section>
     );
}
