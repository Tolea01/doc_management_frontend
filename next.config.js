/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_url: process.env.API_url,
  },
};

module.exports = nextConfig;
