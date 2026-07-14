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

/**
 * Builds a minimal, valid Lexical editor-state JSON for a richText field
 * from plain paragraphs. Supports **bold** within a paragraph.
 * (Payload's richText fields store this JSON shape; the RichText React
 * component on the frontend renders it back out.)
 */
function textNode(text: string, bold = false) {
  return {
    type: 'text',
    version: 1,
    text,
    format: bold ? 1 : 0,
    detail: 0,
    mode: 'normal',
    style: '',
  }
}

function paragraphFromMarkdownish(line: string) {
  const parts = line.split('**')
  const children = parts.map((part, i) => textNode(part, i % 2 === 1)).filter((n) => n.text !== '')
  return {
    type: 'paragraph',
    version: 1,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
  }
}

function listFromItems(items: string[]) {
  return {
    type: 'list',
    version: 1,
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      value: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        {
          type: 'text',
          version: 1,
          text: item,
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
        },
      ],
    })),
  }
}

function richText(blocks: Array<string | { list: string[] }>) {
  const children = blocks.map((block) =>
    typeof block === 'string' ? paragraphFromMarkdownish(block) : listFromItems(block.list),
  )
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

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

  console.log('Seeding Team Members...')
  const paul = await payload.create({
    collection: 'team-members',
    data: {
      name: 'Paul Mannion',
      role: 'Principal Lawyer',
      bio: richText([
        'Paul has worked with families and children since 1985 — first in family and counselling services, then as a lawyer admitted to the Supreme Court. He is a father of five, and he built this practice on a conviction the law itself shares: that a child has the right to a meaningful relationship with both parents.',
        "Forty years in, Paul still takes the first consultation himself wherever he can. He'll tell you plainly what's realistic, what it will cost, and — just as importantly — when a fight isn't worth having. Clients describe him the same way again and again: friendly, direct, and fast to act when it matters.",
        'He\'s supported by a close team, including solicitor Suvarna and our client-care staff across four offices, so your matter never sits in a queue.',
      ]),
      videoEmbedUrl: 'https://www.youtube.com/embed/mq-R0cXfYMU',
      order: 0,
    },
  })

  console.log('Seeding About Page...')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      eyebrow: 'About the firm',
      headingPlain: 'Most lawyers do family law.',
      headingAccent: 'fathers',
      lede:
        "Mannion Lawyers acts exclusively for dads. That single choice shapes everything — the experience we've built, the way we communicate, and the outcomes we fight for.",
      principalEyebrow: 'Our principal',
      principal: paul.id,
      showPrincipalVideo: true,
      sections: [
        {
          heading: 'Why fathers only?',
          placement: 'beforePrincipal',
          background: 'plain',
          body: richText([
            "Because the problems fathers face in family law are specific, and specialisation wins cases. A generalist family lawyer might see a recovery order once a year. We deal with parenting disputes, withheld children, relocation threats and access battles every single week. That pattern recognition — knowing what a registrar will ask, what evidence actually moves a court, which fights are worth having — is something you can't get any other way.",
            'It also means we understand the experience, not just the law. Being kept from your kids while a process grinds on for months is its own kind of grief. You won\'t have to explain that to us. We start from there.',
            'Our practice is built around two things the Family Law Act itself recognises:',
            {
              list: [
                'A child has the right to a meaningful relationship with both parents.',
                "Where shared care isn't practical, significant and meaningful time with the other parent must be considered.",
              ],
            },
            "These aren't just legal principles to us — they're the reason the firm exists. We work with you every step of the way so you understand the choices you're making and feel empowered to make them. We strive for justice for fathers.",
          ]),
        },
        {
          heading: 'What the law actually says',
          placement: 'afterPrincipal',
          background: 'plain',
          body: richText([
            "Australian family law decides parenting cases on one question: what is in your child's best interests. And the Family Law Act expressly recognises, as part of that question, the benefit to a child of being able to have a relationship with both parents where it is safe to do so.",
            "That recognition is your foundation — but it doesn't enforce itself. Our job is to make sure the process — mediation, negotiation or court — actually delivers a meaningful relationship in your case, and that the orders made are practical enough to hold up in real life.",
          ]),
        },
        {
          heading: 'How we work',
          placement: 'afterPrincipal',
          background: 'alt',
          body: richText([
            'Plain language, fixed fees, and a plan you can see. From the first meeting you\'ll know your options, the realistic range of outcomes, and what each path costs. We support the whole person, too — when clients need counselling, financial guidance or just steadying, we connect them with it. A father who is back on his feet presents better in every room that matters.',
          ]),
        },
        {
          heading: 'Access to justice matters to us',
          placement: 'afterPrincipal',
          background: 'plain',
          body: richText([
            'There is a quiet heartbreak happening every day, largely unseen and rarely spoken about. Fathers who love their children deeply are being forced out of their lives — not because they don\'t care, not because they are unsafe, and not because they chose to leave — but because they simply cannot afford to fight.',
            "Many low-income fathers fall through the gaps. Legal Aid doesn't cover them. Private representation exceeds their means. The result is an impossible choice: navigate a complex, intimidating court process alone, or gradually lose contact with their children.",
            "This isn't about conflict between parents. It's about access to justice. It's about fairness. It's about children's right to be loved by their fathers and extended families. **No parent should lose their child because they are poor. No child should lose a loving parent because justice has a price tag.**",
            "Across our four offices we work to support fathers who need help most. If cost is a barrier, talk to us — we'll always have an honest conversation about what's possible.",
          ]),
        },
      ],
      ctaHeading: 'Talk to someone who gets it.',
      ctaLede: 'A confidential consultation. No jargon, no judgement, no obligation.',
      ctaButtonLabel: 'Book a Consultation',
      ctaButtonHref: '/contact',
      metaTitle: 'About Mannion Lawyers | Family Law for Fathers',
      metaDescription:
        'Mannion Lawyers has worked exclusively with fathers since 2005. Principal lawyer Paul Mannion and his team across NSW and the ACT.',
    },
  })

  console.log('Done. Visit /admin to review and add real photos.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
