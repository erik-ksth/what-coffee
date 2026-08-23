import type { MenuCategory } from "../menu-data";
import styles from "./MenuTabs.module.css";

interface MenuTabsProps {
    filters: Array<"All" | MenuCategory>;
    selected: "All" | MenuCategory;
    onChange: (value: "All" | MenuCategory) => void;
}

export default function MenuTabs({ filters, selected, onChange }: MenuTabsProps) {
    return (
        <div className={styles.tabs} aria-label="Filter menu items">
            {filters.map((category) => {
                const isActive = category === selected;
                return (
                    <button
                        key={category}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(category)}
                        className={isActive ? styles.active : undefined}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}
