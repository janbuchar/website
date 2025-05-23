import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Get rid of default tokens
  presets: [{ name: "my-preset", theme: { ...pandaPreset.theme, tokens: {} } }],

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  strictTokens: true,

  hash: true,

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          none: { value: "none" },
          polarNight1: { value: "#2e3440" },
          polarNight2: { value: "#3b4252" },
          polarNight3: { value: "#434c5e" },
          polarNight4: { value: "#4c566a" },
          snowStorm1: { value: "#d8dee9" },
          snowStorm2: { value: "#e5e9f0" },
          snowStorm3: { value: "#eceff4" },
          frost1: { value: "#8fbcbb" },
          frost2: { value: "#88c0d0" },
          frost3: { value: "#81a1c1" },
          frost4: { value: "#5e81ac" },
          red: { value: "#bf616a" },
          orange: { value: "#d08770" },
          yellow: { value: "#ebcb8b" },
          green: { value: "#a3be8c" },
          purple: { value: "#b48ead" },
          white: { value: "#fbfbfc" },
        },
        fonts: {
          normal: {
            value: [
              "-apple-system",
              "BlinkMacSystemFont",
              "Segoe UI",
              "Helvetica",
              "Arial",
              "sans-serif",
              "Apple Color Emoji",
              "Segoe UI Emoji",
              "Segoe UI Symbol",
            ],
          },
          monospace: {
            value: [
              "Fira Code",
              "Consolas",
              "Monaco",
              "Andale Mono",
              "Ubuntu Mono",
              "monospace",
            ],
          },
        },
        fontSizes: {
          small: { value: "0.8rem" },
          normal: { value: "1rem" },
          larger: { value: "1.25rem" },
          subheading: { value: "1.5rem" },
          heading: { value: "2rem" },
          pageTitle: { value: "2.5rem" },
          huge: { value: "3rem" },
        },
        fontWeights: {
          normal: { value: "normal" },
          bolder: { value: "600" },
        },
        spacing: {
          none: { value: "0rem" },
          tiny: { value: "0.2rem" },
          small: { value: "0.5rem" },
          medium: { value: "1rem" },
          bigger: { value: "1.5rem" },
          large: { value: "2rem" },
          "large-half": { value: "1rem" },
          extraLarge: { value: "3rem" },
        },
        lineHeights: {
          browserNormal: { value: "normal" },
          normal: { value: "1.5rem" },
          medium: { value: "2rem" },
        },
        radii: {
          small: { value: "3px" },
          large: { value: "8px" },
        },
        borderWidths: {
          thick: { value: "6px" },
        },
      },
    },
  },

  patterns: {
    extend: {
      verticalSpacing: {
        transform: () => ({
          marginTop: "medium",
          marginBottom: "medium",
          "&:last-child": {
            marginBottom: "unset",
          },
        }),
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
