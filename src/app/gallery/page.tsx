import PageHeader from "@/components/PageHeader";
import InstagramSection from "./components/InstagramSection";

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
