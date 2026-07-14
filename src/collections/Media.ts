import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // On Vercel, pair this with @payloadcms/storage-vercel-blob (already wired
    // in payload.config.ts) since the filesystem is not writable/persistent
    // in serverless functions.
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'card', width: 500, height: 667, position: 'centre' },
      { name: 'hero', width: 2000, height: undefined, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
}
