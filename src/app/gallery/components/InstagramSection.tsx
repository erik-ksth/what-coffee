import Script from "next/script";

const InstagramSection = () => {
    return (
        // Elfsight Instagram widget section
        <section className="mx-auto w-full max-w-5xl px-6 py-16 md:px-16">
            <div className="mb-16 flex items-baseline justify-between text-sm font-medium text-stone-800">
                <h2 className="text-xl md:text-2xl font-serif font-medium">
                    Explore our Instagram
                </h2>
                <a
                    href="https://www.instagram.com/whatcoffeeandbakery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.25em] text-primary hover:underline"
                >
                    @whatcoffeeandbakery
                </a>
            </div>

            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div
                className="elfsight-app-fdf7b364-a40b-4428-89da-a9dae1861bce"
                data-elfsight-app-lazy
            />
        </section>
    );
};
export default InstagramSection;
