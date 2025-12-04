import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "../menu-data";

interface MenuItemCardProps {
    item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <article className="flex flex-col items-center gap-3 text-center">
                {/* Image section with hover overlay */}
                <button
                    type="button"
                    className="group relative aspect-square w-[80%] sm:w-[85%] overflow-hidden bg-stone-100 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={() => setIsOpen(true)}
                    aria-label={`See description for ${item.name}`}
                >
                    <Image
                        src={item.image}
                        alt={`${item.name} - ${item.description}`}
                        fill
                        sizes="(min-width: 1024px) 220px, (min-width: 640px) 32vw, 70vw"
                        className="object-cover"
                    />
                    {/* Hover overlay to prompt user to see description */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-lg font-medium tracking-wide">+ See Description</span>
                    </div>
                </button>

                {/* Menu item name */}
                <h3 className="text-base font-medium text-stone-600 ">{item.name}</h3>
                {/* Keep description for screen readers even when dialog is closed */}
                <p className="sr-only">{item.description}</p>
            </article>

            {/* Simple modal dialog for description */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`menu-item-title-${item.name}`}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-md bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close icon button in the top-right corner of the dialog */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-stone-400 transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            aria-label="Close description"
                        >
                            <span aria-hidden="true" className="block h-4 w-4">
                                ×
                            </span>
                        </button>

                        <h3
                            id={`menu-item-title-${item.name}`}
                            className="mb-2 text-lg font-semibold text-stone-900"
                        >
                            {item.name}
                        </h3>
                        <p className="mt-2 text-sm text-stone-600">{item.description}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuItemCard;
