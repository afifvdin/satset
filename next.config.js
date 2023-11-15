/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  env: {
    BASE_API:
      "https://asia-southeast1-tim-riset-bu-rima.cloudfunctions.net/satset",
  },
}

module.exports = nextConfig
