/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
          {
            protocol: 'https',
            hostname: 'coelmxycwtbhxuyvluav.supabase.co',
          },
        ],
      },
};

export default nextConfig;
