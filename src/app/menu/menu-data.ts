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
            description:
                "Made with house blend espresso, bold, and refreshing. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/americano.jpeg",
        },
        {
            name: "Cappuccino",
            description: "House blend espresso with steamed milk and foam.",
            image: "/images/menu/drinks/edited/cappuccino.jpeg",
        },
        {
            name: "Latte",
            description: "House blend espresso with milk. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/iced-latte.jpeg",
        },
        {
            name: "Mocha",
            description: "Chocolate and house blend espresso with steamed milk and foam.",
            image: "/images/menu/drinks/edited/mocha.jpeg",
        },
        {
            name: "Cold Brew",
            description: "12 hour brewed cold brew coffee.",
            image: "/images/menu/drinks/edited/americano.jpeg",
        },
        {
            name: "Matcha Latte",
            description: "Ceremonial grade matcha with milk. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/matcha-latte-creamy.webp",
        },
        {
            name: "Raspberry Iced Matcha",
            description: "Refreshing raspberry puree layered with iced matcha latte.",
            image: "/images/menu/drinks/edited/raspberry-matcha.jpeg",
        },
        {
            name: "Iced Coconut Matcha",
            description: "Refreshing ceremonial grade matcha with coconut water.",
            image: "/images/menu/drinks/edited/iced-coconut-matcha.png",
        },
        {
            name: "Tiramisu Latte",
            description:
                "Latte inspired by tiramisu—rich coffee, cocoa, and a dessert-like finish.",
            image: "/images/menu/drinks/edited/tiramisu-latte.jpeg",
        },
        {
            name: "Ube Latte",
            description:
                "Creamy ube-forward latte with a naturally purple hue and mellow vanilla notes.",
            image: "/images/menu/drinks/edited/ube-latte.jpeg",
        },
        {
            name: "Coconut Iced Latte",
            description: "Simply addicting creamy iced latte made with coconut milk.",
            image: "/images/menu/drinks/edited/coconut-latte.jpeg",
        },
        {
            name: "Bee's Knee",
            description:
                "Honey-kissed espresso drink with vanilla and a cinnamon twist for a smooth, mellow sweetness. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/bees-knees.jpeg",
        },
        {
            name: "Mango Silk Splash",
            description: "Refreshing mango drink with a hint of coconut water.",
            image: "/images/menu/drinks/edited/mss.jpeg",
        },
        {
            name: "Butterfly Pea Tea Lemonade",
            description: "Vibrant butterfly pea tea shaken with lemonade over ice.",
            image: "/images/menu/drinks/edited/butterfly-lemonade.jpeg",
        },
        {
            name: "Chai Latte",
            description: "Spiced black tea latte with a hint of cinnamon and nutmeg.",
            image: "/images/menu/drinks/edited/chai.webp",
        },
        {
            name: "Hot Chocolate",
            description: "Rich and creamy hot chocolate with milk.",
            image: "/images/menu/drinks/edited/chocolate.jpeg",
        },
        {
            name: "Rising Green",
            description: "Refreshing green tea. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/green-tea.jpeg",
        },
        {
            name: "Black Tea",
            description: "Classic black tea. Available Hot or Iced.",
            image: "/images/menu/drinks/edited/black-tea.jpeg",
        },
    ],
    Bakery: [
        {
            name: "Pistachio Croissant",
            description: "Classic croissant with a layer of pistachio paste.",
            image: "/images/menu/food/edited/pistachio-croissant.jpeg",
        },
        {
            name: "Almond Croissant",
            description: "Classic twice-baked croissant with almond flakes.",
            image: "/images/menu/food/edited/almond-croissant.jpeg",
        },
        {
            name: "Pain Au Chocolat",
            description: "Classic croissant with a chocolate filling.",
            image: "/images/menu/food/edited/chocolate-croissant.jpeg",
        },
        {
            name: "Pain Suisse",
            description: "Classic croissant with a buttery crust and a sweet pastry cream filling.",
            image: "/images/menu/food/edited/pain-suisse-v2.png",
        },
        {
            name: "Ham & Cheese Croissant",
            description: "Double-baked croissant with a creamy cheese filling and ham.",
            image: "/images/menu/food/edited/ham-and-cheese-croissant.jpeg",
        },
        {
            name: "Chocolate Banana Croissant",
            description: "Croissant with a chocolate and banana filling.",
            image: "/images/menu/food/edited/chocolate-banana.jpeg",
        },
        {
            name: "Fruit Danish",
            description: "Danish with a pastry cream and fresh berries.",
            image: "/images/menu/food/edited/fruit-danish.jpeg",
        },
        {
            name: "Butter Croissant",
            description: "Simply addictive butter croissant with a warm and flaky texture.",
            image: "/images/menu/food/edited/butter-croissant.jpeg",
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
            description:
                "Soft and fluffy cinnamon roll with a sweet and sticky cinnamon sugar filling.",
            image: "/images/menu/food/edited/cinnamon-roll.jpeg",
        },
        {
            name: "Scones",
            description: "Buttery scones with a sweet or savory filling.",
            image: "/images/menu/food/edited/scone.jpeg",
        },
        {
            name: "Muffins",
            description:
                "Soft and fluffy muffins with a chocolate chips, walnut, banana or blueberry filling.",
            image: "/images/menu/food/edited/muffin.jpeg",
        },
        {
            name: "Cookies",
            description: "Chocolate chip cookies with a crispy exterior and a soft, chewy center.",
            image: "/images/menu/food/edited/cookie.jpeg",
        },
        {
            name: "Chocolate Roll Cake",
            description: "Soft sponge rolled with rich chocolate cream—sliceable and indulgent.",
            image: "/images/menu/food/edited/roll-cake.jpeg",
        },
        {
            name: "Tiramisu",
            description: "Layers of espresso-soaked sponge, mascarpone, and cocoa.",
            image: "/images/menu/food/edited/tiramisu.jpeg",
        },
        {
            name: "Cheese Cake",
            description: "Creamy baked cheesecake with a buttery crust.",
            image: "/images/menu/food/edited/cheese-cake.jpeg",
        },
        // {
        //     name: "Raspberry Heart Mousse",
        //     description: "Silky mousse with bright raspberry and a heart-shaped finish.",
        //     image: "",
        // },
        {
            name: "Hazelnut Mousse Cake",
            description: "Light hazelnut mousse layered over sponge with a nutty, elegant finish.",
            image: "/images/menu/food/edited/hazelnut-mousse.jpeg",
        },
    ],
    Food: [
        {
            name: "Breakfast Sandwich",
            description:
                "Bacon, egg, avocado and cheese on toasted croissant paired with a side salad and fresh seasonal fruits.",
            image: "/images/menu/food/edited/breakfast-sandwich.jpeg",
        },
        {
            name: "The Monroe",
            description:
                "Succulent, slow-cooked pulled pork topped with melted cheese and vine-ripened tomatoes, served alongside a crisp side salad and fresh seasonal fruit.",
            image: "/images/menu/food/edited/the-monroe.jpeg",
        },
        {
            name: "The San Francisco",
            description:
                "Tender, herb-roasted beef stacked high with rich cheese and juicy tomato slices, perfectly paired with a refreshing garden salad and fresh seasonal fruits.",
            image: "/images/menu/food/edited/the-san-francisco.jpeg",
        },
        {
            name: "Mushroom on Ciabatta",
            description:
                "Roasted mushrooms on ciabatta with a side salad and fresh seasonal fruits.",
            image: "/images/menu/food/edited/mushroom.jpeg",
        },
    ],
    Beans: [
        {
            name: "South Bay (Ethiopia + Guatemala)",
            description: "House blend • Ethiopia & Guatemala • stone fruit, cocoa.",
            image: "/images/menu/beans/edited/south-bay-package.jpeg",
        },
        {
            name: "San Francisco",
            description: "Single origin • Colombia • caramel, orange, balanced body.",
            image: "/images/menu/beans/edited/san-francisco-package.jpeg",
        },
        {
            name: "Brazil Decaf",
            description: "Swiss water process • Brazil • milk chocolate, nuts.",
            image: "/images/menu/beans/edited/brazil-decaf-package.jpeg",
        },
    ],
};
