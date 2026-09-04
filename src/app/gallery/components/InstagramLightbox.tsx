"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { InstagramPost, InstagramProfile } from "@/lib/instagram";
import styles from "./InstagramLightbox.module.css";

interface InstagramLightboxProps {
    posts: InstagramPost[];
    profile: InstagramProfile | null;
    selectedIndex: number;
    onSelect: (index: number) => void;
    onClose: () => void;
}

const slideVariants = {
    enter: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: reducedMotion ? 0 : 0.6,
        x: reducedMotion ? 0 : `${direction * 105}%`,
        scale: reducedMotion ? 1 : 0.92,
    }),
    center: {
        opacity: 1,
        x: "0%",
        scale: 1,
    },
    exit: ({ direction, reducedMotion }: { direction: number; reducedMotion: boolean }) => ({
        opacity: reducedMotion ? 0 : 0.6,
        x: reducedMotion ? 0 : `${direction * -105}%`,
        scale: reducedMotion ? 1 : 0.92,
    }),
};

export default function InstagramLightbox({
    posts,
    profile,
    selectedIndex,
    onSelect,
    onClose,
}: InstagramLightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [direction, setDirection] = useState(1);
    const post = posts[selectedIndex];
    const hasMultiple = posts.length > 1;

    const username = profile?.username || "whatcoffeeandbakery";
    const profileUrl = `https://www.instagram.com/${username}/`;
    const profilePic = profile?.profile_picture_url || "/images/brand/logo-mark.png";
    const canMovePrev = selectedIndex > 0;
    const canMoveNext = selectedIndex < posts.length - 1;

    const move = (step: -1 | 1) => {
        const targetIndex = selectedIndex + step;
        if (targetIndex < 0 || targetIndex >= posts.length) return;
        setDirection(step);
        onSelect(targetIndex);
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog?.showModal();

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key === "ArrowLeft" && canMovePrev) move(-1);
            if (event.key === "ArrowRight" && canMoveNext) move(1);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    if (!post) return null;

    const motionContext = { direction, reducedMotion: Boolean(shouldReduceMotion) };
    const imageUrl =
        post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url;

    return (
        <motion.dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-label="Instagram post preview"
            onCancel={(e) => {
                e.preventDefault();
                onClose();
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
        >
            {/* Navigation Buttons positioned at screen edges as in screenshot */}
            {canMovePrev && (
                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        move(-1);
                    }}
                    aria-label="Previous post"
                >
                    <ChevronLeft size={26} strokeWidth={2.4} />
                </button>
            )}

            {canMoveNext && (
                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        move(1);
                    }}
                    aria-label="Next post"
                >
                    <ChevronRight size={26} strokeWidth={2.4} />
                </button>
            )}

            <button
                type="button"
                className={styles.closeBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close preview"
            >
                <X size={26} strokeWidth={2.4} />
            </button>

            <div className={styles.viewerWrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.stage}>
                    <AnimatePresence initial={false} mode="popLayout" custom={motionContext}>
                        <motion.div
                            key={post.id}
                            className={styles.container}
                            custom={motionContext}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 0.8,
                            }}
                            drag={shouldReduceMotion ? false : "x"}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -60 || info.velocity.x < -400) {
                                    if (canMoveNext) move(1);
                                } else if (info.offset.x > 60 || info.velocity.x > 400) {
                                    if (canMovePrev) move(-1);
                                }
                            }}
                        >
                            {/* Media Area */}
                            <div className={styles.mediaStage}>
                                <div className={styles.mediaFrame}>
                                    <Image
                                        src={imageUrl}
                                        alt={post.caption?.slice(0, 100) || "Instagram post"}
                                        fill
                                        priority
                                        sizes="(max-width: 820px) 100vw, 650px"
                                        className={styles.image}
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Content Sidebar */}
                            <div className={styles.sidebar}>
                                {/* Header */}
                                <div className={styles.header}>
                                    <a
                                        href={profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.profileLink}
                                    >
                                        <div className={styles.avatarWrapper}>
                                            <Image
                                                src={profilePic}
                                                alt={username}
                                                width={48}
                                                height={48}
                                                className={styles.avatarImage}
                                            />
                                        </div>
                                        <span className={styles.username}>{username}</span>
                                    </a>

                                    <a
                                        href={profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.followButton}
                                    >
                                        Follow
                                    </a>
                                </div>

                                {/* Caption Area */}
                                <div className={styles.captionArea}>
                                    {post.caption ? (
                                        <p className={styles.captionText}>{post.caption}</p>
                                    ) : (
                                        <p className={styles.emptyCaption}>No caption provided.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.dialog>
    );
}
