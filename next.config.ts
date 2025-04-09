import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ["http://localhost:3000"], // Cambia esto según tu entorno
  },
};

export default nextConfig;
