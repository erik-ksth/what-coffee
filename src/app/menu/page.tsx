"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type MenuCategory = "Drinks" | "Bakery" | "Food" | "Beans";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
  Drinks: [
    {
      name: "Honey Lavender Latte",
      description: "Double-shot espresso, lavender syrup, oat milk.",
      price: "$6.50",
      tag: "Signature",
    },
    {
      name: "Cardamom Cold Brew",
      description: "24h steep, cardamom bitters, vanilla foam.",
      price: "$5.50",
    },
    {
      name: "Spiced Mocha",
      description: "Single-origin cocoa, cayenne, cinnamon, milk.",
      price: "$6.00",
    },
  ],
  Bakery: [
    {
      name: "Orange Olive Oil Cake",
      description: "Candied citrus, vanilla glaze.",
      price: "$5.00",
    },
    {
      name: "Savory Herb Scone",
      description: "Gruyère, dill, pickled shallot butter.",
      price: "$4.50",
    },
    {
      name: "Brown Butter Croissant",
      description: "72h laminated dough, toasted almonds.",
      price: "$4.25",
    },
  ],
  Food: [
    {
      name: "Smoked Salmon Tartine",
      description: "Seeded sourdough, labneh, fennel fronds.",
      price: "$12.00",
    },
    {
      name: "Harissa Breakfast Bowl",
      description: "Farro, charred greens, poached egg.",
      price: "$11.00",
      tag: "Chef's pick",
    },
    {
      name: "Avocado Crunch Toast",
      description: "Pickled radish, chili oil, pepitas.",
      price: "$10.00",
    },
  ],
  Beans: [
    {
      name: "Andean Bloom",
      description: "Peru • plum, honey, cocoa nib.",
      price: "$18 / 12oz",
    },
    {
      name: "Midnight Lull",
      description: "Decaf • Swiss water • dark chocolate.",
      price: "$17 / 12oz",
    },
    {
      name: "Sunrise Circuit",
      description: "Ethiopia • jasmine, peach, bergamot.",
      price: "$19 / 12oz",
      tag: "Limited",
    },
  ],
};

const CATEGORIES: Array<"All" | MenuCategory> = [
  "All",
  "Drinks",
  "Bakery",
  "Food",
  "Beans",
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const visibleCategories = useMemo(
    () =>
      selectedCategory === "All"
        ? (Object.keys(MENU_ITEMS) as MenuCategory[])
        : [selectedCategory],
    [selectedCategory]
  );

  return (
    <div className="flex flex-col gap-12 pb-20">
      <section
        className="relative isolate h-[520px] w-screen overflow-hidden bg-neutral-900 text-white"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: "-1px",
        }}
      >
        <Image
          src="/menu_bg.jpg"
          alt="Selection of brunch items and coffee"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center gap-6 px-6 md:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-200">
            Menu
          </p>
          <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
            Your Favorites,
            <br />
            Ready When You Are
          </h1>
          <p className="max-w-xl text-lg text-orange-50/80">
            Browse our seasonal drinks and chef-inspired pairings, then place
            your order so it’s hot and waiting when you arrive.
          </p>
          <button className="w-fit rounded-full bg-orange-400 px-8 py-3 text-base font-semibold text-[#522100] transition hover:bg-orange-300">
            Order Online
          </button>
        </div>
      </section>

      <div className="container mx-auto flex flex-col gap-12 px-4">
        <div className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 shadow-sm">
          {CATEGORIES.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-stone-900 text-white shadow"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-16">
          {visibleCategories.map((category) => (
            <section key={category} className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
                    Curated
                  </p>
                  <h2 className="text-3xl font-semibold text-stone-900">
                    {category}
                  </h2>
                </div>
                <button className="order-first inline-flex items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 transition hover:border-stone-900 sm:order-none">
                  Order Online
                  <span aria-hidden>&rsaquo;</span>
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MENU_ITEMS[category as MenuCategory].map((item) => (
                  <article
                    key={item.name}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs uppercase tracking-[0.4em] text-stone-400">
                        <span>Image</span>
                        <span>Coming Soon</span>
                      </div>
                      {item.tag && (
                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                          {item.tag}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-5 py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-stone-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-stone-500">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-base font-semibold text-[#ec814e]">
                          {item.price}
                        </span>
                      </div>
                      <button className="mt-auto w-fit rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-stone-700">
                        Order
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
