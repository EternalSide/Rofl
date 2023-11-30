/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["img.clerk.com"],
  },
};

module.exports = nextConfig;

("V — платформа, где авторы могут написать статью на любую тему и поделиться с ней, а читатели найти для себя что-то интересное. Next.js 13 FullStack App");
