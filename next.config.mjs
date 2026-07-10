import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zthe84vs81.ufs.sh',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
