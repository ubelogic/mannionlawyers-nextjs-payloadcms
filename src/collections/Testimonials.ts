import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'quoteHeading',
    defaultColumns: ['quoteHeading', 'authorName', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quoteHeading',
      type: 'text',
      required: true,
      admin: {
        description: 'Short pull-quote shown as the card headline, e.g. "More access to my children."',
      },
    },
    {
      name: 'quoteBody',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Matthew R"',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  defaultSort: 'order',
}
