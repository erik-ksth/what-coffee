import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, Mail } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      fill="currentColor"
    />
  </svg>
);

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
                            {[
                                { label: "Home", href: "/" },
                                { label: "Menu", href: "/menu" },
                                { label: "Catering", href: "/catering-wholesale" },
                                { label: "About", href: "/about" },
                                { label: "Gallery", href: "/gallery" },
                                { label: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-lg font-medium hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                    >
                                        {item.label}
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
                                <a
                                    href="https://maps.app.goo.gl/k7j3PC34rzGNvbjWA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:text-primary transition-colors"
                                >
                                    <p className="text-white font-medium mb-1">1002 Monroe Street, </p>
                                    <p>Santa Clara, CA 95050</p>
                                </a>
                            </div>
                            <div>
                                <p className="text-white font-medium mb-2">Hours</p>
                                <p>Mon – Wed: 7:30 AM – 5 PM</p>
                                <p>Thu – Fri: 7:30 AM – 11 PM</p>
                                <p>Sat - Sun: 8 AM – 11 PM</p>
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
                            { Icon: TikTokIcon, href: "https://www.tiktok.com/@whatcoffeeandbakery" },
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
