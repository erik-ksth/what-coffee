import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://whatcoffee.com"),
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
        url: "https://whatcoffee.com",
        siteName: "What Coffee",
        title: "What Coffee | Best Coffee Shop in Santa Clara",
        description:
            "Experience the perfect blend of atmosphere and aroma. Fresh roasted daily, artisan coffee, premium beans, and handcrafted pastries.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "What Coffee - Artisan Coffee Shop",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "What Coffee | Best Coffee Shop in Santa Clara",
        description:
            "Experience the perfect blend of atmosphere and aroma. Fresh roasted daily, artisan coffee, premium beans.",
        images: ["/og-image.jpg"],
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
    alternates: {
        canonical: "https://whatcoffee.com",
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
                            name: "What Coffee",
                            image: "https://whatcoffee.com/og-image.jpg",
                            url: "https://whatcoffee.com",
                            telephone: "408-279-3333",
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
                                    dayOfWeek: [
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                    ],
                                    opens: "07:30",
                                    closes: "17:00",
                                },
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: ["Friday", "Saturday"],
                                    opens: "07:30",
                                    closes: "19:00",
                                },
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: ["Sunday"],
                                    opens: "08:00",
                                    closes: "17:00",
                                },
                            ],
                            servesCuisine: "Coffee",
                            priceRange: "$",
                            acceptsReservations: "false",
                            menu: "https://whatcoffee.com/menu",
                        }),
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased flex flex-col min-h-screen`}
            >
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
