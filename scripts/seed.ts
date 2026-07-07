/**
 * Seeds the database with the homepage content from the original site so the
 * admin panel and homepage aren't empty on first run.
 *
 * Usage:  npm run seed
 *
 * Note: the original photography (hero image, service card images, about
 * photo, logo) isn't included in this repo. After seeding, open
 * /admin -> Media and upload those images, then attach them to the
 * relevant Service / Home Page / Header fields.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Header...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
      resourcesLinks: [
        { label: 'Guides', href: '/resources' },
        { label: 'Case Studies', href: '/case-studies' },
      ],
      trailingLinks: [
        { label: 'Locations', href: '/locations' },
        { label: 'Support', href: '/support' },
        { label: 'Contact', href: '/contact' },
      ],
      megaMenuEyebrow: 'Urgent matter?',
      megaMenuText:
        'Child taken, withheld, or about to be moved? Hours matter — call rather than wait.',
      megaMenuCtaLabel: 'Recovery & relocation help',
      megaMenuCtaHref: '/recovery-relocation-orders',
      navCtaLabel: 'Book a Consultation',
      navCtaHref: '/contact',
    },
  })

  console.log('Seeding Footer...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      brandName: 'Mannion Lawyers',
      brandTagline: 'Family law for fathers. & nothing else.\nServing NSW and the ACT since 2005.',
      firmLinks: [
        { label: 'About us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Book a consultation', href: '/contact' },
      ],
      serviceLinks: [
        { label: 'Parenting disputes', href: '/parenting-disputes' },
        { label: 'Recovery orders', href: '/recovery-relocation-orders' },
        { label: 'Property settlement', href: '/property-settlement' },
        { label: 'Child support', href: '/child-support' },
      ],
      officeLinks: [
        { label: 'Penrith', phoneDisplay: '(02) 4704 9977', phoneHref: '+61247049977' },
        { label: 'Batemans Bay', phoneDisplay: '(02) 4472 1051', phoneHref: '+61244721051' },
        { label: 'Canberra', phoneDisplay: '(02) 6243 3607', phoneHref: '+61262433607' },
        { label: 'Wagga Wagga', phoneDisplay: '(02) 4704 9977', phoneHref: '+61247049977' },
      ],
      copyrightText:
        '© 2026 Mannion Lawyers. Liability limited by a scheme approved under Professional Standards Legislation.',
    },
  })

  console.log('Seeding Home Page...')
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroHeadingLine1: 'Family law for fathers.',
      heroHeadingLine2: '& nothing else.',
      heroLede:
        "Being kept from your kids is a kind of pain most lawyers don't understand. We do. For twenty years, we've worked exclusively with fathers across NSW and the ACT.",
      heroPrimaryCtaLabel: 'Book a Consultation',
      heroPrimaryCtaHref: '/contact',
      heroPhoneLabel: 'Call (02) 4704 9977',
      heroPhoneHref: '+61247049977',
      trustItems: [
        { stat: '4.8', label: 'Google reviews', isStarRating: true },
        { stat: 'Since 2005', label: 'Working with families', isStarRating: false },
        { stat: 'Fathers only', label: 'Our entire practice', isStarRating: false },
        { stat: 'Fixed fees', label: 'No surprises', isStarRating: false },
      ],
      videoEyebrow: 'Experienced. Exclusive. Trusted.',
      videoHeading:
        'Helping fathers protect their relationships with their children for over twenty years',
      videoEmbedUrl:
        'https://player.mediadelivery.net/embed/647318/e15e841c-f20e-48d3-8cc4-55477388aee8?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      servicesEyebrow: 'What we do',
      servicesHeading: 'Every family law matter a father faces',
      servicesLede:
        "One focus means deep experience. Whatever stage you're at — just separated, mid-dispute, or trying to enforce orders — we've handled it hundreds of times.",
      processEyebrow: 'How it works',
      processHeading: 'Three steps. No mystery.',
      processLede:
        "Family law is overwhelming. We strip it back so you always know what's next, what it costs, and what you're moving toward.",
      steps: [
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
      aboutEyebrow: "Who you'll work with",
      aboutHeading: 'Led by a lawyer who is also a father of five',
      aboutLede:
        "Principal lawyer Paul Mannion has worked with families and children since 2005. He built this practice around one belief: a child benefits from a meaningful relationship with their dad — and that's worth fighting for properly.",
      aboutCtaLabel: 'More about the firm',
      aboutCtaHref: '/about',
      testimonialsEyebrow: 'Client stories',
      testimonialsHeading: 'What fathers say afterwards',
      testimonialsLede: 'Unsolicited, word for word.',
      faqEyebrow: 'Straight answers',
      faqHeading: 'Frequently asked questions',
      locationsEyebrow: 'Where we are',
      locationsHeading: 'Four offices across NSW & the ACT',
      locationsLede: 'In person at any office, or by phone and video wherever you are in Australia.',
      ctaHeading: 'It starts with one conversation. The first step is yours.',
      ctaLede: "Tell us what's happening. We'll tell you honestly where you stand and what we'd do next.",
      ctaButtonLabel: 'Book a Consultation',
      ctaButtonHref: '/contact',
      ctaPhoneLabel: 'Call (02) 4704 9977',
      ctaPhoneHref: '+61247049977',
      ctaSubHours: 'weekdays 8.30am–5.30pm.',
      metaTitle: 'Family Law for Fathers | Mannion Lawyers — NSW & ACT',
      metaDescription:
        'Mannion Lawyers works exclusively with fathers. Parenting disputes, Family Court, recovery orders, property settlement across NSW & ACT. Book a consultation.',
    },
  })

  console.log('Seeding FAQs...')
  const faqs = [
    {
      question: 'Will I have to go to court?',
      answer:
        'Not always — and not usually first. Most parenting matters are resolved through Family Dispute Resolution (mediation) before they ever reach a courtroom. Where court is unavoidable, we prepare you thoroughly so you walk in ready, not rattled.',
    },
    {
      question: 'How long will my matter take?',
      answer:
        "Simple matters resolved through consent orders can take a few months. Complex disputes that go to trial may take a year or more. We'll give you a realistic timeline at our first meeting — no false promises.",
    },
    {
      question: 'Will my children have to give evidence?',
      answer:
        "Generally no. Children don't appear in family court. Their views, where relevant, are presented through a Family Report or by an Independent Children's Lawyer (ICL) — not by the children themselves.",
    },
    {
      question: "What if my ex won't agree to anything?",
      answer:
        "You don't need their agreement to move forward. We can apply for parenting orders through the court if mediation breaks down or isn't appropriate. The law's central question is your child's best interests — and it expressly recognises the benefit to a child of a relationship with both parents.",
    },
  ]
  for (const [i, faq] of faqs.entries()) {
    await payload.create({ collection: 'faqs', data: { ...faq, showOnHomepage: true, order: i } })
  }

  console.log('Seeding Testimonials...')
  const testimonials = [
    {
      quoteHeading: 'More access to my children.',
      quoteBody:
        "Can't thank the team enough for the assistance they have provided me in gaining more access to my children. Mannion Lawyers really do go above and beyond.",
      authorName: 'Matthew R',
    },
    {
      quoteHeading: 'Professional and quick to act.',
      quoteBody:
        "I couldn't give higher praise to Paul, Suvarna and the entire team at Mannion Lawyers. Throughout a difficult time they were professional, caring and quick to act.",
      authorName: 'Patrick W',
    },
    {
      quoteHeading: 'Sorted it very quickly.',
      quoteBody:
        'At one point I thought I would never see my kids again, so it was great when Mannion Lawyers were able to come to an agreement without even having to go to court. Highly recommended.',
      authorName: 'Leo M',
    },
  ]
  for (const [i, t] of testimonials.entries()) {
    await payload.create({ collection: 'testimonials', data: { ...t, order: i } })
  }

  console.log('Seeding Offices...')
  const offices = [
    {
      name: 'Batemans Bay',
      addressLine1: 'Unit 8/3 Orient St',
      suburbStatePostcode: 'Batemans Bay NSW 2536',
      phone: '+61244721051',
      phoneDisplay: '(02) 4472 1051',
    },
    {
      name: 'Penrith',
      addressLine1: '3/34 Woodriff St',
      suburbStatePostcode: 'Penrith NSW 2750',
      phone: '+61247049977',
      phoneDisplay: '(02) 4704 9977',
    },
    {
      name: 'Canberra',
      addressLine1: '2 Phillip Law St',
      suburbStatePostcode: 'Acton ACT 2601',
      phone: '+61262433607',
      phoneDisplay: '(02) 6243 3607',
    },
    {
      name: 'Wagga Wagga',
      addressLine1: 'Suite 1/161-169 Baylis St',
      suburbStatePostcode: 'Wagga Wagga NSW 2650',
      phone: '+61247049977',
      phoneDisplay: '(02) 4704 9977',
    },
  ]
  for (const [i, o] of offices.entries()) {
    await payload.create({ collection: 'offices', data: { ...o, order: i } })
  }

  console.log('Seeding Services (no images yet — upload real photos in /admin and attach them)...')
  const services = [
    {
      title: 'Parenting disputes',
      slug: 'parenting-disputes',
      summary:
        'Securing meaningful, workable time with your children — through agreement where possible, court orders where necessary.',
      megaMenuBlurb: 'Real, enforceable time with your kids',
    },
    {
      title: 'Separation & divorce',
      slug: 'separation-divorce',
      summary: "Clear advice on your rights and obligations from day one, so early decisions don't cost you later.",
      megaMenuBlurb: 'Advice before early decisions cost you',
    },
    {
      title: 'Recovery & relocation orders',
      slug: 'recovery-relocation-orders',
      summary: 'Urgent action when a child has been taken, withheld, or is at risk of being moved away from you.',
      megaMenuBlurb: 'Urgent action when a child is taken or moved',
    },
    {
      title: 'Child support',
      slug: 'child-support',
      summary: "Assessments, agreements, and disputes — making sure what you pay or receive is actually fair.",
      megaMenuBlurb: 'Assessments and agreements that are fair',
    },
    {
      title: 'Property settlement',
      slug: 'property-settlement',
      summary: "Protecting what you've built. Fair division of assets, superannuation, and debts after separation.",
      megaMenuBlurb: "Protecting what you've built",
    },
    {
      title: 'Consent orders & financial agreements',
      slug: 'consent-orders-agreements',
      summary: "Turning agreements into legally binding, enforceable documents — so handshakes can't be walked back.",
      megaMenuBlurb: 'Make the agreement enforceable',
    },
  ]

  for (const [i, s] of services.entries()) {
    await payload.create({
      collection: 'services',
      data: {
        ...s,
        showOnHomepage: true,
        showInMegaMenu: true,
        order: i,
      },
    })
  }

  console.log('Done. Visit /admin to review and add real photos.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
