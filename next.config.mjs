/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medical-dashboard-api.onrender.com',
        port: '',
        pathname: '/**',
      },

      // TODO: update config images later
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
