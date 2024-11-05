/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com;;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://fcmregistrations.googleapis.com https://firebaseinstallations.googleapis.com https://www.googleapis.com https://www.gstatic.com translate.googleapis.com translate.google.com *.google.com *.gstatic.com chrome-extension://bocbaocobfecmglnmeaeppambideimao/ https://dev.perlinks.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`;

const nextConfig = {
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['react-hook-form'],
  },
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medical-dashboard-api.onrender.com',
        port: '',
        pathname: '/**',
      },
      // TODO: this code to run in local, will remove later
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=86400; includeSubDomains;',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};
export default nextConfig;
