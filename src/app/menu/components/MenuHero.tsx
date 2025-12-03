import Image from "next/image";
import Link from "next/link";

const MENU_HERO_IMAGE = "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=1920&q=80";

const MenuHero = () => {
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
                    Your Favorites,
                    <br />
                    Ready When You Are
                </h1>
                {/* Subheading */}
                <p className="text-lg text-white/80">Order now, skip the wait.</p>
                {/* Link to online ordering platform */}
                <Link
                    href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                >
                    Order Online
                </Link>
            </div>
        </section>
    );
};
export default MenuHero;
