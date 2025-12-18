import PageHeader from "@/components/PageHeader";
import ContactForm from "./components/ContactForm";

export default function Contact() {
    return (
        <main>
            <PageHeader
                title="Get in touch"
                subtitle="Contact Us"
                image="https://images.unsplash.com/photo-1755884931646-ae6e1d227717?w=1920&q=80"
            />
            <ContactForm />
        </main>
    );
}
