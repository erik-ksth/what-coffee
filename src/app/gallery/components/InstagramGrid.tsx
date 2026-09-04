"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import type { InstagramPost, InstagramProfile } from "@/lib/instagram";
import InstagramLightbox from "./InstagramLightbox";
import styles from "./InstagramSection.module.css";

interface InstagramGridProps {
    posts: InstagramPost[];
    profile: InstagramProfile | null;
}

export default function InstagramGrid({ posts, profile }: InstagramGridProps) {
    const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

    return (
        <>
            <div className={styles.grid}>
                {posts.map((post, index) => {
                    const imageUrl =
                        post.media_type === "VIDEO" && post.thumbnail_url
                            ? post.thumbnail_url
                            : post.media_url;

                    return (
                        <button
                            key={post.id}
                            type="button"
                            onClick={() => setSelectedPostIndex(index)}
                            className={styles.card}
                            aria-label={
                                post.caption
                                    ? `View post: ${post.caption.slice(0, 50)}`
                                    : "View Instagram post"
                            }
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={imageUrl}
                                    alt={
                                        post.caption?.slice(0, 100) || "What Coffee Instagram Post"
                                    }
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className={styles.image}
                                />
                                {post.caption && (
                                    <div className={styles.overlay}>
                                        <p className={styles.caption}>
                                            {post.caption.length > 120
                                                ? `${post.caption.slice(0, 120)}...`
                                                : post.caption}
                                        </p>
                                    </div>
                                )}
                                {post.media_type === "VIDEO" && (
                                    <div className={styles.badge} title="Video">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="16"
                                            height="16"
                                        >
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                )}
                                {post.media_type === "CAROUSEL_ALBUM" && (
                                    <div className={styles.badge} title="Carousel">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="16"
                                            height="16"
                                        >
                                            <rect x="2" y="2" width="16" height="16" rx="2" />
                                            <path d="M6 18h14a2 2 0 0 0 2-2V6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedPostIndex !== null && (
                    <InstagramLightbox
                        posts={posts}
                        profile={profile}
                        selectedIndex={selectedPostIndex}
                        onSelect={setSelectedPostIndex}
                        onClose={() => setSelectedPostIndex(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
