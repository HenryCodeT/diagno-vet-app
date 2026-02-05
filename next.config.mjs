import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/i18n/request.ts", // Ruta a tu archivo de configuración
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  experimental: {
    outputFileTracingIncludes: {
      "/api/**": ["./node_modules/.prisma/client/**", "./src/generated/prisma/**"],
      "/**": ["./node_modules/.prisma/client/**", "./src/generated/prisma/**"],
    },
  },
};

export default withNextIntl(nextConfig);
