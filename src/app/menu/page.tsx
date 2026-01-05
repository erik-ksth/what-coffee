"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import MenuTabs from "./components/MenuTabs";
import MenuGrid from "./components/MenuGrid";
import { MENU_ITEMS, type MenuCategory } from "./menu-data";

const MENU_FILTERS: Array<"All" | MenuCategory> = ["All", "Drinks", "Bakery", "Food", "Beans"];

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState<(typeof MENU_FILTERS)[number]>("All");
    const visibleItems = useMemo(() => {
        if (selectedCategory === "All") {
            return Object.values(MENU_ITEMS).flat();
        }
        return MENU_ITEMS[selectedCategory];
    }, [selectedCategory]);

    return (
        <main>
            <PageHeader
                title="Your Favorites, Ready When You Are"
                subtitle="Our Menu"
                image="https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=1920&q=80"
            >
                <Link
                    href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 active:scale-95"
                >
                    <span className="relative z-10 font-bold uppercase tracking-wider">
                        Order Online
                    </span>
                    {/* <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <ShoppingBag className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" /> */}
                </Link>
            </PageHeader>
            <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-16">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
                        Products
                    </h2>
                </div>
                <MenuTabs
                    filters={MENU_FILTERS}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                />
                <MenuGrid items={visibleItems} />
            </section>
        </main>
    );
}
