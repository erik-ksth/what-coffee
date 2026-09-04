"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GOOGLE_ANALYTICS_ID } from "@/config/analytics";
import { ANALYTICS_PREFERENCES_EVENT, trackAnalyticsEvent } from "@/lib/analytics";

import styles from "./GoogleAnalytics.module.css";

const CONSENT_STORAGE_KEY = "what-coffee-analytics-consent";

type ConsentChoice = "granted" | "denied" | null;

function initializeGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
        window.gtag ||
        function gtag(...args: unknown[]) {
            window.dataLayer?.push(args);
        };
}

function updateGoogleConsent(choice: Exclude<ConsentChoice, null>) {
    initializeGoogleTag();
    window.gtag?.("consent", "update", {
        analytics_storage: choice,
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    });
}

function removeAnalyticsCookies() {
    const cookieNames = document.cookie
        .split(";")
        .map((cookie) => cookie.split("=")[0]?.trim())
        .filter((name) => name === "_ga" || name?.startsWith("_ga_"));

    for (const name of cookieNames) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.whatcoffeeandbakery.com; SameSite=Lax`;
    }
}

function getTrackedClick(
    anchor: HTMLAnchorElement
): { name: string; parameters: Record<string, string> } | null {
    const href = anchor.getAttribute("href") || "";

    if (href.startsWith("tel:")) return { name: "phone_click", parameters: {} };
    if (href.startsWith("mailto:")) return { name: "email_click", parameters: {} };

    let url: URL;
    try {
        url = new URL(anchor.href);
    } catch {
        return null;
    }

    if (
        url.hostname === "maps.app.goo.gl" ||
        url.hostname === "maps.google.com" ||
        (url.hostname === "www.google.com" && url.pathname.startsWith("/maps"))
    ) {
        return { name: "directions_click", parameters: {} };
    }

    if (url.hostname === "www.clover.com" || url.hostname === "clover.com") {
        return {
            name: "online_order_click",
            parameters: { provider: "clover" },
        };
    }

    if (url.hostname.endsWith("instagram.com")) {
        return { name: "social_click", parameters: { network: "instagram" } };
    }

    if (url.hostname.endsWith("tiktok.com")) {
        return { name: "social_click", parameters: { network: "tiktok" } };
    }

    return null;
}

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const lastTrackedPage = useRef<string | null>(null);
    const [consent, setConsent] = useState<ConsentChoice>(null);
    const [isBannerOpen, setIsBannerOpen] = useState(false);
    const [isTagReady, setIsTagReady] = useState(false);

    useEffect(() => {
        const restoreSavedChoice = window.setTimeout(() => {
            const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);

            if (savedChoice === "granted" || savedChoice === "denied") {
                setConsent(savedChoice);
                if (savedChoice === "granted") updateGoogleConsent("granted");
            } else {
                setIsBannerOpen(true);
            }
        }, 0);

        const openPreferences = () => setIsBannerOpen(true);
        window.addEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);

        return () => {
            window.clearTimeout(restoreSavedChoice);
            window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
        };
    }, []);

    useEffect(() => {
        if (consent !== "granted" || !isTagReady) return;

        const pagePath = `${pathname}${window.location.search}`;
        if (lastTrackedPage.current === pagePath) return;

        lastTrackedPage.current = pagePath;
        trackAnalyticsEvent("page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: pagePath,
        });
    }, [consent, isTagReady, pathname]);

    useEffect(() => {
        if (consent !== "granted" || !isTagReady) return;

        const trackClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;

            const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
            if (!anchor) return;

            const trackedClick = getTrackedClick(anchor);
            if (!trackedClick) return;

            trackAnalyticsEvent(trackedClick.name, {
                ...trackedClick.parameters,
                page: pathname,
            });
        };

        document.addEventListener("click", trackClick);
        return () => document.removeEventListener("click", trackClick);
    }, [consent, isTagReady, pathname]);

    const saveChoice = (choice: Exclude<ConsentChoice, null>) => {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
        updateGoogleConsent(choice);
        setConsent(choice);
        setIsBannerOpen(false);

        if (choice === "denied") {
            setIsTagReady(false);
            lastTrackedPage.current = null;
            removeAnalyticsCookies();
        }
    };

    const handleTagReady = () => {
        initializeGoogleTag();
        updateGoogleConsent("granted");
        window.gtag?.("js", new Date());
        window.gtag?.("config", GOOGLE_ANALYTICS_ID, {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
        });
        setIsTagReady(true);
    };

    return (
        <>
            {consent === "granted" ? (
                <Script
                    id="google-analytics"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
                    strategy="afterInteractive"
                    onReady={handleTagReady}
                />
            ) : null}

            {isBannerOpen ? (
                <section className={styles.banner} aria-label="Analytics preferences">
                    <div className={styles.copy}>
                        <h2>Help us improve the website</h2>
                        <p>
                            With your permission, we use Google Analytics to understand which pages
                            and café links are useful. We don&apos;t send your contact-form details.
                            See our <Link href="/privacy">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={styles.decline}
                            type="button"
                            onClick={() => saveChoice("denied")}
                        >
                            Decline
                        </button>
                        <button
                            className={styles.accept}
                            type="button"
                            onClick={() => saveChoice("granted")}
                        >
                            Allow analytics
                        </button>
                    </div>
                </section>
            ) : null}
        </>
    );
}
