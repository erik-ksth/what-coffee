import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Catering() {
    return (
        <section className="relative w-full bg-foreground text-background py-32 px-4 overflow-hidden">
            {/* Background Texture/Gradient for subtle depth */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Text Content - Spans 7 cols */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                        <span className="w-12 h-[1px] bg-primary"></span>
                        Events & Service
                    </div>

                    <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
                        WE BRING THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            BREW TO YOU.
                        </span>
                    </h2>

                    <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                        Elevate your next event with our signature coffee experience.
                        From corporate gatherings to intimate celebrations, we deliver
                        more than just caffeine—we deliver a vibe.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 bg-white text-foreground px-8 py-5 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            Book Catering
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Image Composition - Spans 5 cols */}
                <div className="lg:col-span-5 relative h-[600px] w-full">
                    {/* Main Image */}
                    <div className="absolute inset-0 z-10 overflow-hidden bg-zinc-800 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                        <Image
                            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&q=80"
                            alt="Catering Setup"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Decorative Border Offset */}
                    <div className="absolute top-4 -right-4 w-full h-full border-2 border-primary/30 z-0 hidden md:block"></div>
                </div>
            </div>
        </section>
    );
}
