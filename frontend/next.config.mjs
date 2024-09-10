/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "localhost"], // Add other domains if needed
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
