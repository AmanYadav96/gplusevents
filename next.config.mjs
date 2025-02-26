/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gplusevents.liveapi.page', 'www.gplusevents.com', 'i3.ytimg.com', 'tester.shortlinker.in','13.51.238.177','movihome.xyz'],
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false
  },
};
export default nextConfigfig
