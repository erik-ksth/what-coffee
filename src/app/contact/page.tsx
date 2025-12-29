import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./components/ContactForm";
import Map from "./components/Map";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with What Coffee. Visit us in Santa Clara or send us a message. We'd love to hear from you!",
    openGraph: {
        title: "Contact What Coffee",
        description: "Get in touch with What Coffee. Visit us in Santa Clara or send us a message.",
    },
};
export default function Contact() {
    return (
        <main>
            <PageHeader
                title="Get in touch"
                subtitle="Contact Us"
                image="https://images.unsplash.com/photo-1755884931646-ae6e1d227717?w=1920&q=80"
            />
            <ContactForm />
            <Map />
        </main>
    );
}
