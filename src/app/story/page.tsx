import PageHeader from "@/components/PageHeader";

import About from "@/app/story/components/About";
import Team from "@/app/story/components/Team";
import Back from "@/app/story/components/Back";
import StoryHero from "@/app/story/components/StoryHero";

export default function Story() {
    return (
        <main>
            <PageHeader
                title="Our Story"
                subtitle="About Us"
                image="https://images.unsplash.com/photo-1442512595331-e89e7385a861?w=1920&q=80"
            >
                <p className="text-lg text-zinc-600 max-w-lg leading-relaxed">
                    Founded in 2024, we set out to create more than just a coffee shop.
                    We wanted to create a space where community and quality meet.
                </p>
            </PageHeader>
            <div className="container mx-auto px-4 py-16">
                <About />
                <Back />
                <Team />
            </div>
        </main>
    );
}