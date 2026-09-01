import Image from "next/image";

import styles from "./About.module.css";

export default function Background() {
    return (
        <section className={styles.belief}>
            <div className={styles.beliefInner}>
                <figure className={styles.widePhoto}>
                    <Image
                        src="/images/site/interiors/entrance.png"
                        alt="Guests gathered outside the entrance to What Coffee"
                        fill
                        sizes="(max-width: 800px) 100vw, 58vw"
                    />
                </figure>

                <div className={styles.beliefCopy}>
                    <h2>
                        Coffee makes room for <em>connection.</em>
                    </h2>
                    <p>
                        The perfect cup is only half the story. The other half is the space it
                        creates for conversations, ideas, and familiar faces.
                    </p>
                    <p>
                        We care about quality without making it complicated. Every guest should feel
                        like a local from the first visit.
                    </p>
                </div>
            </div>
        </section>
    );
}
