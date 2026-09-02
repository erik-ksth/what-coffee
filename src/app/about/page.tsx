import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

import AboutUs from "@/app/about/components/AboutUs";
import Background from "@/app/about/components/Background";
import { absoluteUrl, SOCIAL_IMAGE } from "@/config/site";

export const metadata: Metadata = {
    title: "Our Story",
    description:
        "Discover the story behind What Coffee. Founded in 2024, we create a space where community and quality meet. Learn about our passion for artisan coffee.",
    alternates: {
        canonical: absoluteUrl("/about"),
    },
    openGraph: {
        url: absoluteUrl("/about"),
        title: "Our Story | What Coffee",
        description:
            "Discover the story behind What Coffee. Founded in 2024, we create a space where community and quality meet.",
        images: [SOCIAL_IMAGE],
    },
};

export default function Story() {
    return (
        <div>
            <PageHeader
                title="A café built around craft and community."
                subtitle="Our story"
                image="/images/site/events/community-edited.webp"
                imagePosition="center 36%"
            >
                <p>
                    What Coffee began with a love of roasting, baking, and making people feel at
                    home.
                </p>
            </PageHeader>
            <AboutUs />
            <Background />
        </div>
    );
}
