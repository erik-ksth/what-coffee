import Image from "next/image";

import type { MenuItem } from "../menu-data";
import styles from "./MenuItemCard.module.css";

interface MenuItemCardProps {
    item: MenuItem;
    onOpen: (trigger: HTMLButtonElement) => void;
}

export default function MenuItemCard({ item, onOpen }: MenuItemCardProps) {
    const descriptionId = `menu-description-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
        <article className={styles.item}>
            <button
                type="button"
                className={styles.imageWrap}
                onClick={(event) => onOpen(event.currentTarget)}
                aria-label={`View ${item.name} photo full screen`}
                aria-describedby={item.description ? descriptionId : undefined}
                aria-haspopup="dialog"
            >
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
                    <span className={styles.description} id={descriptionId}>
                        {item.description}
                    </span>
                )}
            </button>

            <div className={styles.copy}>
                <h2>{item.name}</h2>
            </div>
        </article>
    );
}
