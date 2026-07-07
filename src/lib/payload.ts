import { getPayload } from 'payload'
import config from '@payload-config'

let cached: ReturnType<typeof getPayload> | null = null

/**
 * Returns a cached Payload Local API instance. Use this in Server Components
 * to fetch CMS content directly (no HTTP round-trip).
 */
export function getPayloadClient() {
  if (!cached) {
    cached = getPayload({ config })
  }
  return cached
}
