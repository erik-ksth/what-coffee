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
               <article className="group">
                    {/* Image section with hover overlay */}
                    <button
                         type="button"
                         className="relative aspect-square w-full overflow-hidden bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
                         onClick={() => setIsOpen(true)}
                         aria-label={`See description for ${item.name}`}
                    >
                         <Image
                              src={item.image}
                              alt={`${item.name} - ${item.description}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                         />
                         {/* Hover overlay to prompt user to see description */}
                         <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <span className="text-lg font-medium tracking-wide">+ See Description</span>
                         </div>
                    </button>

                    {/* Menu item name */}
                    <p className="font-medium text-xl md:text-xl text-foreground text-center mt-4">{item.name}</p>
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
                              className="relative w-full max-w-md bg-white p-6 shadow-xl rounded-2xl"
                              onClick={(e) => e.stopPropagation()}
                         >
                              {/* Close icon button in the top-right corner of the dialog */}
                              <button
                                   type="button"
                                   onClick={() => setIsOpen(false)}
                                   className="absolute right-4 top-4 text-stone-400 transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white bg-gray-100 p-1 rounded-full"
                                   aria-label="Close description"
                              >
                                   <span aria-hidden="true" className="h-4 w-4 flex justify-center items-center">
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
