import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
            { name: 'eyebrow', type: 'text', defaultValue: 'About the firm' },
            { name: 'headingPlain', type: 'text', defaultValue: 'Most lawyers do family law.' },
            {
              name: 'headingAccent',
              type: 'text',
              defaultValue: 'fathers',
              admin: { description: 'The italic word at the end of the heading, e.g. "We do [fathers]."' },
            },
            {
              name: 'lede',
              type: 'textarea',
              defaultValue:
                "Mannion Lawyers acts exclusively for dads. That single choice shapes everything — the experience we've built, the way we communicate, and the outcomes we fight for.",
            },
          ],
        },
        {
          label: 'Principal',
          fields: [
            {
              name: 'principalEyebrow',
              type: 'text',
              defaultValue: 'Our principal',
            },
            {
              name: 'principal',
              type: 'relationship',
              relationTo: 'team-members',
              admin: { description: 'Pick the team member profiled in this section (e.g. Paul Mannion).' },
            },
            {
              name: 'showPrincipalVideo',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: "Show the principal's video message (if they have one) right after their bio." },
            },
          ],
        },
        {
          label: 'Body Sections',
          fields: [
            {
              name: 'sections',
              type: 'array',
              admin: {
                description:
                  'The prose sections between the hero and the principal bio, and again after it (e.g. "Why fathers only?", "What the law actually says", "How we work", "Access to justice matters to us").',
              },
              minRows: 1,
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'richText', required: true },
                {
                  name: 'placement',
                  type: 'select',
                  defaultValue: 'beforePrincipal',
                  options: [
                    { label: 'Before the principal bio', value: 'beforePrincipal' },
                    { label: 'After the principal bio', value: 'afterPrincipal' },
                  ],
                },
                {
                  name: 'background',
                  type: 'select',
                  defaultValue: 'plain',
                  options: [
                    { label: 'Plain (paper)', value: 'plain' },
                    { label: 'Alt (mist)', value: 'alt' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            { name: 'ctaHeading', type: 'text', defaultValue: 'Talk to someone who gets it.' },
            {
              name: 'ctaLede',
              type: 'text',
              defaultValue: 'A confidential consultation. No jargon, no judgement, no obligation.',
            },
            { name: 'ctaButtonLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'ctaButtonHref', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: 'About Mannion Lawyers | Family Law for Fathers' },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'Mannion Lawyers has worked exclusively with fathers since 2005. Principal lawyer Paul Mannion and his team across NSW and the ACT.',
            },
          ],
        },
      ],
    },
  ],
}
