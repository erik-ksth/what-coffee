import Image from "next/image";

export default function Back() {
  return (
    <section className="relative w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="relative">
          {/* Image cluster */}
          <div className="relative h-[230px] md:h-[320px] lg:h-[360px]">
            {/* Large top image */}
            {/* <div className="absolute inset-x-4 md:inset-x-8 lg:inset-x-16 top-0 h-full rounded-3xl border-2 border-purple-500 bg-zinc-100 overflow-hidden"> */}
            <div className="absolute inset-x-4 md:inset-x-8 lg:inset-x-16 top-0 h-full border-2 border-purple-500 bg-zinc-100 overflow-hidden">
              <Image
                src="/mural.jpeg"          // change if needed
                alt="Cafe interior"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Smaller overlapping image */}
            <div className="absolute left-4 md:left-8 lg:left-16 -bottom-12 md:-bottom-16 w-[220px] md:w-[260px] lg:w-[300px] aspect-square border border-zinc-300 bg-zinc-100 overflow-hidden">
              <Image
                src="/mural.jpeg"          // or another image, e.g. "/beans.jpg"
                alt="Coffee details"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text block overlapping bottom-right of the large image */}
          <div className="relative max-w-xl ml-auto -mt-6 md:-mt-10 lg:-mt-12 z-10 bg-background/90 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4">
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
    </section>
  );
}
