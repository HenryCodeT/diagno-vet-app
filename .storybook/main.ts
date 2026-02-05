import type { StorybookConfig } from "@storybook/nextjs";

// Konfigurasi Story Book
const config: StorybookConfig = {
  // Membaca semua file yang include ".stories"
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  // Menambahkan plugin
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  // Memberitahu config framework yang digunakan
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  // Direktori yang static
  staticDirs: ["..\\public"],
};
export default config;
