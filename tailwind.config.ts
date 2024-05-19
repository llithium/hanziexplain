import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            focus: "#e76464",
            primary: {
              "50": "#ffe5e5",
              "100": "#f9bbbb",
              "200": "#ef9090",
              "300": "#e76464",
              "400": "#df3939",
              "500": "#c62020",
              "600": "#9b1718",
              "700": "#6f0f11",
              "800": "#450708",
              "900": "#1e0000",
              DEFAULT: "#df3939",
            },
            secondary: {
              "50": "#e9e8ff",
              "100": "#bebbfb",
              "200": "#948ff1",
              "300": "#6a62ea",
              "400": "#4036e3",
              "500": "#261cc9",
              "600": "#1d169e",
              "700": "#130f72",
              "800": "#0a0846",
              "900": "#03021d",
              DEFAULT: "#4036e3",
            },
          },
        },
        dark: {
          // ...
          colors: {
            focus: "#df3939",
            primary: {
              "50": "#ffe5e5",
              "100": "#f9bbbb",
              "200": "#ef9090",
              "300": "#e76464",
              "400": "#df3939",
              "500": "#c62020",
              "600": "#9b1718",
              "700": "#6f0f11",
              "800": "#450708",
              "900": "#1e0000",
              DEFAULT: "#9b1718",
            },
            secondary: {
              "50": "#e9e8ff",
              "100": "#bebbfb",
              "200": "#948ff1",
              "300": "#6a62ea",
              "400": "#4036e3",
              "500": "#261cc9",
              "600": "#1d169e",
              "700": "#130f72",
              "800": "#0a0846",
              "900": "#03021d",
              DEFAULT: "#4036e3",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
