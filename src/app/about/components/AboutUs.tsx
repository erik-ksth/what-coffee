import Image from "next/image";

import styles from "./About.module.css";

export default function AboutUs() {
    return (
        <section className={styles.story}>
            <div className={styles.storyInner}>
                <div className={styles.storyCopy}>
                    <h2>
                        <span className={styles.dreamLine}>A dream</span>
                        <span className={styles.brewedLine}>brewed to life.</span>
                    </h2>
                    <p className={styles.lead}>What Coffee began with a young woman and a dream.</p>
                    <p>
                        She came to the United States as a teenager with her family, who opened a
                        small coffee roastery and bakery. There, she learned the rhythms of roasting
                        beans, baking pastries, and welcoming people across the counter.
                    </p>
                    <p>
                        Coffee became more than a drink. It became a way to connect, build
                        community, and share warmth.
                    </p>
                    <p>
                        That idea became What Coffee Roastery &amp; Bakery—a Santa Clara café for
                        carefully made coffee, fresh pastries, and time together.
                    </p>
                </div>

                <figure className={styles.portrait}>
                    <Image
                        src="/images/site/about/mural.jpeg"
                        alt="The colorful mural inside What Coffee"
                        fill
                        sizes="(max-width: 800px) 100vw, 42vw"
                    />
                </figure>
            </div>
        </section>
    );
}
