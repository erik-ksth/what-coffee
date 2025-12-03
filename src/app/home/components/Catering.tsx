import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Catering() {
    return (
        <section className="relative py-24 px-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
                    alt="Coffee catering setup"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/85" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
                            Catering
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Make your next event unforgettable with What Coffee catering. From
                            corporate meetings to private celebrations, we bring our signature
                            drinks and warm hospitality directly to you. Our team will work with you
                            to create a custom menu that fits your occasion, whether it is freshly
                            brewed coffee, handcrafted lattes, or our famous matcha creations.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                        >
                            Order Catering
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&q=80"
                            alt="Coffee catering service"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
