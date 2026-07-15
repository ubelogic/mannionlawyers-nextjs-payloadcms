import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainPhoneDisplay',
      type: 'text',
      defaultValue: '(02) 4704 9977',
      admin: { description: 'Used wherever a page shows a general "Call us" number.' },
    },
    {
      name: 'mainPhoneHref',
      type: 'text',
      defaultValue: '+61247049977',
      admin: { description: 'Digits with country code, for tel: links.' },
    },
  ],
}
