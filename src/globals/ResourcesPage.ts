import type { GlobalConfig } from 'payload'

export const ResourcesPage: GlobalConfig = {
  slug: 'resources-page',
  label: 'Resources Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Resources' },
            { name: 'headingPlain', type: 'text', defaultValue: 'Guides for fathers' },
            {
              name: 'headingAccent',
              type: 'text',
              defaultValue: 'navigating family law',
              admin: { description: 'The italic phrase on the second line of the H1.' },
            },
            {
              name: 'ledeText',
              type: 'textarea',
              defaultValue:
                'Practical, plain-English guides on parenting disputes, property, child support, and what to expect at every stage.',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: 'Resources for Fathers | Mannion Lawyers' },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'Practical guides for fathers navigating separation, parenting disputes, property settlement and child support across NSW and the ACT.',
            },
          ],
        },
      ],
    },
  ],
}
