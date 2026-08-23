import Image from "next/image";
import Link from "next/link";

import styles from "./TopHits.module.css";

const topHits = [
    {
        name: "Tiramisu Latte",
        description: "A tiramisu-inspired latte with cocoa and a creamy top.",
        image: "/menu/edited/drinks/tiramisu_latte.jpeg",
        imagePosition: "center",
    },
    {
        name: "Pistachio Croissant",
        description: "Flaky, filled with pistachio cream, and finished with crushed nuts.",
        image: "/menu/edited/food/pistachio-croissant-edited.jpeg",
        imagePosition: "center",
    },
    {
        name: "Iced Matcha Latte",
        description: "Ceremonial matcha with milk, served over ice.",
        image: "/menu/edited/drinks/coco_matcha.png",
        imagePosition: "center 58%",
    },
    {
        name: "Breakfast Sandwich",
        description: "Bacon, egg, avocado, and cheese on a toasted croissant.",
        image: "/menu/edited/food/breakfastsandwich-edited.jpeg",
        imagePosition: "center",
    },
    {
        name: "Tiramisu",
        description: "Espresso-soaked cake with mascarpone and cocoa.",
        image: "/menu/edited/food/tiramisu-edited.jpeg",
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
                                    sizes="(max-width: 700px) 72vw, (max-width: 1000px) 230px, 20vw"
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
