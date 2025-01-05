/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_url: process.env.API_url,
    JWT_SECRET: process.env.JWT_SECRET
  },
};

module.exports = nextConfig;
