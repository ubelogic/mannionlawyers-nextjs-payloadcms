import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      type: 'array',
      admin: { description: 'Simple top-level links (Home, About, Locations, Support, Contact...). Services and Resources have their own dedicated menus below.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
    },
    {
      name: 'resourcesLinks',
      type: 'array',
      admin: { description: 'Items in the "Resources" dropdown.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Guides', href: '/resources' },
        { label: 'Case Studies', href: '/case-studies' },
      ],
    },
    {
      name: 'trailingLinks',
      type: 'array',
      admin: { description: 'Links shown after Resources (Locations, Support, Contact).' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Locations', href: '/locations' },
        { label: 'Support', href: '/support' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      name: 'megaMenuEyebrow',
      type: 'text',
      defaultValue: 'Urgent matter?',
    },
    {
      name: 'megaMenuText',
      type: 'text',
      defaultValue: 'Child taken, withheld, or about to be moved? Hours matter — call rather than wait.',
    },
    {
      name: 'megaMenuCtaLabel',
      type: 'text',
      defaultValue: 'Recovery & relocation help',
    },
    {
      name: 'megaMenuCtaHref',
      type: 'text',
      defaultValue: '/recovery-relocation-orders',
    },
    {
      name: 'navCtaLabel',
      type: 'text',
      defaultValue: 'Book a Consultation',
    },
    {
      name: 'navCtaHref',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
