export type MenuCategory = "Drinks" | "Bakery" | "Food" | "Beans";

export interface MenuItem {
    name: string;
    description: string;
    image: string;
}

export const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
    Drinks: [
        {
            name: "Grape Shaken Cold Brew",
            description: "Cold brew shaken with fresh grape juice over ice.",
            image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Coconut Iced Latte",
            description: "Creamy iced latte made with toasted coconut milk.",
            image: "https://images.unsplash.com/photo-1626595444746-59219e6838ac?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Iced Raspberry Matcha",
            description: "Bright raspberry syrup layered with iced matcha latte.",
            image: "https://images.unsplash.com/photo-1751563721808-3b81940b88f7?auto=format&fit=crop&w=900&q=80",
        },
    ],
    Bakery: [
        {
            name: "Warm Heart Cake",
            description: "Individual chocolate lava cake with a molten center.",
            image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Mango Cloud Cake",
            description: "Soft sponge layered with whipped cream and fresh mango.",
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Tropical Coconut Cake",
            description: "Coconut crumb cake topped with toasted flakes and citrus.",
            image: "https://images.unsplash.com/photo-1687975091176-5a28a9860907?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Pistachio Croissant",
            description: "Buttery croissant filled with roasted pistachio cream.",
            image: "https://images.unsplash.com/photo-1710242835722-49f4e8a05fb6?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Almond Croissant",
            description: "Classic twice-baked croissant with almond frangipane.",
            image: "https://images.unsplash.com/photo-1618111415321-b406d66958de?auto=format&fit=crop&w=900&q=80",
        },
    ],
    Food: [
        {
            name: "Breakfast Sandwich",
            description: "Bacon, egg, and cheese on toasted croissant paired with a side salad and fresh orange.",
            image: "/menu/food/breakfastsandwich.jpeg",
        },
        {
            name: "The Monroe",
            description: "Succulent, slow-cooked pulled pork topped with melted cheese and vine-ripened tomatoes, served alongside a crisp side salad and fresh seasonal fruit.",
            image: "/menu/food/theMonroe.jpeg",
        },
        {
            name: "The San Francisco",
            description: "Tender, herb-roasted beef stacked high with rich cheese and juicy tomato slices, perfectly paired with a refreshing garden salad and sweet fruit.",
            image: "/menu/food/theSanFrancisco.jpeg",
        },

        {
            name: "Mushroom on Ciabatta",
            description: "Mushroom on ciabatta with a side salad and fresh orange.",
            image: "/menu/food/mushroom.jpeg",
        },
    ],
    Beans: [
        {
            name: "South Bay (Ethiopia + Guatemala)",
            description: "House blend • Ethiopia & Guatemala • stone fruit, cocoa.",
            image: "/menu/beans/SouthBay.jpeg",
        },
        {
            name: "San Francisco",
            description: "Single origin • Colombia • caramel, orange, balanced body.",
            image: "/menu/beans/SanFrancisco.jpeg",
        },
        {
            name: "Brazil Decaf",
            description: "Swiss water process • Brazil • milk chocolate, nuts.",
            image: "/menu/beans/Brazil.jpeg",
        },

    ],
};
