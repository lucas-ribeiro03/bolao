const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000", // adjust if you are running on a different port
        pathname: "/**", // allows all paths
      },
    ],
  },
};

module.exports = nextConfig;
