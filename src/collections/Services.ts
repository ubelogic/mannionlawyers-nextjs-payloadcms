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
              admin: {
                description: 'URL path, e.g. "parenting-disputes" for /parenting-disputes',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: { description: 'Short description shown on the homepage service card.' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: "Photo for this service's homepage card. Optional but recommended." },
            },
            { name: 'showOnHomepage', type: 'checkbox', defaultValue: true },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: { description: 'Lower numbers show first.' },
            },
            {
              name: 'megaMenuBlurb',
              type: 'text',
              admin: { description: 'Short phrase shown under the title in the header mega-menu.' },
            },
            { name: 'showInMegaMenu', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          label: 'Services Overview Card',
          description: 'How this service appears as a section on the /services listing page.',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              admin: { description: 'Category label, e.g. "Parenting", "Urgent matters", "Finances".' },
            },
            {
              name: 'anchorId',
              type: 'text',
              admin: { description: 'Optional short id for linking to this section (e.g. "parenting"). Falls back to slug.' },
            },
            {
              name: 'answerFirst',
              type: 'textarea',
              admin: { description: 'Bolded, self-contained lead sentence.' },
            },
            {
              name: 'detail',
              type: 'textarea',
              admin: { description: 'Second paragraph — how we actually handle this matter.' },
            },
            {
              name: 'ctaLabel',
              type: 'text',
              admin: { description: 'Button label, e.g. "Discuss your parenting matter".' },
            },
          ],
        },
        {
          label: 'Individual Page',
          description: 'The service\'s own page at /{slug}.',
          fields: [
            {
              name: 'pageHeadingLine1',
              type: 'text',
              admin: {
                description:
                  'Overrides the title in the H1\'s first line, if the page heading uses shorter/different wording than the title (e.g. title "Consent orders & financial agreements" but heading "Consent orders & BFAs"). Leave blank to just use the title.',
              },
            },
            {
              name: 'pageHeadingLine2',
              type: 'text',
              admin: {
                description:
                  'Plain part of the H1\'s second line, e.g. "getting real time with " (the accent phrase below is appended after it).',
              },
            },
            {
              name: 'pageHeadingAccent',
              type: 'text',
              admin: { description: 'Italic accent phrase at the end of the H1, e.g. "your kids".' },
            },
            {
              name: 'pageLede',
              type: 'textarea',
              admin: { description: "This page's own intro paragraph, under the H1." },
            },
            {
              name: 'content',
              type: 'richText',
              admin: { description: 'Full body content — use H2s for each sub-question/section.' },
            },
            {
              name: 'faqs',
              type: 'array',
              admin: { description: 'FAQ accordion shown on this page (also powers the FAQ schema markup).' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              maxDepth: 1,
              admin: { description: 'Pick 2–3 other services to show as "Related services" cards.' },
            },
            {
              name: 'showUrgentCallout',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Show a "Call now, don\'t wait for a form" line under the final CTA button.' },
            },
            {
              name: 'finalCtaHeading',
              type: 'text',
              admin: { description: 'Heading for this page\'s own closing CTA band.' },
            },
            {
              name: 'finalCtaLede',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
  defaultSort: 'order',
}
