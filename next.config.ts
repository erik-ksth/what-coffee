import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "whatcoffeeandbakery.com" }],
                destination: "https://www.whatcoffeeandbakery.com/:path*",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "unsplash.com",
            },
        ],
    },
};

export default nextConfig;
