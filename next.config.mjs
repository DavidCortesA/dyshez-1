/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://ynodavbxiqjzghylygyn.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ynodavbxiqjzghylygyn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/pictures/**',
      },
    ],
  }
};

export default nextConfig;
