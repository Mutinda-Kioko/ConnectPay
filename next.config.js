/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "pbs.twimg.com",
      "i.pravatar.cc",
      "abs.twimg.com",
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.DEPLOY_PRIME_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}
