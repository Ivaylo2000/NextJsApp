/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "next-js-app-backend.vercel.app",
      "localhost",
      "storage.googleapis.com",
      "firebasestorage.googleapis.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
