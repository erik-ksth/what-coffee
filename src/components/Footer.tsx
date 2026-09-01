import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

import styles from "./Footer.module.css";

const directionsUrl = "https://maps.app.goo.gl/k7j3PC34rzGNvbjWA";

const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Catering", href: "/catering-wholesale" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
];

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
            fill="currentColor"
        />
    </svg>
);

export default function Footer() {
    return (
        <footer id="main-footer" className={styles.footer}>
            <div className={styles.shell}>
                <div className={styles.inner}>
                    <div className={styles.topRow}>
                        <span className={styles.brand}>What Coffee</span>

                        <nav aria-label="Footer navigation">
                            <ul className={styles.navList}>
                                {footerLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className={styles.infoRow}>
                        <section>
                            <h2>Visit</h2>
                            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                                1002 Monroe Street
                                <br />
                                Santa Clara, CA 95050
                            </a>
                            <a href="tel:+14086093146">(408) 609-3146</a>
                            <a href="tel:+14082907777">(408) 290-7777</a>
                            <a href="mailto:contact@whatcoffeeandbakery.com">
                                contact@whatcoffeeandbakery.com
                            </a>
                        </section>

                        <section>
                            <h2>Opening hours</h2>
                            <p>Mon – Thu&nbsp;&nbsp; 7:30 AM – 5 PM</p>
                            <p>Fri &nbsp;&nbsp; 7:30 AM – 7 PM</p>
                            <p>Sat - Sunday&nbsp;&nbsp; 8 AM – 7 PM</p>
                        </section>

                        <div className={styles.socials} aria-label="Follow What Coffee">
                            <a
                                href="https://www.instagram.com/whatcoffeeandbakery/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram aria-hidden="true" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@whatcoffeeandbakery"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                            >
                                <TikTokIcon />
                            </a>
                            <a
                                href="mailto:contact@whatcoffeeandbakery.com"
                                aria-label="Email What Coffee"
                            >
                                <Mail aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
