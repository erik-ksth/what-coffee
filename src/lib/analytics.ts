export const ANALYTICS_PREFERENCES_EVENT = "what-coffee:open-analytics-preferences";

type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters = {}) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", eventName, parameters);
}
