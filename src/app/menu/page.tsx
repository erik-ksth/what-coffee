"use client";

import { useMemo, useState } from "react";
import MenuHero from "./components/MenuHero";
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
            <MenuHero />
            <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-16 py-16">
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
