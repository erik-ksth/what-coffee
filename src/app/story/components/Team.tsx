import Image from "next/image";

export default function MeetTheTeam() {
  return (
    <section className="w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-20">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Meet the Team
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[260px] md:auto-rows-[300px] lg:auto-rows-[360px]">
          {/* Large top-left image (spans 2 columns on md+) */}
          <div className="relative md:col-span-2 rounded-2xl border-2 border-purple-500 bg-zinc-100 overflow-hidden">
            <Image
              src="/team-hero.jpg" // replace with your image
              alt="Team at whatcoffee"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Tall top-right image (spans 2 rows on md+) */}
          <div className="relative md:row-span-1 rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/team-1.jpg" // replace with your image
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom three portraits */}
          <div className="relative rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/team-2.jpg"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/team-3.jpg"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/team-4.jpg"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
