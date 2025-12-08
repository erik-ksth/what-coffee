import Hero from "@/app/home/components/Hero";
import TopHits from "@/app/home/components/TopHits";
import Catering from "@/app/home/components/Catering";
import Features from "@/app/home/components/Features";
import Testimonials from "@/app/home/components/Testimonials";
import Gallery from "@/app/home/components/Gallery";

export default function Home() {
    return (
        <main>
            <Hero />
            <TopHits />
            <Catering />
            <Features />
            <Testimonials />
            <Gallery />
        </main>
    );
}
