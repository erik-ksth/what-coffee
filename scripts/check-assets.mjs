import fs from "node:fs";
import path from "node:path";

const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const imagePattern = /\/images\/[A-Za-z0-9_./-]+\.(?:jpeg|jpg|png|svg|webp)/g;

function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(entryPath) : [entryPath];
    });
}

const sourceFiles = walk("src").filter((file) => sourceExtensions.has(path.extname(file)));
const imageReferences = new Set(
    sourceFiles.flatMap((file) => fs.readFileSync(file, "utf8").match(imagePattern) ?? [])
);
const missingImages = [...imageReferences].filter(
    (reference) => !fs.existsSync(path.join("public", reference))
);

if (missingImages.length > 0) {
    console.error("Missing public image files:");
    missingImages.forEach((image) => console.error(`- ${image}`));
    process.exit(1);
}

console.log(`Verified ${imageReferences.size} public image references.`);
