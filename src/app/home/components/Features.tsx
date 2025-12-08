import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Features() {
    return (
        <section className="py-32 px-4 bg-background relative overflow-hidden">
            {/* Decorative background text */}
            <div className="absolute top-20 left-0 text-[20vw] font-bold text-zinc-100 pointer-events-none select-none tracking-tighter opacity-40">
                COFFEE
            </div>

            <div className="max-w-[1200px] mx-auto flex flex-col gap-32 relative z-10">

                {/* Feature 1: Bakery */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="flex flex-col items-start gap-8 order-2 lg:order-1">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-[2px] bg-primary"></div>
                            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase">Daily Rituals</p>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
                            Baked<br />
                            <span className="text-primary italic">Every</span><br />
                            Morning
                        </h2>
                        <p className="text-xl text-zinc-600 leading-relaxed max-w-md font-light">
                            Before the sun rises, our bakers are already at work.
                            We believe in the old-world tradition of daily baking,
                            ensuring every croissant flakes perfectly on your plate.
                        </p>
                        <Link
                            href="/menu"
                            className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 mt-4 rounded-full"
                        >
                            View Bakery Menu
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-zinc-100 w-full overflow-hidden order-1 lg:order-2 group rounded-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
                            alt="Freshly baked croissants"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>

                {/* Feature 2: Coffee */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-zinc-100 w-full overflow-hidden group rounded-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                            alt="Pour over coffee being made"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    {/* Text Content */}
                    <div className="flex flex-col items-start gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-[2px] bg-primary"></div>
                            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase">Our Craft</p>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
                            Roasted<br />
                            to<br />
                            <span className="text-primary italic">Perfection</span>
                        </h2>
                        <p className="text-xl text-zinc-600 leading-relaxed max-w-md font-light">
                            Sourced from sustainable farms in Ethiopia and Colombia.
                            Every batch is roasted weekly to highlight the unique
                            flavor profiles of each bean origin.
                        </p>
                        <Link
                            href="/menu"
                            className="group inline-flex items-center gap-3 border-2 border-foreground text-foreground px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 mt-4 rounded-full"
                        >
                            Shop Coffee Beans
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
