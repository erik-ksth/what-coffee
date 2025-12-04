import Image from "next/image";
import Link from "next/link";

const MENU_HERO_IMAGE = "https://images.unsplash.com/photo-1755884931646-ae6e1d227717?w=1920&q=80";

const ContactHero = () => {
    return (
        <section
            className="relative isolate flex h-[460px] w-screen flex-col items-center justify-center gap-6 overflow-hidden text-center text-white"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
            }}
        >
            {/* Background image of menu page */}
            <Image
                src={MENU_HERO_IMAGE}
                alt="Cafe interior with brick wall and wooden table"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
            {/* Color overlay to darken image and make text readable */}
            <div className="absolute inset-0 bg-[#2d1809]/70" />

            <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 px-6">
                {/* Main heading */}
                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                    Get in touch
                </h1>
            </div>
        </section>
    );
};
export default ContactHero;
