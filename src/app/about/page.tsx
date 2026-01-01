import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

import AboutUs from "@/app/about/components/AboutUs";
import Team from "@/app/about/components/Team";
import Background from "@/app/about/components/Background";

export const metadata: Metadata = {
    title: "Our Story",
    description:
        "Discover the story behind What Coffee. Founded in 2024, we create a space where community and quality meet. Learn about our passion for artisan coffee.",
    openGraph: {
        title: "Our Story | What Coffee",
        description:
            "Discover the story behind What Coffee. Founded in 2024, we create a space where community and quality meet.",
    },
};

export default function Story() {
    return (
        <main>
            <PageHeader
                title="Our Story"
                subtitle="About Us"
                image="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80"
            >
                <p className="text-lg text-zinc-600 max-w-lg leading-relaxed">
                    Founded in 2024, we set out to create more than just a coffee shop.
                    We wanted to create a space where community and quality meet.
                </p>
            </PageHeader>
            <div className="container mx-auto px-4 py-16">
                <AboutUs />
                <Background />
                <Team />
            </div>
        </main>
    );
}