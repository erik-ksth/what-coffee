import type { MenuItem } from "../menu-data";
import MenuItemCard from "./MenuItemCard";

interface MenuGridProps {
    items: MenuItem[];
}

const MenuGrid = ({ items }: MenuGridProps) => {
    return (
        <div className="grid w-full gap-8 pb-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
            ))}
        </div>
    );
};

export default MenuGrid;
