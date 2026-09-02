import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import InstagramSection from "./components/InstagramSection";
import { absoluteUrl, SOCIAL_IMAGE } from "@/config/site";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Explore our cozy coffee shop space and beautiful moments at What Coffee. View photos of our artisan drinks, pastries, and welcoming atmosphere.",
    alternates: {
        canonical: absoluteUrl("/gallery"),
    },
    openGraph: {
        url: absoluteUrl("/gallery"),
        title: "Gallery | What Coffee",
        description: "Explore our cozy coffee shop space and beautiful moments at What Coffee.",
        images: [SOCIAL_IMAGE],
    },
};

export default function Gallery() {
    return (
        <div>
            <PageHeader
                title="Life at"
                titleAccent="What Coffee."
                subtitle="Gallery"
                image="/images/site/events/yellow-table-edited.jpg"
                imagePosition="center bottom"
            >
                <p>Coffee, pastries, and the people who make the café feel like home.</p>
            </PageHeader>
            <InstagramSection />
        </div>
    );
}
