import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Features() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Top Row: Bakery + Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Bakery Text */}
                    <div className="flex flex-col justify-center">
                        <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                            Fresh Daily
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
                            Baked Every Morning
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Our pastries and baked goods are made fresh every morning using
                            traditional recipes and quality ingredients. From buttery croissants to
                            artisan breads, each item is crafted with care to complement your
                            perfect cup of coffee.
                        </p>
                        <div>
                            <Link
                                href="/menu"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                            >
                                View Bakery Menu
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Bakery Image */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
                            alt="Bakery kitchen"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Bottom Row: Latte Art Image + Coffee Beans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Latte Art Image */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80"
                            alt="Barista pouring latte art"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Coffee Beans Text */}
                    <div className="flex flex-col justify-center">
                        <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                            Single Origin
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
                            Roasted to Perfection
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            We source our beans from the finest coffee-growing regions around the
                            world and roast them in small batches to bring out their unique flavors.
                            Take home a bag of our signature blends or explore our rotating
                            selection of single-origin coffees.
                        </p>
                        <div>
                            <Link
                                href="/menu"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                            >
                                Shop Coffee Bean
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
