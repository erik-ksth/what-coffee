export type MenuCategory = "Drinks" | "Bakery" | "Food" | "Beans";

export interface MenuItem {
    name: string;
    description: string;
    image: string;
}

export const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
    Drinks: [

        {
            name: "Americano",
            description: "Made with house blend espresso, bold, and refreshing. Available Hot or Iced.",
            image: "/menu/edited/drinks/americano.jpeg",
        },
        {
            name: "Cappuccino",
            description: "House blend espresso with steamed milk and foam.",
            image: "/menu/edited/drinks/cappuccino_photo.jpeg",
        },
        {
            name: "Latte",
            description: "House blend espresso with milk. Available Hot or Iced.",
            image: "/menu/edited/drinks/iced_latte.jpeg",
        },
        {
            name: "Mocha",
            description: "Chocolate and house blend espresso with steamed milk and foam.",
            image: "/menu/edited/drinks/mocha.jpeg",
        },
        {
            name: "Cold Brew",
            description: "12 hour brewed cold brew coffee.",
            image: "/menu/edited/drinks/americano.jpeg",
        },
        {
            name: "Matcha Latte",
            description: "Ceremonial grade matcha with milk. Available Hot or Iced.",
            image: "/menu/edited/drinks/coco_matcha-v2.png",
        },
        {
            name: "Raspberry Iced Matcha",
            description: "Refreshing raspberry puree layered with iced matcha latte.",
            image: "/menu/edited/drinks/rasp_match.jpeg",
        },
        {
            name: "Iced Coconut Matcha",
            description: "Refreshing ceremonial grade matcha with coconut water.",
            image: "/menu/edited/drinks/coco_matcha-v2.png",
        },
        {
            name: "Tiramisu Latte",
            description: "Latte inspired by tiramisu—rich coffee, cocoa, and a dessert-like finish.",
            image: "/menu/edited/drinks/tiramisu_latte.jpeg",
        },
        {
            name: "Ube Latte",
            description: "Creamy ube-forward latte with a naturally purple hue and mellow vanilla notes.",
            image: "/menu/edited/drinks/ube_latte.jpeg",
        },
        {
            name: "Coconut Iced Latte",
            description: "Simply addicting creamy iced latte made with coconut milk.",
            image: "/menu/edited/drinks/coconut_latte.jpeg",
        },
        {
            name: "Bee's Knee",
            description: "Honey-kissed espresso drink with vanilla and a cinnamon twist for a smooth, mellow sweetness. Available Hot or Iced.",
            image: "/menu/edited/drinks/beesknee.jpeg",
        },
        {
            name: "Mango Silk Splash",
            description: "Refreshing mango drink with a hint of coconut water.",
            image: "/menu/edited/drinks/mss.jpeg",
        },
        {
            name: "Butterfly Pea Tea Lemonade",
            description: "Vibrant butterfly pea tea shaken with lemonade over ice.",
            image: "/menu/edited/drinks/butterfly_lemonade.jpeg",
        },
        {
            name: "Chai Latte",
            description: "Spiced black tea latte with a hint of cinnamon and nutmeg.",
            image: "/menu/edited/drinks/chai.png",
        },
        {
            name: "Hot Chocolate",
            description: "Rich and creamy hot chocolate with milk.",
            image: "/menu/edited/drinks/chocolate.jpeg",
        },
        {
            name: "Rising Green",
            description: "Refreshing green tea. Available Hot or Iced.",
            image: "/menu/edited/drinks/green_tea.jpeg",
        },
        {
            name: "Black Tea",
            description: "Classic black tea. Available Hot or Iced.",
            image: "/menu/edited/drinks/black_tea.jpeg",
        },
    ],
    Bakery: [
        {
            name: "Pistachio Croissant",
            description: "Classic croissant with a layer of pistachio paste.",
            image: "/menu/edited/food/pistachio-croissant-edited.jpeg",
        },
        {
            name: "Almond Croissant",
            description: "Classic twice-baked croissant with almond flakes.",
            image: "/menu/edited/food/almond-croissant-edited.jpeg",
        },
        {
            name: "Pain Au Chocolat",
            description: "Classic croissant with a chocolate filling.",
            image: "/menu/edited/food/chocolate-croissant-edited.jpeg",
        },
        {
            name: "Pain Suisse",
            description: "Classic croissant with a buttery crust and a sweet pastry cream filling.",
            image: "/menu/edited/food/pain-suisse-edited-v2.png",
        },
        {
            name: "Ham & Cheese Croissant",
            description: "Double-baked croissant with a creamy cheese filling and ham.",
            image: "/menu/edited/food/ham-and-cheese-croissant-edited.jpeg",
        },
        {
            name: "Chocolate Banana Croissant",
            description: "Croissant with a chocolate and banana filling.",
            image: "/menu/edited/food/chocolate-banana-edited.jpeg",
        },
        {
            name: "Fruit Danish",
            description: "Danish with a pastry cream and fresh berries.",
            image: "/menu/edited/food/fruit-danish-edited.jpeg",
        },
        {
            name: "Butter Croissant",
            description: "Simply addictive butter croissant with a warm and flaky texture.",
            image: "/menu/edited/food/butter-croissant-edited.jpeg",
        },
        // {
        //     name: "Strawberry Cream Donut",
        //     description: "Brioche Donut with a strawberry filling.",
        //     image: "",
        // },
        // {
        //     name: "Mango Cream Donut",
        //     description: "Brioche Donut with a mango filling.",
        //     image: "",
        // },
        {
            name: "Cinnamon Roll",
            description: "Soft and fluffy cinnamon roll with a sweet and sticky cinnamon sugar filling.",
            image: "/menu/edited/food/cinnamon-roll-edited.jpeg",
        },
        {
            name: "Scones",
            description: "Buttery scones with a sweet or savory filling.",
            image: "/menu/edited/food/scone-edited.jpeg",
        },
        {
            name: "Muffins",
            description: "Soft and fluffy muffins with a chocolate chips, walnut, banana or blueberry filling.",
            image: "/menu/edited/food/muffin-edited.jpeg",
        },
        {
            name: "Cookies",
            description: "Chocolate chip cookies with a crispy exterior and a soft, chewy center.",
            image: "/menu/edited/food/cookie-edited.jpeg",
        },
        {
            name: "Chocolate Roll Cake",
            description: "Soft sponge rolled with rich chocolate cream—sliceable and indulgent.",
            image: "/menu/edited/food/roll-cake-edited.jpeg",
        },
        {
            name: "Tiramisu",
            description: "Layers of espresso-soaked sponge, mascarpone, and cocoa.",
            image: "/menu/edited/food/tiramisu-edited.jpeg",
        },
        {
            name: "Cheese Cake",
            description: "Creamy baked cheesecake with a buttery crust.",
            image: "/menu/edited/food/cheese-cake-edited.jpeg",
        },
        // {
        //     name: "Raspberry Heart Mousse",
        //     description: "Silky mousse with bright raspberry and a heart-shaped finish.",
        //     image: "",
        // },
        {
            name: "Hazelnut Mousse Cake",
            description: "Light hazelnut mousse layered over sponge with a nutty, elegant finish.",
            image: "/menu/edited/food/hazelnut-mousse-edited.jpeg",
        },
    ],
    Food: [
        {
            name: "Breakfast Sandwich",
            description: "Bacon, egg, avocado and cheese on toasted croissant paired with a side salad and fresh seasonal fruits.",
            image: "/menu/edited/food/breakfastsandwich-edited.jpeg",
        },
        {
            name: "The Monroe",
            description: "Succulent, slow-cooked pulled pork topped with melted cheese and vine-ripened tomatoes, served alongside a crisp side salad and fresh seasonal fruit.",
            image: "/menu/edited/food/the-monroe-edited.jpeg",
        },
        {
            name: "The San Francisco",
            description: "Tender, herb-roasted beef stacked high with rich cheese and juicy tomato slices, perfectly paired with a refreshing garden salad and fresh seasonal fruits.",
            image: "/menu/edited/food/the-san-francisco-edited.jpeg",
        },
        {
            name: "Mushroom on Ciabatta",
            description: "Roasted mushrooms on ciabatta with a side salad and fresh seasonal fruits.",
            image: "/menu/edited/food/mushroom-edited.jpeg",
        },
    ],
    Beans: [
        {
            name: "South Bay (Ethiopia + Guatemala)",
            description: "House blend • Ethiopia & Guatemala • stone fruit, cocoa.",
            image: "/menu/edited/beans/south-bay-package.jpeg",
        },
        {
            name: "San Francisco",
            description: "Single origin • Colombia • caramel, orange, balanced body.",
            image: "/menu/edited/beans/san-francisco-package.jpeg",
        },
        {
            name: "Brazil Decaf",
            description: "Swiss water process • Brazil • milk chocolate, nuts.",
            image: "/menu/edited/beans/brazil-decaf-package.jpeg",
        },

    ],
};
