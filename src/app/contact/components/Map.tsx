import styles from "./Map.module.css";

const Map = () => {
    return (
        <section className={styles.section}>
            <h2>1002 Monroe Street</h2>

            <div className={styles.map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.7434633754633!2d-121.95097648806629!3d37.34858167197966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcbd89184a11d%3A0x57f526af1b0b1c0a!2sWhatCoffee%20%26%20Bakery!5e0!3m2!1sen!2sus!4v1767051729840!5m2!1sen!2sus"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WhatCoffee & Bakery Location"
                />
            </div>
        </section>
    );
};

export default Map;
