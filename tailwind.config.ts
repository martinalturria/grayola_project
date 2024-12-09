import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    
    theme: {
        extend: {
            colors: {
                background: "#F9FAFB",
                foreground: "#1F2937",
                primary: "#3B82F6",
                secondary: "#1E3A8A",
                accent: "#10B981",
                warning: "#F59E0B",
                error: "#EF4444",
            },
            fontFamily: {
                sans: ['"Poppins"', "sans-serif"],
                secondary: ['"Roboto"', "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
