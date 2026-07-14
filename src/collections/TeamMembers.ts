import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Principal Lawyer"' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'videoEmbedUrl',
      type: 'text',
      admin: { description: 'Optional. Full iframe src URL for a video message from this person.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  defaultSort: 'order',
}
