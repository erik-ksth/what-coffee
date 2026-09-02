import Image from "next/image";

const teamImages = [
    {
        src: "/images/site/people/barista-team.jpeg",
        alt: "What Coffee team smiling together behind the bar",
        className: "md:col-span-2",
        speed: -0.4,
        priority: true,
    },
    {
        src: "/images/site/people/barista-1.webp",
        alt: "Barista preparing espresso",
        className: "",
        speed: 0.3,
    },
    {
        src: "/images/site/people/barista-2.jpeg",
        alt: "Team member holding a latte",
        className: "",
        speed: -0.2,
    },
    {
        src: "/images/site/people/barista-1.webp",
        alt: "Barista steaming milk",
        className: "",
        speed: 0.3,
    },
    {
        src: "/images/site/people/barista-2.jpeg",
        alt: "Team member smiling in the cafe",
        className: "",
        speed: -0.5,
    },
];

export default function MeetTheTeam() {
    return (
        <section className="w-full bg-background px-4 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <header className="text-center mb-10 md:mb-16">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-3">
                        People Behind the Brew
                    </p>
                    <h2 className="text-2xl md:text-5xl font-semibold tracking-tight">
                        Meet the Team
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                        Friendly faces, thoughtful craft, and a whole lot of love for coffee.
                    </p>
                </header>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-6 gap-y-8 auto-rows-[380px] md:auto-rows-[500px] lg:auto-rows-[600px]">
                    {teamImages.map((img, i) => (
                        <div
                            key={img.src + i}
                            className={[
                                "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100",
                                "transition-transform duration-300 ease-out",
                                img.className,
                            ].join(" ")}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                priority={Boolean(img.priority)}
                                className="object-cover transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
