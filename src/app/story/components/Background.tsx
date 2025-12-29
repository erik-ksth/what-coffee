import Image from "next/image";

export default function Background() {
  return (
    <section className="relative w-full bg-background px-4 md:px-8 lg:px-16 py-12 md:py-20">
      <div className="container mx-auto">
        <div className="relative">
          {/* Image cluster */}
          {/* <div className="relative h-[240px] md:h-[320px] lg:h-[380px]"> */}
          <div className="relative h-[280px] md:h-[380px] lg:h-[460px]">
            {/* Large top image */}
            <div className="absolute inset-x-0 md:inset-x-24 lg:inset-x-52 top-0 h-full bg-zinc-100 overflow-hidden rounded-xl md:rounded-2xl lg:rounded-2xl">
              <Image
                src="/menu_bg.jpg"
                alt="Cafe interior"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Smaller overlapping image */}
            <div
              className="rounded-xl md:rounded-2xl lg:rounded-2xl
                hidden md:block
                absolute left-10 md:left-20 lg:left-40
                -bottom-20 md:-bottom-24 lg:-bottom-32
                w-[260px] md:w-[300px] lg:w-[400px]
                aspect-square bg-zinc-100 overflow-hidden 
              "
            >
              <Image
                src="/square.jpeg"
                alt="Coffee details"
                fill
                className="object-cover"
              />
            </div>
          </div>


          {/* Text block BELOW the images (no overlap with large image) */}
          {/* <div className="relative max-w-3xl ml-[650px] mt-10 md:mt-14 lg:mt-20 z-10 bg-background"> */}
          <div
            className="
            relative z-10 bg-background
            mt-10 md:mt-14 lg:mt-20
            max-w-3xl mx-right
            text-center md:text-left
            lg:max-w-xl lg:ml-auto
          ">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-5xl font-bold mb-4">
                Our Background
              </h2>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                whatcoffee began with a dream and a young woman.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                She arrived in the United States as a teenager with her family, who opened a small coffee
                roastery and bakery. From a young age, she immersed herself in the art of coffee roasting and
                baking, finding joy in every detail — from the satisfying crack of roasting beans to the smiles
                on customers’ faces.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                For her, coffee became more than just a drink; it was a way to connect, build community, and
                share warmth.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Driven by this passion, she decided to open whatcoffee Roastery and Bakery — a place that offers
                great coffee, pastries, and healthy dishes, and a place that embodies her love for community,
                freshness, and creativity.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>);
}

