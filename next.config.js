/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // typescript: { ignoreBuildErrors: true },
  // swcMinify: true,
  // compiler: {
  //   styledComponents: true,
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/mercadao',
  //       permanent: false,
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
