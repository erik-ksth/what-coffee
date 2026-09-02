import type { Metadata } from "next";

import Hero from "@/app/home/components/Hero";
import TopHits from "@/app/home/components/TopHits";
import CraftBento from "@/app/home/components/CraftBento";
import Testimonials from "@/app/home/components/Testimonials";
import Gallery from "@/app/home/components/Gallery";
import { absoluteUrl } from "@/config/site";

export const metadata: Metadata = {
    alternates: {
        canonical: absoluteUrl("/"),
    },
};

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
