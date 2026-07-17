import type { CollectionConfig } from 'payload'

const ctaFields = [
  { name: 'heading', type: 'text' as const },
  { name: 'text', type: 'textarea' as const },
  { name: 'buttonLabel', type: 'text' as const },
  { name: 'buttonHref', type: 'text' as const },
]

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'eyebrow', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basics',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: { description: 'URL path, e.g. "fathers-rights-australia" for /resources/fathers-rights-australia' },
            },
            {
              name: 'eyebrow',
              type: 'text',
              admin: { description: 'Category label shown on the card, e.g. "Parenting", "Child support", "Court process".' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: { description: 'Short summary shown on the resources listing card.' },
            },
            {
              name: 'heroLede',
              type: 'textarea',
              admin: { description: "This guide's own intro paragraph under its H1. Falls back to the excerpt if left blank." },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: { description: 'Lower numbers show first on the resources listing page.' },
            },
          ],
        },
        {
          label: 'Article Meta',
          fields: [
            {
              name: 'articleAuthor',
              type: 'relationship',
              relationTo: 'team-members',
              admin: { description: 'Shown as "By [name]" under the heading, and in the sidebar "who you\'ll work with" card.' },
            },
            {
              name: 'updatedLabel',
              type: 'text',
              admin: { description: 'e.g. "Updated June 2026"' },
            },
            {
              name: 'readTime',
              type: 'text',
              admin: { description: 'e.g. "10 min read"' },
            },
          ],
        },
        {
          label: 'Guide Content',
          fields: [
            {
              name: 'sections',
              type: 'array',
              admin: {
                description:
                  'Each section becomes an H2 with a table-of-contents entry. Add an optional CTA to show a highlighted callout right after that section.',
              },
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'anchorId',
                  type: 'text',
                  admin: { description: 'Optional. Falls back to a slug generated from the heading.' },
                },
                { name: 'body', type: 'richText', required: true },
                {
                  name: 'cta',
                  type: 'group',
                  admin: { description: 'Optional callout shown right after this section.' },
                  fields: ctaFields,
                },
              ],
            },
            {
              name: 'finalCta',
              type: 'group',
              admin: { description: 'The highlighted closing callout at the end of the article (dark band).' },
              fields: ctaFields,
            },
            {
              name: 'relatedItems',
              type: 'array',
              admin: { description: '"Related guides & services" links at the end of the article.' },
              maxRows: 4,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            {
              name: 'datePublished',
              type: 'date',
              admin: { description: 'Used for Article schema markup.' },
            },
          ],
        },
      ],
    },
  ],
  defaultSort: 'order',
}
