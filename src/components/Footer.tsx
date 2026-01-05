import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="main-footer" className="w-full bg-foreground text-background pt-24 pb-8">
            <div className="container mx-auto px-4">

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

                    {/* Brand Section - Spans 4 cols */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-8 text-primary/20 select-none">
                                WHAT.
                            </h2>
                            <p className="text-xl text-zinc-400 max-w-sm leading-relaxed">
                                Brewing coffee that inspires. <br />
                                Minimalist sourcing, maximalist flavor.
                            </p>
                        </div>
                    </div>

                    {/* Quick Links - Spans 2 cols */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Menu</h3>
                        <ul className="flex flex-col gap-4">
                            {["Home", "Menu", "About", "Gallery", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-lg font-medium hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                    >
                                        {item}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Spans 2 cols */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Visit</h3>
                        <div className="flex flex-col gap-6 text-zinc-400">
                            <div>
                                <p className="text-white font-medium mb-1">1002 Monroe Street, </p>
                                <p>Santa Clara, CA 95050</p>
                            </div>
                            <div>
                                <p className="text-white font-medium mb-2">Hours</p>
                                <p>Mon–Thu: 7:30 AM – 5 PM</p>
                                <p>Fri–Sat: 7:30 AM – 7 PM</p>
                                <p>Sun: 8 AM – 5 PM</p>
                            </div>
                            <a href="mailto:hello@whatcoffee.com" className="hover:text-primary transition-colors">
                                hello@whatcoffee.com
                            </a>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-600 text-sm font-medium">
                        &copy; {new Date().getFullYear()} What Coffee. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        {[
                            { Icon: Instagram, href: "https://www.instagram.com/whatcoffeeandbakery/" },
                            { Icon: Mail, href: "https://www.tiktok.com/@whatcoffeeandbakery" }, // TODO: Add TikTok
                            { Icon: Mail, href: "mailto:hello@whatcoffee.com" },

                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="w-10 h-10 bg-zinc-900 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 group rounded-full"
                            >
                                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
