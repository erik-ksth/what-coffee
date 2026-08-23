import type { MenuItem } from "../menu-data";
import MenuItemCard from "./MenuItemCard";
import styles from "./MenuGrid.module.css";

interface MenuGridProps {
    items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
    return (
        <div className={styles.grid} aria-live="polite">
            {items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
            ))}
        </div>
    );
}
