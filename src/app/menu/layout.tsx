import { Metadata } from "next";
import { absoluteUrl, SOCIAL_IMAGE } from "@/config/site";

export const metadata: Metadata = {
    title: "Menu",
    description:
        "Explore our menu of artisan coffee, specialty drinks, fresh bakery items, and delicious food. Order online from What Coffee in Santa Clara.",
    alternates: {
        canonical: absoluteUrl("/menu"),
    },
    keywords: [
        "coffee menu",
        "specialty drinks",
        "bakery",
        "pastries",
        "pistachio croissant",
        "cappuccino",
        "espresso",
        "latte",
        "order online",
    ],
    openGraph: {
        url: absoluteUrl("/menu"),
        title: "Menu | What Coffee",
        description:
            "Explore our menu of artisan coffee, specialty drinks, fresh bakery items, and delicious food.",
        images: [SOCIAL_IMAGE],
    },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
    return children;
}
