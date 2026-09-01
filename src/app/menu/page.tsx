"use client";

import Link from "next/link";
import { CircleAlert, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

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
    const allergenDialogRef = useRef<HTMLDialogElement>(null);
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
                <button
                    type="button"
                    className={styles.allergenTrigger}
                    onClick={() => allergenDialogRef.current?.showModal()}
                    aria-haspopup="dialog"
                >
                    <CircleAlert aria-hidden="true" size={18} strokeWidth={2} />
                    Allergen notice
                </button>
                <dialog
                    ref={allergenDialogRef}
                    className={styles.allergenDialog}
                    aria-labelledby="allergen-dialog-title"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) event.currentTarget.close();
                    }}
                >
                    <div className={styles.allergenDialogContent}>
                        <div className={styles.allergenDialogHeading}>
                            <h2 id="allergen-dialog-title">Allergen notice</h2>
                            <button
                                type="button"
                                className={styles.allergenDialogClose}
                                onClick={() => allergenDialogRef.current?.close()}
                                aria-label="Close allergen notice"
                            >
                                <X aria-hidden="true" size={20} strokeWidth={2} />
                            </button>
                        </div>
                        <p>
                            Menu items, prices, and availability may change. Our kitchen handles
                            common allergens and we cannot guarantee any item is free of allergens
                            or cross-contact. Please ask staff about ingredients and dietary needs
                            before ordering.
                        </p>
                    </div>
                </dialog>
            </PageHeader>

            <section className={styles.menuSection} aria-label="What Coffee menu">
                <MenuTabs
                    filters={MENU_FILTERS}
                    selected={selectedCategory}
                    onChange={handleCategoryChange}
                />
                <p
                    className={styles.filterStatus}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {selectedCategory === "All"
                        ? `Showing all ${visibleItems.length} menu items.`
                        : `Showing ${visibleItems.length} items in ${selectedCategory}.`}
                </p>
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
