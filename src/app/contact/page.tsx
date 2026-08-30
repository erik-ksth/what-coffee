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
        <div>
            <PageHeader
                title="Come by and say hello."
                subtitle="Contact"
                image="/images/site/about/chair-setup-edited.jpg"
                imagePosition="center 42%"
            >
                <p>Visit us in Santa Clara or send a note. We&apos;d love to hear from you.</p>
            </PageHeader>
            <ContactForm />
            <Map />
        </div>
    );
}
