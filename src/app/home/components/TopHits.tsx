import Image from "next/image";
import Link from "next/link";

import styles from "./TopHits.module.css";

const topHits = [
    {
        name: "Tiramisu Latte",
        description: "A tiramisu-inspired latte with cocoa and a creamy top.",
        image: "/images/menu/drinks/edited/tiramisu-latte.jpeg",
        imagePosition: "center",
    },
    {
        name: "Pistachio Croissant",
        description: "Flaky, filled with pistachio cream, and finished with crushed nuts.",
        image: "/images/menu/food/edited/pistachio-croissant.jpeg",
        imagePosition: "center",
    },
    {
        name: "Iced Matcha Latte",
        description: "Ceremonial matcha with milk, served over ice.",
        image: "/images/menu/drinks/edited/matcha-latte-creamy.png",
        imagePosition: "center 58%",
    },
    {
        name: "Breakfast Sandwich",
        description: "Bacon, egg, avocado, and cheese on a toasted croissant.",
        image: "/images/menu/food/edited/breakfast-sandwich.jpeg",
        imagePosition: "center",
    },
    {
        name: "Tiramisu",
        description: "Espresso-soaked cake with mascarpone and cocoa.",
        image: "/images/menu/food/edited/tiramisu.jpeg",
        imagePosition: "center",
    },
];

export default function TopHits() {
    return (
        <section className={styles.section} aria-labelledby="top-hits-heading">
            <div className={styles.inner}>
                <header className={styles.heading}>
                    <h2 id="top-hits-heading">
                        Our most popular <em>picks.</em>
                    </h2>
                    <p>A short list of what people ask for most.</p>
                </header>

                <div className={styles.grid}>
                    {topHits.map((item) => (
                        <article className={styles.card} key={item.name}>
                            <div className={styles.imageWrap}>
                                <Image
                                    src={item.image}
                                    alt={item.description}
                                    fill
                                    sizes="(max-width: 700px) calc(100vw - 2rem), (max-width: 1000px) 230px, 20vw"
                                    className={styles.image}
                                    style={{ objectPosition: item.imagePosition }}
                                />
                            </div>

                            <div className={styles.cardBody}>
                                <h3>{item.name}</h3>
                                <p className={styles.visuallyHidden}>{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className={styles.footer}>
                    <Link href="/menu" className={styles.action}>
                        See the full menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
