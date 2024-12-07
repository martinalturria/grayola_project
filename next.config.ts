import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["example.com"],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        dirs: ["src"],
    },
};

export default nextConfig;
