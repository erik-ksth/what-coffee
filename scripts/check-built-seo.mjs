import fs from "node:fs";
import path from "node:path";

const siteOrigin = "https://www.whatcoffeeandbakery.com";
const oldDomainPattern = /https?:\/\/(?:www\.)?whatcoffee\.com/i;
const appOutputDirectory = ".next/server/app";
const errors = [];

function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(entryPath) : [entryPath];
    });
}

function routeFromHtml(file) {
    let route = path.relative(appOutputDirectory, file).replaceAll(path.sep, "/");
    route = route.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
    return route ? `/${route}` : "/";
}

function normalizedUrl(url) {
    return url === `${siteOrigin}/` ? siteOrigin : url.replace(/\/$/, "");
}

if (!fs.existsSync(appOutputDirectory)) {
    console.error("Missing Next.js build output. Run `npm run build` before the SEO check.");
    process.exit(1);
}

const pageUrls = [];
const htmlFiles = walk(appOutputDirectory).filter((file) => {
    const name = path.basename(file);
    return name.endsWith(".html") && !name.startsWith("_");
});

for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const route = routeFromHtml(file);
    const expectedUrl = new URL(route, `${siteOrigin}/`).toString();
    const canonicalMatches = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    const openGraphMatches = [...html.matchAll(/<meta property="og:url" content="([^"]+)"/g)];
    const openGraphImageMatches = [
        ...html.matchAll(/<meta property="og:image" content="([^"]+)"/g),
    ];

    pageUrls.push(expectedUrl);

    if (canonicalMatches.length !== 1) {
        errors.push(`${route}: expected one canonical URL, found ${canonicalMatches.length}.`);
    } else if (normalizedUrl(canonicalMatches[0][1]) !== normalizedUrl(expectedUrl)) {
        errors.push(`${route}: canonical is ${canonicalMatches[0][1]}, expected ${expectedUrl}.`);
    }

    if (openGraphMatches.length !== 1) {
        errors.push(`${route}: expected one Open Graph URL, found ${openGraphMatches.length}.`);
    } else if (normalizedUrl(openGraphMatches[0][1]) !== normalizedUrl(expectedUrl)) {
        errors.push(
            `${route}: Open Graph URL is ${openGraphMatches[0][1]}, expected ${expectedUrl}.`
        );
    }

    if (openGraphImageMatches.length === 0) {
        errors.push(`${route}: missing an Open Graph image.`);
    } else if (!openGraphImageMatches[0][1].startsWith(`${siteOrigin}/`)) {
        errors.push(`${route}: Open Graph image must use the production domain.`);
    }

    if (oldDomainPattern.test(html)) {
        errors.push(`${route}: generated HTML still contains the old domain.`);
    }
}

const sitemapPath = path.join(appOutputDirectory, "sitemap.xml.body");
const robotsPath = path.join(appOutputDirectory, "robots.txt.body");

if (!fs.existsSync(sitemapPath)) {
    errors.push("Missing generated sitemap.xml.");
} else {
    const sitemap = fs.readFileSync(sitemapPath, "utf8");
    const sitemapUrls = new Set(
        [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
    );

    for (const pageUrl of pageUrls) {
        if (!sitemapUrls.has(normalizedUrl(pageUrl))) {
            errors.push(`Sitemap is missing ${normalizedUrl(pageUrl)}.`);
        }
    }

    if (oldDomainPattern.test(sitemap)) {
        errors.push("Generated sitemap still contains the old domain.");
    }
}

if (!fs.existsSync(robotsPath)) {
    errors.push("Missing generated robots.txt.");
} else {
    const robots = fs.readFileSync(robotsPath, "utf8");
    const expectedSitemap = `Sitemap: ${siteOrigin}/sitemap.xml`;

    if (!robots.includes(expectedSitemap)) {
        errors.push(`robots.txt must contain: ${expectedSitemap}`);
    }
    if (oldDomainPattern.test(robots)) {
        errors.push("Generated robots.txt still contains the old domain.");
    }
}

if (errors.length > 0) {
    console.error("SEO build checks failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
}

console.log(`Verified SEO output for ${htmlFiles.length} public pages.`);
