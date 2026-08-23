import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import InstagramSection from "./components/InstagramSection";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Explore our cozy coffee shop space and beautiful moments at What Coffee. View photos of our artisan drinks, pastries, and welcoming atmosphere.",
    openGraph: {
        title: "Gallery | What Coffee",
        description: "Explore our cozy coffee shop space and beautiful moments at What Coffee.",
    },
};

export default function Gallery() {
    return (
        <div>
            <PageHeader
                title="Life at What Coffee."
                subtitle="Gallery"
                image="/yellow-table.jpeg"
                imagePosition="center 58%"
            >
                <p>Coffee, pastries, and the people who make the café feel like home.</p>
            </PageHeader>
            <InstagramSection />
        </div>
    );
}
