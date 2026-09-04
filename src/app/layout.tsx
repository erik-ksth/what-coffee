import type { Metadata } from "next";
import { Crafty_Girls, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeafShade from "@/components/LeafShade";
import PageTransition from "@/components/PageTransition";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { absoluteUrl, SITE_URL, SOCIAL_IMAGE } from "@/config/site";

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const poppinsItalic = Poppins({
    variable: "--font-poppins-italic",
    subsets: ["latin"],
    weight: "600",
    style: "italic",
    display: "swap",
});

const craftyGirls = Crafty_Girls({
    variable: "--font-crafty-girls",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "What Coffee | Best Coffee Shop in Santa Clara",
        template: "%s | What Coffee",
    },
    description:
        "Experience the perfect blend of atmosphere and aroma at What Coffee. Fresh roasted daily, artisan coffee, premium beans, and handcrafted pastries in Santa Clara.",
    keywords: [
        "coffee shop",
        "Santa Clara coffee",
        "artisan coffee",
        "craft coffee",
        "specialty coffee",
        "local coffee shop",
        "fresh roasted coffee",
        "pistachio croissant",
        "cappuccino",
        "espresso",
        "bakery",
        "pastries",
        "What Coffee",
    ],
    authors: [{ name: "What Coffee" }],
    creator: "What Coffee",
    publisher: "What Coffee",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: "What Coffee",
        title: "What Coffee | Best Coffee Shop in Santa Clara",
        description:
            "Experience the perfect blend of atmosphere and aroma. Fresh roasted daily, artisan coffee, premium beans, and handcrafted pastries.",
        images: [SOCIAL_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: "What Coffee | Best Coffee Shop in Santa Clara",
        description:
            "Experience the perfect blend of atmosphere and aroma. Fresh roasted daily, artisan coffee, premium beans.",
        images: [SOCIAL_IMAGE.url],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CafeOrCoffeeShop",
                            "@id": absoluteUrl("/#business"),
                            name: "What Coffee",
                            image: absoluteUrl(
                                "/images/site/interiors/coffee-santa-clara-main.jpeg"
                            ),
                            url: SITE_URL,
                            telephone: "+1-408-609-3146",
                            email: "contact@whatcoffeeandbakery.com",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "1002 Monroe St",
                                addressLocality: "Santa Clara",
                                addressRegion: "CA",
                                postalCode: "95050",
                                addressCountry: "US",
                            },
                            geo: {
                                "@type": "GeoCoordinates",
                                latitude: 37.34858354796648,
                                longitude: -121.94839636184717,
                            },
                            openingHoursSpecification: [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                                    opens: "07:30",
                                    closes: "17:00",
                                },
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: ["Friday"],
                                    opens: "07:30",
                                    closes: "19:00",
                                },
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: ["Saturday", "Sunday"],
                                    opens: "08:00",
                                    closes: "19:00",
                                },
                            ],
                            servesCuisine: "Coffee",
                            priceRange: "$",
                            acceptsReservations: false,
                            menu: absoluteUrl("/menu"),
                            sameAs: [
                                "https://www.instagram.com/whatcoffeeandbakery/",
                                "https://www.tiktok.com/@whatcoffeeandbakery",
                            ],
                        }),
                    }}
                />
            </head>
            <body
                className={`${geistMono.variable} ${poppins.variable} ${poppinsItalic.variable} ${craftyGirls.variable} antialiased flex flex-col min-h-screen`}
            >
                <Header />
                <LeafShade />
                <main className="flex-1">
                    <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <GoogleAnalytics />
            </body>
        </html>
    );
}
