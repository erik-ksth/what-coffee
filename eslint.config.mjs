// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Prettier integration
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
    ...nextVitals,
    ...nextTs,

    // Override Next.js default ignores
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

    // Add Prettier plugin + recommended settings
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            // Show Prettier errors as ESLint errors
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    useTabs: false,
                },
            ],
        },
    },

    // Disable rules that conflict with Prettier
    prettier,
]);
