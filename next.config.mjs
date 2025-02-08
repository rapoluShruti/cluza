/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()", // Disable FLoC tracking
          },
        ],
      },
    ];
  },
  reactStrictMode: true, // Ensure React strict mode is enabled
  swcMinify: true, // Improve performance in production
};

export default nextConfig;
