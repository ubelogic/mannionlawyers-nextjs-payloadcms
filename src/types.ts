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

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface Service {
  id: string
  title: string
  slug: string
  summary: string
  eyebrow?: string
  anchorId?: string
  answerFirst?: string
  detail?: string
  ctaLabel?: string
  image: Media | string
  showOnHomepage: boolean
  order: number
  megaMenuBlurb?: string
  showInMegaMenu: boolean
  content?: unknown
  pageHeadingLine2?: string
  pageHeadingAccent?: string
  pageLede?: string
  faqs?: ServiceFAQ[]
  relatedServices?: (Service | string)[]
  showUrgentCallout?: boolean
  finalCtaHeading?: string
  finalCtaLede?: string
  metaTitle?: string
  metaDescription?: string
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

export interface TeamMember {
  id: string
  name: string
  role: string
  photo?: Media | string
  bio: unknown // Lexical richText JSON — rendered with <RichText data={...} />
  videoEmbedUrl?: string
  order: number
}

export interface AboutSection {
  heading: string
  body: unknown // Lexical richText JSON
  placement: 'beforePrincipal' | 'afterPrincipal'
  background: 'plain' | 'alt'
}

export interface AboutPageGlobal {
  eyebrow: string
  headingPlain: string
  headingAccent: string
  lede: string

  principalEyebrow: string
  principal?: TeamMember | string | null
  showPrincipalVideo: boolean

  sections: AboutSection[]

  ctaHeading: string
  ctaLede: string
  ctaButtonLabel: string
  ctaButtonHref: string

  metaTitle: string
  metaDescription: string
}

export interface ServicesPageGlobal {
  eyebrow: string
  headingPlain: string
  headingAccent: string
  headingSuffix: string
  ledeText: string
  urgentServiceSlug?: Service | string | null

  ctaHeading: string
  ctaLede: string
  ctaButtonLabel: string
  ctaButtonHref: string

  metaTitle: string
  metaDescription: string
}

export interface SiteSettingsGlobal {
  mainPhoneDisplay: string
  mainPhoneHref: string
}

export function isService(value: Service | string | null | undefined): value is Service {
  return Boolean(value) && typeof value === 'object'
}

export function isTeamMember(value: TeamMember | string | null | undefined): value is TeamMember {
  return Boolean(value) && typeof value === 'object'
}

export function isMedia(value: Media | string | undefined | null): value is Media {
  return Boolean(value) && typeof value === 'object'
}
