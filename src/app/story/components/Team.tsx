import Image from "next/image";

export default function MeetTheTeam() {
  return (
    <section className="w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-20">
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="text-2xl md:text-5xl font-semibold text-center mb-10">
          Meet the Team
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 auto-rows-[380px] md:auto-rows-[480px] lg:auto-rows-[580px]">
          {/* Large top-left image (spans 2 columns on md+) */}
          <div className="relative rounded-xl md:rounded-2xl lg:rounded-2xl md:col-span-2 border-2 border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/barista_team.jpeg" // replace with your image
              alt="Team at whatcoffee"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Tall top-right image (spans 2 rows on md+) */}
          <div className="relative rounded-xl md:rounded-2xl lg:rounded-2xl md:row-span-1 border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/barista_1.jpg" // replace with your image
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom three portraits */}
          <div className="relative rounded-xl md:rounded-2xl lg:rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/barista_2.jpeg"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative rounded-xl md:rounded-2xl lg:rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/barista_1.jpg"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative rounded-xl md:rounded-2xl lg:rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden">
            <Image
              src="/barista_2.jpeg"
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
