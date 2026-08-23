import Script from "next/script";

import styles from "./InstagramSection.module.css";

const InstagramSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.heading}>
                <h2>Latest from Instagram.</h2>
                <a
                    href="https://www.instagram.com/whatcoffeeandbakery"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @whatcoffeeandbakery
                </a>
            </div>

            <div
                data-key="Carousel Instagram Feed "
                className={`ft ${styles.feed}`}
                id="ftp4ggqumh"
            />
            <Script src="https://wdg.fouita.com/widgets/0x3895b7.js" strategy="lazyOnload" />
        </section>
    );
};

export default InstagramSection;
