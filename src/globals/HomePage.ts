import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
            { name: 'heroHeadingLine1', type: 'text', defaultValue: 'Family law for fathers.' },
            { name: 'heroHeadingLine2', type: 'text', defaultValue: '& nothing else.' },
            {
              name: 'heroLede',
              type: 'textarea',
              defaultValue:
                "Being kept from your kids is a kind of pain most lawyers don't understand. We do. For twenty years, we've worked exclusively with fathers across NSW and the ACT.",
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'heroPrimaryCtaHref', type: 'text', defaultValue: '/contact' },
            { name: 'heroPhoneLabel', type: 'text', defaultValue: 'Call (02) 4704 9977' },
            { name: 'heroPhoneHref', type: 'text', defaultValue: '+61247049977' },
            {
              name: 'trustItems',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              fields: [
                { name: 'stat', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'isStarRating', type: 'checkbox', defaultValue: false },
              ],
              defaultValue: [
                { stat: '4.8', label: 'Google reviews', isStarRating: true },
                { stat: 'Since 2005', label: 'Working with families', isStarRating: false },
                { stat: 'Fathers only', label: 'Our entire practice', isStarRating: false },
                { stat: 'Fixed fees', label: 'No surprises', isStarRating: false },
              ],
            },
          ],
        },
        {
          label: 'Video',
          fields: [
            { name: 'videoEyebrow', type: 'text', defaultValue: 'Experienced. Exclusive. Trusted.' },
            {
              name: 'videoHeading',
              type: 'text',
              defaultValue: 'Helping fathers protect their relationships with their children for over twenty years',
            },
            { name: 'videoEmbedUrl', type: 'text', admin: { description: 'Full iframe src URL.' } },
          ],
        },
        {
          label: 'Services Section',
          fields: [
            { name: 'servicesEyebrow', type: 'text', defaultValue: 'What we do' },
            { name: 'servicesHeading', type: 'text', defaultValue: 'Every family law matter a father faces' },
            {
              name: 'servicesLede',
              type: 'textarea',
              defaultValue:
                "One focus means deep experience. Whatever stage you're at — just separated, mid-dispute, or trying to enforce orders — we've handled it hundreds of times.",
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            { name: 'processEyebrow', type: 'text', defaultValue: 'How it works' },
            { name: 'processHeading', type: 'text', defaultValue: 'Three steps. No mystery.' },
            {
              name: 'processLede',
              type: 'textarea',
              defaultValue:
                "Family law is overwhelming. We strip it back so you always know what's next, what it costs, and what you're moving toward.",
            },
            {
              name: 'steps',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
              defaultValue: [
                {
                  title: "Tell us what's happening",
                  description:
                    'A confidential first consultation. We listen first — no jargon, no judgement — and tell you honestly whether we can help.',
                },
                {
                  title: 'Get a plan and a fixed fee',
                  description:
                    'We map your options, realistic outcomes, and a fixed-fee plan. Twenty years of doing this means no surprises.',
                },
                {
                  title: 'Move forward',
                  description:
                    'Negotiation, mediation, or court — whichever path serves you and your kids best. We do the heavy lifting.',
                },
              ],
            },
          ],
        },
        {
          label: 'About Teaser',
          fields: [
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
            { name: 'aboutEyebrow', type: 'text', defaultValue: "Who you'll work with" },
            { name: 'aboutHeading', type: 'text', defaultValue: 'Led by a lawyer who is also a father of five' },
            {
              name: 'aboutLede',
              type: 'textarea',
              defaultValue:
                "Principal lawyer Paul Mannion has worked with families and children since 2005. He built this practice around one belief: a child benefits from a meaningful relationship with their dad — and that's worth fighting for properly.",
            },
            { name: 'aboutCtaLabel', type: 'text', defaultValue: 'More about the firm' },
            { name: 'aboutCtaHref', type: 'text', defaultValue: '/about' },
          ],
        },
        {
          label: 'Testimonials Section',
          fields: [
            { name: 'testimonialsEyebrow', type: 'text', defaultValue: 'Client stories' },
            { name: 'testimonialsHeading', type: 'text', defaultValue: 'What fathers say afterwards' },
            { name: 'testimonialsLede', type: 'text', defaultValue: 'Unsolicited, word for word.' },
          ],
        },
        {
          label: 'FAQ Section',
          fields: [
            { name: 'faqEyebrow', type: 'text', defaultValue: 'Straight answers' },
            { name: 'faqHeading', type: 'text', defaultValue: 'Frequently asked questions' },
          ],
        },
        {
          label: 'Locations Section',
          fields: [
            { name: 'locationsEyebrow', type: 'text', defaultValue: 'Where we are' },
            { name: 'locationsHeading', type: 'text', defaultValue: 'Four offices across NSW & the ACT' },
            {
              name: 'locationsLede',
              type: 'text',
              defaultValue: 'In person at any office, or by phone and video wherever you are in Australia.',
            },
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              defaultValue: 'It starts with one conversation. The first step is yours.',
            },
            {
              name: 'ctaLede',
              type: 'textarea',
              defaultValue: "Tell us what's happening. We'll tell you honestly where you stand and what we'd do next.",
            },
            { name: 'ctaButtonLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'ctaButtonHref', type: 'text', defaultValue: '/contact' },
            { name: 'ctaPhoneLabel', type: 'text', defaultValue: 'Call (02) 4704 9977' },
            { name: 'ctaPhoneHref', type: 'text', defaultValue: '+61247049977' },
            { name: 'ctaSubHours', type: 'text', defaultValue: 'weekdays 8.30am–5.30pm.' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: 'Family Law for Fathers | Mannion Lawyers — NSW & ACT' },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'Mannion Lawyers works exclusively with fathers. Parenting disputes, Family Court, recovery orders, property settlement across NSW & ACT. Book a consultation.',
            },
          ],
        },
      ],
    },
  ],
}
