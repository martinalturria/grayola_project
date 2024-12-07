import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#0070f3",
                secondary: "#1a1a1a",
            },
            fontFamily: {
                sans: ['"Inter"', "sans-serif"],
                mono: ['"Fira Code"', "monospace"],
            },
            spacing: {
                18: "4.5rem",
            },
        },
    },
    plugins: [],
} satisfies Config;
