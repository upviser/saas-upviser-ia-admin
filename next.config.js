/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'iframe.mediadelivery.net',
          port: '',
          pathname: '/embed/**'
        }, {
          protocol: 'https',
          hostname: 'upviser-website.b-cdn.net',
          port: '',
          pathname: '/**'
        }, {
          protocol: 'https',
          hostname: 'saas-upviser-ia.b-cdn.net',
          port: '',
          pathname: '/**'
        }, 
      ]
    }
  }

module.exports = nextConfig
