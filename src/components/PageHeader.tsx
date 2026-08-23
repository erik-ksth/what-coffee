import Image from "next/image";
import type { ReactNode } from "react";

import styles from "./PageHeader.module.css";

interface PageHeaderProps {
    title: string;
    titleAccent?: string;
    subtitle?: string;
    image: string;
    children?: ReactNode;
    imagePosition?: string;
}

export default function PageHeader({
    title,
    titleAccent,
    subtitle,
    image,
    children,
    imagePosition = "center",
}: PageHeaderProps) {
    return (
        <section className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    <h1>
                        {title}
                        {titleAccent && <span className={styles.titleAccent}>{titleAccent}</span>}
                    </h1>
                    {children && <div className={styles.supporting}>{children}</div>}
                </div>

                <figure className={styles.photo}>
                    <Image
                        src={image}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 800px) 100vw, 50vw"
                        style={{ objectPosition: imagePosition }}
                    />
                </figure>
            </div>
        </section>
    );
}
