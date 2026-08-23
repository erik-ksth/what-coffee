import Hero from "@/app/home/components/Hero";
import TopHits from "@/app/home/components/TopHits";
import CraftBento from "@/app/home/components/CraftBento";
import Testimonials from "@/app/home/components/Testimonials";
import Gallery from "@/app/home/components/Gallery";

export default function Home() {
    return (
        <>
            <Hero />
            <TopHits />
            <CraftBento />
            <Testimonials />
            <Gallery />
        </>
    );
}
