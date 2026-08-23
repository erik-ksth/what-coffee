"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import PageHeader from "@/components/PageHeader";
import FloatingOrderButton from "./components/FloatingOrderButton";
import MenuGrid from "./components/MenuGrid";
import MenuTabs from "./components/MenuTabs";
import { MENU_ITEMS, type MenuCategory } from "./menu-data";
import styles from "./menu.module.css";

const MENU_FILTERS: Array<"All" | MenuCategory> = ["All", "Drinks", "Bakery", "Food", "Beans"];

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState<(typeof MENU_FILTERS)[number]>("All");
    const [transitionDirection, setTransitionDirection] = useState(1);
    const visibleItems = useMemo(() => {
        if (selectedCategory === "All") return Object.values(MENU_ITEMS).flat();
        return MENU_ITEMS[selectedCategory];
    }, [selectedCategory]);

    const handleCategoryChange = (category: (typeof MENU_FILTERS)[number]) => {
        if (category === selectedCategory) return;

        setTransitionDirection(
            MENU_FILTERS.indexOf(category) > MENU_FILTERS.indexOf(selectedCategory) ? 1 : -1
        );
        setSelectedCategory(category);
    };

    return (
        <div className={styles.page}>
            <PageHeader
                title="Coffee, pastries, and more."
                subtitle="Our menu"
                image="/images/menu/food/edited/menu-composite.png"
                imagePosition="center"
            >
                <p>Roasted here, baked fresh, and made to order in Santa Clara.</p>
                <Link
                    href="https://www.clover.com/online-ordering/whatcoffee-santa-clara"
                    className={styles.primaryAction}
                >
                    Order online
                </Link>
                <a
                    href="https://www.doordash.com/store/32911877?pickup=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryAction}
                >
                    Order on DoorDash
                </a>
            </PageHeader>

            <section className={styles.menuSection} aria-label="What Coffee menu">
                <MenuTabs
                    filters={MENU_FILTERS}
                    selected={selectedCategory}
                    onChange={handleCategoryChange}
                />
                <MenuGrid
                    items={visibleItems}
                    animationKey={selectedCategory}
                    direction={transitionDirection}
                />
            </section>

            <FloatingOrderButton />
        </div>
    );
}
