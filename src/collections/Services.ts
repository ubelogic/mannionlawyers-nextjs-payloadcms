import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path, e.g. "parenting-disputes" for /parenting-disputes',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on the homepage service card.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload a photo for this service\'s homepage card. Optional but recommended.',
      },
    },
    {
      name: 'showOnHomepage',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers show first.',
      },
    },
    {
      name: 'megaMenuBlurb',
      type: 'text',
      admin: {
        description: 'Short phrase shown under the title in the header mega-menu.',
      },
    },
    {
      name: 'showInMegaMenu',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Full body content for this service\'s own page.',
      },
    },
  ],
  defaultSort: 'order',
}
