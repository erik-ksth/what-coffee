const ContactForm = () => {
    return (
        <section className="mx-auto w-full max-w-5xl px-6 py-16 md:px-16">
            <div className="grid gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)]">
                {/* Left column – contact details */}
                <div className="space-y-12 text-sm text-stone-800 md:mt-18">
                    <div className="h-px w-24 bg-stone-300" />

                    <div className="space-y-1">
                        <p className="font-medium">1002 Monroe Street,</p>
                        <p className="font-medium">Santa Clara, 95050</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="font-medium">Monday – Friday</p>
                            <p>7:00 AM – 7:00 PM</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium">Saturday – Sunday</p>
                            <p>8:00 AM – 8:00 PM</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="font-medium">(123) 456-7890</p>
                        <p className="font-medium">hello@whatcoffee.com</p>
                    </div>

                    <div className="h-px w-24 bg-stone-300" />
                </div>

                {/* Right column – form */}
                <form className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 pb-4">
                            Send a Message
                        </h2>
                        <p className="mt-3 text-sm text-stone-500">
                            Have a question about catering, hosting an event, or our menu? Leave us
                            a note and we&apos;ll get back to you as soon as we can.
                        </p>
                    </div>

                    <label className="flex flex-col gap-2 text-sm text-stone-700">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            className="h-14 w-full border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-stone-700">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="h-14 w-full border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-stone-700">
                        <span>Message</span>
                        <textarea
                            name="message"
                            rows={6}
                            className="w-full resize-y border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                        />
                    </label>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 font-medium transition-colors"
                        >
                            Send Message
                            <span aria-hidden="true">›</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
