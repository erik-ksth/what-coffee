import Link from "next/link";

import styles from "./Testimonials.module.css";

interface Review {
    name: string;
    rating: number;
    text: string;
    link: string;
    source: "Google Maps" | "Yelp";
    tone: "paper" | "peach" | "ink";
}

const googleMapsListing = "https://maps.app.goo.gl/k7j3PC34rzGNvbjWA";

const reviews: Review[] = [
    {
        name: "F Lee",
        rating: 5,
        text: "The pastry is soo good. Tried their pistachio croissant—the taste is so rich and not too sweet. I definitely will come back.",
        link: "https://maps.app.goo.gl/w8T2dbTGHY4RY8339",
        source: "Google Maps",
        tone: "paper",
    },
    {
        name: "VIX",
        rating: 4,
        text: "The latte was pretty good and my husband devoured the swiss roll. Loved the coffee and cafe.",
        link: "https://maps.app.goo.gl/pj3aaifnbyR2NzJX9",
        source: "Google Maps",
        tone: "peach",
    },
    {
        name: "Katia L. Rivera",
        rating: 4,
        text: "We tried both the chocolate croissant and almond croissant—and they were phenomenal.",
        link: "https://maps.app.goo.gl/fcQSwW8CczLgvCvP9",
        source: "Google Maps",
        tone: "ink",
    },
    {
        name: "Sydney A.",
        rating: 5,
        text: "Smooth coffee, a clean and bright room, and kind service made this an easy place to settle in and work.",
        link: "https://www.yelp.com/biz/whatcoffee-santa-clara-2?hrid=IF0tqKSnigPYjU5QapbLHA&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
        source: "Yelp",
        tone: "ink",
    },
    {
        name: "Kate A.",
        rating: 4,
        text: "A cozy corner cafe with good tiramisu, friendly service, and the small details that make a neighborhood spot feel welcoming.",
        link: "https://www.yelp.com/biz/whatcoffee-santa-clara-2?hrid=M1ZWrWWirM-ktLq6PIMjvw&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
        source: "Yelp",
        tone: "paper",
    },
    {
        name: "Kyle S.",
        rating: 5,
        text: "The house-roasted beans stood out, and the honey-cinnamon latte tasted balanced rather than overly sweet.",
        link: "https://www.yelp.com/biz/whatcoffee-santa-clara-2?hrid=rR7oelK6N4y5VpwGfwlg9Q&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
        source: "Yelp",
        tone: "peach",
    },
];

function Stars({ rating }: { rating: number }) {
    return (
        <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty}>
                    ★
                </span>
            ))}
        </span>
    );
}

export default function Testimonials() {
    return (
        <section className={styles.section} aria-labelledby="reviews-heading">
            <div className={styles.inner}>
                <div className={styles.heading}>
                    <h2 id="reviews-heading">
                        Customer <em>reviews</em>
                    </h2>
                    {/* <p>Three from Google Maps. Three from Yelp.</p> */}
                </div>

                <div className={styles.reviews}>
                    {reviews.map((review) => (
                        <Link
                            href={review.link}
                            target="_blank"
                            rel="noreferrer"
                            key={review.name}
                            className={`${styles.review} ${styles[review.tone]}`}
                            aria-label={`Read ${review.name}'s review on ${review.source}`}
                        >
                            <div className={styles.reviewMeta}>
                                <Stars rating={review.rating} />
                                <span>{review.source}</span>
                            </div>
                            <blockquote>{review.text}</blockquote>
                            <footer>
                                <strong>{review.name}</strong>
                                <span>Read review</span>
                            </footer>
                        </Link>
                    ))}
                </div>

                {/* <div className={styles.moreLinks}>
                    <Link
                        href={googleMapsListing}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.moreLink}
                    >
                        More on Google
                    </Link>
                    <Link
                        href="https://www.yelp.com/biz/whatcoffee-santa-clara-2"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.moreLink} ${styles.moreLinkSecondary}`}
                    >
                        More on Yelp
                    </Link>
                </div> */}
            </div>
        </section>
    );
}
