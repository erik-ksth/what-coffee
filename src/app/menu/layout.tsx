import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Menu",
     description:
          "Explore our menu of artisan coffee, specialty drinks, fresh bakery items, and delicious food. Order online from What Coffee in Santa Clara.",
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
          title: "Menu | What Coffee",
          description:
               "Explore our menu of artisan coffee, specialty drinks, fresh bakery items, and delicious food.",
     },
};

export default function MenuLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return children;
}
