// Hand-written types mirroring src/collections/* and src/globals/*.
// If you'd rather have these auto-generated from a live database, run:
//   npm run generate:types
// which writes src/payload-types.ts from your actual Payload config.

export interface Media {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null }
    card?: { url?: string | null; width?: number | null; height?: number | null }
    hero?: { url?: string | null; width?: number | null; height?: number | null }
  }
}

export interface Service {
  id: string
  title: string
  slug: string
  summary: string
  image: Media | string
  showOnHomepage: boolean
  order: number
  megaMenuBlurb?: string
  showInMegaMenu: boolean
  content?: unknown
}

export interface Testimonial {
  id: string
  quoteHeading: string
  quoteBody: string
  authorName: string
  order: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  showOnHomepage: boolean
  order: number
}

export interface Office {
  id: string
  name: string
  addressLine1: string
  suburbStatePostcode: string
  phone: string
  phoneDisplay: string
  mapEmbedUrl?: string
  order: number
}

export interface NavLink {
  label: string
  href: string
}

export interface HeaderGlobal {
  logo?: Media | string
  navLinks: NavLink[]
  resourcesLinks: NavLink[]
  trailingLinks: NavLink[]
  megaMenuEyebrow: string
  megaMenuText: string
  megaMenuCtaLabel: string
  megaMenuCtaHref: string
  navCtaLabel: string
  navCtaHref: string
}

export interface FooterOfficeLink {
  label: string
  phoneDisplay: string
  phoneHref: string
}

export interface FooterGlobal {
  brandName: string
  brandTagline: string
  firmLinks: NavLink[]
  serviceLinks: NavLink[]
  officeLinks: FooterOfficeLink[]
  copyrightText: string
}

export interface TrustItem {
  stat: string
  label: string
  isStarRating: boolean
}

export interface ProcessStep {
  title: string
  description: string
}

export interface HomePageGlobal {
  heroHeadingLine1: string
  heroHeadingLine2: string
  heroLede: string
  heroImage?: Media | string
  heroPrimaryCtaLabel: string
  heroPrimaryCtaHref: string
  heroPhoneLabel: string
  heroPhoneHref: string
  trustItems: TrustItem[]

  videoEyebrow: string
  videoHeading: string
  videoEmbedUrl?: string

  servicesEyebrow: string
  servicesHeading: string
  servicesLede: string

  processEyebrow: string
  processHeading: string
  processLede: string
  steps: ProcessStep[]

  aboutImage?: Media | string
  aboutEyebrow: string
  aboutHeading: string
  aboutLede: string
  aboutCtaLabel: string
  aboutCtaHref: string

  testimonialsEyebrow: string
  testimonialsHeading: string
  testimonialsLede: string

  faqEyebrow: string
  faqHeading: string

  locationsEyebrow: string
  locationsHeading: string
  locationsLede: string

  ctaHeading: string
  ctaLede: string
  ctaButtonLabel: string
  ctaButtonHref: string
  ctaPhoneLabel: string
  ctaPhoneHref: string
  ctaSubHours: string

  metaTitle: string
  metaDescription: string
}

export function isMedia(value: Media | string | undefined | null): value is Media {
  return Boolean(value) && typeof value === 'object'
}
