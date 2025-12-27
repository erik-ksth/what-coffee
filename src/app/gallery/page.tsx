import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import InstagramSection from "./components/InstagramSection";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Explore our cozy coffee shop space and beautiful moments at What Coffee. View photos of our artisan drinks, pastries, and welcoming atmosphere.",
    openGraph: {
        title: "Gallery | What Coffee",
        description:
            "Explore our cozy coffee shop space and beautiful moments at What Coffee.",
    },
};

export default function Gallery() {
    return (
        <main>
            <PageHeader
                title="Gallery"
                subtitle="Our Space"
                image="https://images.unsplash.com/photo-1600007525237-3ffb936cd20f?w=1920&q=80"
            />
            <InstagramSection />
        </main>
    );
}
