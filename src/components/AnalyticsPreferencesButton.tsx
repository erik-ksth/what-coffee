"use client";

import { ANALYTICS_PREFERENCES_EVENT } from "@/lib/analytics";

type AnalyticsPreferencesButtonProps = {
    className?: string;
};

export default function AnalyticsPreferencesButton({ className }: AnalyticsPreferencesButtonProps) {
    return (
        <button
            className={className}
            type="button"
            onClick={() => window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT))}
        >
            Review analytics preferences
        </button>
    );
}
