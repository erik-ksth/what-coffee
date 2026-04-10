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
            image: "/menu/drinks/americano.jpeg",
        },
        {
            name: "Cappuccino",
            description: "House blend espresso with steamed milk and foam.",
            image: "/menu/drinks/icedlatte.jpeg",
        },
        {
            name: "Latte",
            description: "House blend espresso with milk. Available Hot or Iced.",
            image: "/menu/drinks/icedlatte.jpeg",
        },
        {
            name: "Mocha",
            description: "Chocolate and house blend espresso with steamed milk and foam.",
            image: "/menu/drinks/icedlatte.jpeg",
        },
        {
            name: "Cold Brew",
            description: "12 hour brewed cold brew coffee.",
            image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Matcha Latte",
            description: "Ceremonial grade matcha with milk. Available Hot or Iced.",
            image: "/menu/drinks/matcha.jpeg",
        },
        {
            name: "Raspberry Iced Matcha",
            description: "Refreshing raspberry puree layered with iced matcha latte.",
            image: "/menu/drinks/rasp_matcha.jpeg",
        },
        {
            name: "Iced Coconut Matcha",
            description: "Refreshing ceremonial grade matcha with coconut water.",
            image: "/menu/drinks/.jpeg",
        },
        {
            name: "Tiramisu Latte",
            description: "Latte inspired by tiramisu—rich coffee, cocoa, and a dessert-like finish.",
            image: "/menu/drinks/tiramisu_latte.jpeg",
        },
        {
            name: "Ube Latte",
            description: "Creamy ube-forward latte with a naturally purple hue and mellow vanilla notes.",
            image: "/menu/drinks/ube_latte.jpeg",
        },
        {
            name: "Coconut Iced Latte",
            description: "Simply addicting creamy iced latte made with coconut milk.",
            image: "https://images.unsplash.com/photo-1626595444746-59219e6838ac?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Bee's Knee",
            description: "Honey-kissed espresso drink with vanilla and a cinnamon twist for a smooth, mellow sweetness. Available Hot or Iced.",
            image: "/menu/drinks/beesknee.jpeg",
        },
        {
            name: "Mango Silk Splash",
            description: "Refreshing mango drink with a hint of coconut water.",
            image: "/menu/drinks/mss.jpeg",
        },
        {
            name: "Butterfly Pea Tea Lemonade",
            description: "Vibrant butterfly pea tea shaken with lemonade over ice.",
            image: "/menu/drinks/butterfly.jpeg",
        },
        {
            name: "Chai Latte",
            description: "Spiced black tea latte with a hint of cinnamon and nutmeg.",
            image: "/menu/drinks/.jpeg",
        },
        {
            name: "Hot Chocolate",
            description: "Rich and creamy hot chocolate with milk.",
            image: "/menu/drinks/.jpeg",
        },
        {
            name: "Rising Green",
            description: "Refreshing green tea. Available Hot or Iced.",
            image: "/menu/drinks/.jpeg",
        },
        {
            name: "Black Tea",
            description: "Classic black tea. Available Hot or Iced.",
            image: "/menu/drinks/.jpeg",
        },
    ],
    Bakery: [
        {
            name: "Pistachio Croissant",
            description: "Classic croissant with a layer of pistachio paste.",
            image: "/menu/bakery/pistachio_croissant.jpeg",
        }
        ,
        {
            name: "Almond Croissant",
            description: "Classic twice-baked croissant with almond flakes.",
            image: "https://images.unsplash.com/photo-1618111415321-b406d66958de?auto=format&fit=crop&w=900&q=80",
        },
        {
            name: "Pain Au Chocolat",
            description: "Classic croissant with a chocolate filling.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Pain Suisse",
            description: "Classic croissant with a buttery crust and a sweet pastry cream filling.",
            image: "/menu/bakery/plain_donut.jpeg",
        },
        {
            name: "Ham & Cheese Croissant",
            description: "Double-baked croissant with a creamy cheese filling and ham.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Chocolate Banana Croissant",
            description: "Croissant with a chocolate and banana filling.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Fruit Danish",
            description: "Danish with a pastry cream and fresh berries.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Butter Croissant",
            description: "Simply addictive butter croissant with a warm and flaky texture.",
            image: "/menu/bakery/croissant_sandwich.jpeg",
        },
        {
            name: "Strawberry Cream Donut",
            description: "Brioche Donut with a strawberry filling.",
            image: "/menu/bakery/donut.jpeg",
        },
        {
            name: "Mango Cream Donut",
            description: "Brioche Donut with a mango filling.",
            image: "/menu/bakery/donut.jpeg",
        },
        {
            name: "Cinnamon Roll",
            description: "Soft and fluffy cinnamon roll with a sweet and sticky cinnamon sugar filling.",
            image: "/menu/bakery/plain_donut.jpeg",
        },
        {
            name: "Scones",
            description: "Buttery scones with a sweet or savory filling.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Double Chocolate Muffin",
            description: "Chocolate muffin with extra chocolate chips.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Cookies",
            description: "Chocolate chip cookies with a crispy exterior and a soft, chewy center.",
            image: "/menu/bakery/chocolate_croissant.jpeg",
        },
        {
            name: "Chocolate Roll Cake",
            description: "Soft sponge rolled with rich chocolate cream—sliceable and indulgent.",
            image: "",
        },
        {
            name: "Tiramisu",
            description: "Layers of espresso-soaked sponge, mascarpone, and cocoa.",
            image: "",
        },
        {
            name: "Cheese Cake",
            description: "Creamy baked cheesecake with a buttery crust.",
            image: "",
        },
        {
            name: "Raspberry Heart Mousse",
            description: "Silky mousse with bright raspberry and a heart-shaped finish.",
            image: "",
        },
        {
            name: "Hazelnut Mousse Cake",
            description: "Light hazelnut mousse layered over sponge with a nutty, elegant finish.",
            image: "",
        },
    ],
    Food: [
        {
            name: "Breakfast Sandwich",
            description: "Bacon, egg, avocado and cheese on toasted croissant paired with a side salad and fresh seasonal fruits.",
            image: "/menu/food/breakfastsandwich.jpeg",
        },
        {
            name: "The Monroe",
            description: "Succulent, slow-cooked pulled pork topped with melted cheese and vine-ripened tomatoes, served alongside a crisp side salad and fresh seasonal fruit.",
            image: "/menu/food/theMonroe.jpeg",
        },
        {
            name: "The San Francisco",
            description: "Tender, herb-roasted beef stacked high with rich cheese and juicy tomato slices, perfectly paired with a refreshing garden salad and fresh seasonal fruits.",
            image: "/menu/food/theSanFrancisco.jpeg",
        },

        {
            name: "Mushroom on Ciabatta",
            description: "Mushroom on ciabatta with a side salad and fresh seasonal fruits.",
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
