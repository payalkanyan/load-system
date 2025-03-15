/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "connect-src 'self' ws://localhost:5000 http://localhost:5000;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
