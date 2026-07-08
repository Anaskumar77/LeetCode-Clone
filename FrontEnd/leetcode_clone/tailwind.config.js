/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary": "#c0c1ff",
        "on-primary-container": "#3c1989",
        "on-surface-variant": "#cac4d4",
        "on-tertiary-fixed": "#07006c",
        "on-tertiary": "#1000a9",
        "outline-variant": "#494552",
        "secondary-fixed-dim": "#bdc7d9",
        "surface-tint": "#cebdff",
        "surface-container": "#201f20",
        "surface-bright": "#39393a",
        "inverse-primary": "#674bb5",
        "primary": "#cebdff",
        "outline": "#948e9d",
        "secondary-fixed": "#d9e3f6",
        "surface-variant": "#353436",
        "on-error": "#690005",
        "inverse-on-surface": "#313031",
        "surface-container-highest": "#353436",
        "surface": "#131314",
        "surface-dim": "#131314",
        "on-secondary-fixed": "#121c2a",
        "secondary": "#bdc7d9",
        "error-container": "#93000a",
        "surface-container-low": "#1c1b1c",
        "on-secondary-fixed-variant": "#3d4756",
        "inverse-surface": "#e5e2e3",
        "on-secondary": "#27313f",
        "surface-container-lowest": "#0e0e0f",
        "on-secondary-container": "#afb9cb",
        "on-primary": "#381385",
        "on-tertiary-fixed-variant": "#2f2ebe",
        "on-error-container": "#ffdad6",
        "tertiary-fixed": "#e1e0ff",
        "on-background": "#e5e2e3",
        "on-tertiary-container": "#160bae",
        "primary-fixed": "#e8ddff",
        "on-primary-fixed-variant": "#4f319c",
        "on-surface": "#e5e2e3",
        "tertiary-fixed-dim": "#c0c1ff",
        "tertiary-container": "#8f92ff",
        "background": "#131314",
        "error": "#ffb4ab",
        "on-primary-fixed": "#21005e",
        "secondary-container": "#404a59",
        "surface-container-high": "#2a2a2b",
        "primary-container": "#a78bfa",
        "primary-fixed-dim": "#cebdff"
      },
      borderRadius: {
        "DEFAULT": "8px",
        "lg": "12px",
        "xl": "16px",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "unit": "4px",
        "gutter": "24px",
        "container-padding": "32px"
      },
      fontFamily: {
        "body-md": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "headline-xl": ["Geist", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "label-sm": ["Geist", "sans-serif"]
      },
      fontSize: {
        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "500" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-sm": ["12px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "500" }]
      }
    }
  },
  plugins: [],
}
