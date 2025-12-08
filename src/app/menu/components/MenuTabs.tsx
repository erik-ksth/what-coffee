import type { MenuCategory } from "../menu-data";

interface MenuTabsProps {
     filters: Array<"All" | MenuCategory>;
     selected: "All" | MenuCategory;
     onChange: (value: "All" | MenuCategory) => void;
}

// MenuTabs component renders tab-like buttons for each filter category.
const MenuTabs = ({ filters, selected, onChange }: MenuTabsProps) => {
     return (
          // Container for tab buttons, centered and styled
          <div className="flex flex-wrap justify-center gap-12 text-lg font-medium text-stone-400">
               {filters.map((category) => {
                    // Determine if this tab is currently active
                    const isActive = category === selected;
                    return (
                         <button
                              key={category}
                              type="button"
                              // When button is clicked, update selected category
                              onClick={() => onChange(category)}
                              // Style active tab differently, and add hover effect for inactive tabs
                              className={`relative pb-2 transition ${isActive ? "text-stone-900" : "hover:text-stone-600"
                                   }`}
                         >
                              {category}
                              <span
                                   className={`absolute left-1/2 top-full h-[3px] w-7 -translate-x-1/2 bg-[#c28b52] transition ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                        }`}
                              />
                         </button>
                    );
               })}
          </div>
     );
};

export default MenuTabs;
