import type { CollectionConfig } from 'payload'

export const Offices: CollectionConfig = {
  slug: 'offices',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Batemans Bay"' },
    },
    {
      name: 'addressLine1',
      type: 'text',
      required: true,
    },
    {
      name: 'suburbStatePostcode',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Batemans Bay NSW 2536"' },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: { description: 'Digits only with country code for tel: links, e.g. "+61247049977"' },
    },
    {
      name: 'phoneDisplay',
      type: 'text',
      required: true,
      admin: { description: 'Human formatted, e.g. "(02) 4704 9977"' },
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: { description: 'Optional Google Maps embed URL, used on the Locations page.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  defaultSort: 'order',
}
