import Image from "next/image";
import Link from "next/link";

import styles from "./CraftBento.module.css";

export default function CraftBento() {
    return (
        <section className={styles.section} aria-labelledby="craft-heading">
            <div className={styles.inner}>
                <div className={styles.heading}>
                    <h2 id="craft-heading">
                        <span>Coffee, pastries, and</span> <em>catering.</em>
                    </h2>
                    <p>We make all three here in Santa Clara.</p>
                </div>

                <div className={styles.grid}>
                    <article className={`${styles.card} ${styles.featureCard}`}>
                        <div className={`${styles.featureImage} ${styles.coffeeImage}`}>
                            <Image
                                src="/roaster12.jpeg"
                                alt="What Coffee beans beside the in-house roaster"
                                fill
                                sizes="(max-width: 700px) 100vw, 50vw"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.featureBody}>
                            <h3>House-roasted coffee</h3>
                            <p>We roast our beans here and make every drink to order.</p>
                        </div>
                    </article>

                    <article className={`${styles.card} ${styles.featureCard}`}>
                        <div className={styles.featureImage}>
                            <Image
                                src="/aesthetic-pastries.jpeg"
                                alt="Fresh pastries made by the What Coffee bakery"
                                fill
                                sizes="(max-width: 700px) 100vw, 50vw"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.featureBody}>
                            <h3>Fresh pastries</h3>
                            <p>Croissants, donuts, and more, baked every morning.</p>
                        </div>
                    </article>

                    <article className={`${styles.card} ${styles.cateringCard}`}>
                        <div className={styles.cateringBody}>
                            <div>
                                <h3>Coffee and pastry catering</h3>
                                <p>
                                    For meetings, parties, and events. We can bring everything to
                                    you or host you at the café.
                                </p>
                            </div>
                            <Link href="/contact" className={styles.action}>
                                Ask about catering
                            </Link>
                        </div>
                        <div className={styles.cateringImage}>
                            <Image
                                src="/cafeinside.jpeg"
                                alt="A busy gathering inside What Coffee"
                                fill
                                sizes="(max-width: 700px) 100vw, 58vw"
                                className={styles.image}
                            />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
