import { getInstagramData } from "@/lib/instagram";
import InstagramGrid from "./InstagramGrid";
import styles from "./InstagramSection.module.css";

export default async function InstagramSection() {
    const { profile, posts } = await getInstagramData(12);
    const username = profile?.username || "whatcoffeeandbakery";
    const profileUrl = `https://www.instagram.com/${username}`;

    return (
        <section className={styles.section}>
            <div className={styles.heading}>
                <div>
                    <h2>Latest from Instagram.</h2>
                </div>
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.igHandle}
                >
                    @{username}
                </a>
            </div>

            {posts.length > 0 ? (
                <InstagramGrid posts={posts} profile={profile} />
            ) : (
                <div className={styles.emptyState}>
                    <p>Check out our latest photos directly on Instagram</p>
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryButton}
                    >
                        Visit @{username}
                    </a>
                </div>
            )}
        </section>
    );
}
