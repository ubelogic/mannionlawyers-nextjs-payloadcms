import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16's built-in image optimization route currently fails to build
    // correctly on Vercel when the project is built with Turbopack (a
    // known Next.js issue, not specific to this project). Payload/sharp
    // already generates properly-sized variants (thumbnail/card/hero) on
    // upload, and Vercel Blob serves them directly, so turning off Next's
    // own optimization layer is a safe workaround with no real downside
    // here. If this gets fixed upstream, you can remove this and go back
    // to remotePatterns-only config.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
