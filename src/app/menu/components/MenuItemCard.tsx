import Image from "next/image";
import type { MenuItem } from "../menu-data";

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
    return (
        <article className="flex flex-col items-center gap-3 text-center">
            {/* Image section with fixed aspect ratio and styling */}
            <div className="relative aspect-square w-[80%] sm:w-[85%] overflow-hidden bg-stone-100 shadow-sm">
                <Image
                    src={item.image}
                    alt={`${item.name} - ${item.description}`} // alt text for accessibility
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 32vw, 70vw"
                    className="object-cover"
                />
            </div>
            {/* Menu item name */}
            <h3 className="text-base font-medium text-stone-600 ">{item.name}</h3>
            {/* Menu item description (screen reader only, hidden visually) */}
            <p className="sr-only">{item.description}</p>
        </article>
    );
};

export default MenuItemCard;
