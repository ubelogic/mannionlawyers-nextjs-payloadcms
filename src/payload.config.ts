import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig, type Plugin } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Offices } from './collections/Offices'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// On Vercel, serverless functions have no persistent/writable filesystem, so
// uploaded media (logo, hero photo, service images, etc.) must live in an
// external store. If BLOB_READ_WRITE_TOKEN is set (Vercel Blob), we use it;
// otherwise uploads fall back to local disk, which is fine for local dev.
const plugins: Plugin[] = []
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Services, Testimonials, FAQs, Offices],
  globals: [Header, Footer, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_SERVER_URL].filter(
    (v): v is string => Boolean(v),
  ),
})
