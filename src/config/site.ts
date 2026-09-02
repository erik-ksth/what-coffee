export const SITE_URL = "https://www.whatcoffeeandbakery.com";

export const SOCIAL_IMAGE = {
    url: `${SITE_URL}/images/site/interiors/coffee-santa-clara-main.jpeg`,
    width: 1200,
    height: 630,
    alt: "What Coffee - Artisan Coffee Shop",
};

export function absoluteUrl(path = "/"): string {
    return new URL(path, `${SITE_URL}/`).toString();
}
