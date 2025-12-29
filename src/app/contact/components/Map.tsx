const Map = () => {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-32 md:px-16">
            <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                    Visit us at our Santa Clara location
                </h2>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.7434633754633!2d-121.95097648806629!3d37.34858167197966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcbd89184a11d%3A0x57f526af1b0b1c0a!2sWhatCoffee%20%26%20Bakery!5e0!3m2!1sen!2sus!4v1767051729840!5m2!1sen!2sus"
                    className="w-full h-[500px] md:h-[600px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WhatCoffee & Bakery Location"
                />
            </div>
        </section>
    );
};

export default Map;
