import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Catering & Wholesale",
    description: "Explore catering and wholesale options from What Coffee in Santa Clara.",
    openGraph: {
        title: "Catering & Wholesale | What Coffee",
        description: "Explore catering and wholesale options from What Coffee in Santa Clara.",
    },
};

export default function CateringWholesalePage() {
    return (
        <main>
            <PageHeader
                title="Catering & Wholesale"
                subtitle="Coffee for every gathering"
                image="/store2.jpeg"
            >
                <p className="max-w-lg text-lg leading-relaxed text-zinc-600">
                    Bring WhatCoffee to your next event, office, or special occasion. Browse our
                    current catering and wholesale menu below.
                </p>
            </PageHeader>

            <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
                <div className="mb-10 text-center">
                    <span className="text-sm font-medium uppercase tracking-wider text-primary">
                        Our offerings
                    </span>
                    <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
                        Catering & Wholesale Menu
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
                        Our menu image will be available here soon. Contact us to discuss a custom
                        order in the meantime.
                    </p>
                </div>

                {/* Replace this placeholder with the supplied JPEG menu image. */}
                <div className="relative flex min-h-[26.25rem] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-muted/50 p-8 shadow-sm md:min-h-[37.5rem] md:p-12">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative max-w-md text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                            WC
                        </div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                            Menu image placeholder
                        </p>
                        <p className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
                            Catering & Wholesale Menu
                        </p>
                        <p className="mt-3 text-zinc-600">
                            This area will display the menu once it is ready.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
