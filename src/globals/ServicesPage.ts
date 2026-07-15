import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
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
            { name: 'eyebrow', type: 'text', defaultValue: 'Services' },
            { name: 'headingPlain', type: 'text', defaultValue: 'One client, one focus,' },
            {
              name: 'headingAccent',
              type: 'text',
              defaultValue: 'every matter',
              admin: { description: 'The italic phrase, e.g. "One client, one focus, [every matter] a father faces."' },
            },
            {
              name: 'headingSuffix',
              type: 'text',
              defaultValue: 'a father faces.',
              admin: { description: 'The plain text that follows the italic accent phrase.' },
            },
            {
              name: 'ledeText',
              type: 'textarea',
              defaultValue:
                "Each section below leads with the answer you actually need. If your situation is urgent — a child withheld, a relocation threatened — skip straight to recovery and relocation orders or contact us now.",
              admin: {
                description: 'Plain lede text. The "recovery and relocation orders" and "contact us now" links below are appended automatically using the fields underneath.',
              },
            },
            {
              name: 'urgentServiceSlug',
              type: 'relationship',
              relationTo: 'services',
              admin: { description: 'Which service to link to for "recovery and relocation orders" in the lede.' },
            },
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            { name: 'ctaHeading', type: 'text', defaultValue: 'Not sure which one is you?' },
            {
              name: 'ctaLede',
              type: 'text',
              defaultValue: "Most matters touch more than one of these. Tell us what's happening and we'll map it for you.",
            },
            { name: 'ctaButtonLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'ctaButtonHref', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              defaultValue: 'Family Law Services for Fathers | Mannion Lawyers',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'Parenting disputes, separation, recovery orders, child support, property settlement and consent orders — exclusively for fathers in NSW and the ACT.',
            },
          ],
        },
      ],
    },
  ],
}
