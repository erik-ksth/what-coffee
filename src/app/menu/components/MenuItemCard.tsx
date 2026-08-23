import Image from "next/image";

import type { MenuItem } from "../menu-data";
import styles from "./MenuItemCard.module.css";

interface MenuItemCardProps {
    item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
    const descriptionId = `menu-description-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
        <article
            className={styles.item}
            tabIndex={item.description ? 0 : undefined}
            aria-describedby={item.description ? descriptionId : undefined}
        >
            <div className={styles.imageWrap}>
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    />
                ) : (
                    <span>Photo coming soon</span>
                )}

                {item.description && (
                    <p className={styles.description} id={descriptionId} role="tooltip">
                        {item.description}
                    </p>
                )}
            </div>

            <div className={styles.copy}>
                <h2>{item.name}</h2>
            </div>
        </article>
    );
}
