import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Mannion Lawyers',
    },
    {
      name: 'brandTagline',
      type: 'textarea',
      defaultValue: "Family law for fathers. & nothing else.\nServing NSW and the ACT since 2005.",
    },
    {
      name: 'firmLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'About us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Book a consultation', href: '/contact' },
      ],
    },
    {
      name: 'serviceLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Parenting disputes', href: '/parenting-disputes' },
        { label: 'Recovery orders', href: '/recovery-relocation-orders' },
        { label: 'Property settlement', href: '/property-settlement' },
        { label: 'Child support', href: '/child-support' },
      ],
    },
    {
      name: 'officeLinks',
      type: 'array',
      admin: { description: 'Office name + phone shown in the footer "Offices" column.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'phoneDisplay', type: 'text', required: true },
        { name: 'phoneHref', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Penrith', phoneDisplay: '(02) 4704 9977', phoneHref: '+61247049977' },
        { label: 'Batemans Bay', phoneDisplay: '(02) 4472 1051', phoneHref: '+61244721051' },
        { label: 'Canberra', phoneDisplay: '(02) 6243 3607', phoneHref: '+61262433607' },
        { label: 'Wagga Wagga', phoneDisplay: '(02) 4704 9977', phoneHref: '+61247049977' },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Mannion Lawyers. Liability limited by a scheme approved under Professional Standards Legislation.',
    },
  ],
}
