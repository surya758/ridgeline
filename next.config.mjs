/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Boat photos are served via the API's asset resolver (stable URLs that
    // 302 to Azure blob storage). Allow the API hosts + blob storage directly.
    remotePatterns: [
      { protocol: 'https', hostname: 'api.phoenixrisingai.com' },
      { protocol: 'https', hostname: 'phoenix-rising-ai-api-prod.azurewebsites.net' },
      { protocol: 'https', hostname: '**.blob.core.windows.net' },
      // Local/dev API
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default nextConfig;
