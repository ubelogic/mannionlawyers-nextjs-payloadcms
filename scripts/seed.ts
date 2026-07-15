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

function headingNode(tag: 'h2' | 'h3', text: string) {
  return {
    type: 'heading',
    version: 1,
    tag,
    children: [textNode(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
  }
}

function richText(blocks: Array<string | { list: string[] } | { h2: string } | { h3: string }>) {
  const children = blocks.map((block) => {
    if (typeof block === 'string') return paragraphFromMarkdownish(block)
    if ('list' in block) return listFromItems(block.list)
    if ('h2' in block) return headingNode('h2', block.h2)
    return headingNode('h3', block.h3)
  })
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
      eyebrow: 'Parenting',
      anchorId: 'parenting',
      answerFirst:
        'Fathers in Australia can secure substantial, enforceable time with their children. The Family Law Act presumes a child has the right to a meaningful relationship with both parents — our job is making that real for you.',
      detail:
        "We start with negotiation and Family Dispute Resolution (mediation). Arrangements parents reach themselves tend to last longer than orders a judge imposes. If agreement isn't possible, we apply for parenting orders and represent you through every stage: interim hearings, family reports, Independent Children's Lawyers, and final hearings.",
      ctaLabel: 'Discuss your parenting matter',
      pageHeadingLine2: 'getting real time with ',
      pageHeadingAccent: 'your kids',
      pageLede:
        "Fathers in Australia can secure substantial, enforceable time with their children. The court's only question is what is in your child's best interests — and the law expressly recognises the benefit to a child of a relationship with both parents. Our job is turning that into a schedule that actually happens.",
      content: richText([
        { h2: 'What does the court actually consider?' },
        "**One thing decides every parenting case: your child's best interests.** Since the 2024 amendments to the Family Law Act, the court weighs a focused set of factors: your child's safety, their views, their developmental and emotional needs, and each parent's capacity to meet those needs. The benefit of a relationship with both parents is expressly part of that assessment.",
        "Notice what's not on that list: who earns more, who stayed home, or any assumption that children belong with their mother. Fathers who can show consistent, hands-on involvement — school runs, medical appointments, the unglamorous daily routine — present powerfully under this framework. We help you build and document exactly that case.",
        { h2: 'Do I have to go through mediation first?' },
        "**Usually, yes — and that's often good news.** Before applying for parenting orders, most parents must attempt Family Dispute Resolution (FDR) and obtain a section 60I certificate. Agreements reached in mediation are faster, cheaper, and tend to hold up better than orders imposed by a judge, because both parents built them.",
        "We prepare you for FDR the same way we'd prepare you for court: what to propose, what to concede, and where your line is. If mediation isn't appropriate — urgency, family violence, or an ex who won't engage — exemptions exist and we move straight to court.",
        { h2: "What's the difference between a parenting plan and parenting orders?" },
        "**A parenting plan is a written agreement; parenting orders are enforceable by the court.** A plan is flexible and easy to update, but if your ex stops following it, you can't enforce it. Consent orders give the same agreement legal force — breach them, and there are real consequences. Many fathers come to us because a handshake arrangement has been quietly whittled down, weekend by weekend. We'll tell you which structure fits your situation — and when it's time to turn goodwill into orders.",
        { h2: 'What happens if it goes to court?' },
        "**You'll be prepared for every stage, and most matters still settle before a final hearing.** The process runs: filing, an interim hearing (temporary arrangements — often the most important hearing of the whole case for fathers), a family report by a court-appointed expert, sometimes an Independent Children's Lawyer, then dispute resolution, and trial only if all else fails. Your children don't appear in court at any stage. We've walked hundreds of fathers through this exact path — you'll always know where you are and what comes next.",
      ]),
      faqs: [
        {
          question: 'Can a father get 50/50 custody in Australia?',
          answer:
            "Yes, where it's in the child's best interests and practical — courts make equal-time orders regularly, particularly where parents live near each other and both have been hands-on. There is no automatic entitlement for either parent; the arrangement has to work for the child, and we build the evidence that shows it does.",
        },
        {
          question: 'My ex is withholding the kids even though we had an agreement. What can I do?',
          answer:
            "If the agreement is a parenting plan, it isn't enforceable — but it is strong evidence of what you both considered workable, and we can move quickly to formalise it as orders. If court orders are being breached, a contravention application can be filed and the court can enforce compliance, vary arrangements, or impose penalties.",
        },
        {
          question: 'Does it count against me that I work full-time?',
          answer:
            "No. Courts deal in practical arrangements, not point-scoring about hours. A workable proposal built around your real schedule — and showing how you use the time you have — is far more persuasive than an ambitious schedule you can't sustain.",
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: 'Every week you wait becomes the status quo.',
      finalCtaLede:
        'Courts pay attention to existing arrangements. The sooner you act, the more options you have — tell us what\'s happening.',
      metaTitle: 'Parenting Disputes & Custody for Fathers | Mannion Lawyers',
      metaDescription:
        'Securing meaningful, enforceable time with your children after separation. Parenting orders, interim arrangements, and Family Court representation for fathers.',
    },
    {
      title: 'Separation & divorce',
      slug: 'separation-divorce',
      summary: "Clear advice on your rights and obligations from day one, so early decisions don't cost you later.",
      megaMenuBlurb: 'Advice before early decisions cost you',
      eyebrow: 'Separation',
      anchorId: 'separation',
      answerFirst:
        "The decisions you make in the first weeks of separation — about the house, the kids' routine, money — shape everything that follows. Get advice before you agree to anything, not after.",
      detail:
        'From day one we cover living arrangements, interim parenting schedules, financial disclosure, and the divorce application (available 12 months after separation). Early advice routinely prevents the expensive disputes that informal arrangements create.',
      ctaLabel: 'Get advice early',
      pageHeadingLine2: 'the first moves ',
      pageHeadingAccent: 'matter most',
      pageLede:
        "The decisions you make in the first weeks of separation — about the house, the kids' routine, money — shape everything that follows. Get advice before you agree to anything, not after.",
      content: richText([
        { h2: 'Should I move out of the family home?' },
        '**Don\'t decide this in a heated moment — and don\'t assume you have to.** Moving out doesn\'t forfeit your share of the property. But it shapes the practical reality around the children: where they sleep, which school run you do, what "normal" looks like before anyone formalises arrangements. Courts give weight to the status quo. Well-meaning friends routinely tell fathers to "just give her space" — and those fathers spend a year fighting to claw back time that was theirs all along. Talk to us first; sometimes leaving is right, but it should be a strategy, not a reflex.',
        { h2: 'What should I do in the first 30 days?' },
        "**Stabilise the kids' time with you, secure your records, and say less in writing.** Specifically: keep your time with the children consistent and documented. Gather financial records — payslips, statements, super, loan documents — while you still have easy access. Open your own bank account and redirect your pay. Update passwords. Keep every text and email civil; assume a judge will read it one day. Don't sign anything, agree to \"temporary\" arrangements, or move money around without advice.",
        { h2: 'How does divorce actually work in Australia?' },
        "**Divorce is the easy part — it's a paperwork process available 12 months after separation.** Australia has no-fault divorce: the only ground is that the marriage has broken down irretrievably, shown by 12 months of separation. You can even be separated under the same roof — though that needs supporting evidence. The divorce itself doesn't deal with children or property — those are separate processes. It does start a 12-month clock on property claims. We handle the application and make sure the things that actually matter aren't left to drift.",
        { h2: 'We were never married — does any of this apply to me?' },
        '**Yes. De facto fathers have substantially the same rights and obligations regarding children, and similar property entitlements.** Parenting law doesn\'t distinguish between married and unmarried fathers at all. For property, de facto couples (generally two years together, or a child of the relationship) can seek settlement much like married couples — but with a two-year time limit from separation. If you weren\'t married, the clock may already be running.',
      ]),
      faqs: [
        {
          question: 'Do I need to be separated for 12 months before getting any legal help?',
          answer:
            'No — the 12-month rule only applies to the divorce application itself. Parenting arrangements, property settlement, and child support can and should all be dealt with from the moment you separate. Early advice is precisely what prevents the expensive disputes later.',
        },
        {
          question: 'My ex and I agree on everything. Do we still need lawyers?',
          answer:
            "An amicable separation is worth protecting — by making the agreement enforceable. Informal deals are walked back all the time, usually when one person re-partners. Consent orders or a binding financial agreement lock in what you've agreed, often for a modest fixed fee, and independent advice ensures you're not agreeing to less than you'd realise.",
        },
        {
          question: 'Will separation affect how much I see my kids straight away?',
          answer:
            'Only if you let a poor pattern set in. There are no automatic rules about where children live after separation — whatever routine develops in the early months tends to become the reference point. Keep your time consistent, and get arrangements documented early.',
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: "Just separated? This week's decisions echo for years.",
      finalCtaLede: 'One consultation now can save you from the classic early mistakes.',
      metaTitle: 'Separation & Divorce Advice for Fathers | Mannion Lawyers',
      metaDescription:
        "What fathers should do in the first weeks of separation — the family home, the children's routines, and the legal steps that protect your position.",
    },
    {
      title: 'Recovery & relocation orders',
      slug: 'recovery-relocation-orders',
      summary: 'Urgent action when a child has been taken, withheld, or is at risk of being moved away from you.',
      megaMenuBlurb: 'Urgent action when a child is taken or moved',
      eyebrow: 'Urgent matters',
      anchorId: 'recovery',
      answerFirst:
        'If your child has been taken or withheld, or your ex plans to move them away, the court can order their return or prevent the move — and these applications can be made urgently. Time matters: contact us the day it happens.',
      detail:
        'A recovery order brings your child back to you — and can authorise police to locate and return them. Relocation disputes decide whether one parent can move a child far enough to disrupt your time. Both come down to acting fast and getting the right evidence before the court — exactly what we do every week.',
      ctaLabel: 'Get urgent help',
    },
    {
      title: 'Child support',
      slug: 'child-support',
      summary: "Assessments, agreements, and disputes — making sure what you pay or receive is actually fair.",
      megaMenuBlurb: 'Assessments and agreements that are fair',
      eyebrow: 'Support',
      anchorId: 'child-support',
      answerFirst:
        "Services Australia sets child support by formula — but the inputs can be wrong and assessments can be challenged. If your assessment doesn't reflect your real income, your care percentage, or your circumstances, you can do something about it.",
      detail:
        'We handle Services Australia assessments, objections, reviews, and change-of-assessment applications, plus private agreements that give both parents certainty. What you pay — or receive — should be fair. We make sure it is.',
      ctaLabel: 'Review your assessment',
    },
    {
      title: 'Property settlement',
      slug: 'property-settlement',
      summary: "Protecting what you've built. Fair division of assets, superannuation, and debts after separation.",
      megaMenuBlurb: "Protecting what you've built",
      eyebrow: 'Finances',
      anchorId: 'property',
      answerFirst:
        "Property is not automatically split 50/50 in Australia. The division depends on contributions, future needs, and what's just and equitable — which means how your case is argued genuinely changes the outcome.",
      detail:
        "We handle the full settlement: identifying and valuing the asset pool (including super and businesses), negotiating the split, and locking it in so it can't be undone. Strict time limits apply — 12 months after divorce, 2 years after a de facto separation — so don't let a settlement drift.",
      ctaLabel: "Protect what you've built",
    },
    {
      title: 'Consent orders & financial agreements',
      slug: 'consent-orders-agreements',
      summary: "Turning agreements into legally binding, enforceable documents — so handshakes can't be walked back.",
      megaMenuBlurb: 'Make the agreement enforceable',
      eyebrow: 'Agreements',
      anchorId: 'agreements',
      answerFirst:
        "A handshake deal with your ex has no legal force — it can be walked back at any time. Consent orders and binding financial agreements turn what you've agreed into something the law will stand behind.",
      detail:
        "The court approves consent orders without anyone attending. They carry the same force as orders made after a trial. Binding financial agreements can be made before, during, or after a relationship. We draft and review both. We'll tell you which suits your situation — and when a deal on the table is one you shouldn't sign.",
      ctaLabel: 'Formalise your agreement',
    },
  ]

  const createdServices = []
  for (const [i, s] of services.entries()) {
    const created = await payload.create({
      collection: 'services',
      data: {
        ...s,
        showOnHomepage: true,
        showInMegaMenu: true,
        order: i,
      },
    })
    createdServices.push(created)
  }

  console.log('Linking related services...')
  const bySlug = Object.fromEntries(createdServices.map((s) => [s.slug, s]))
  if (bySlug['parenting-disputes']) {
    await payload.update({
      collection: 'services',
      id: bySlug['parenting-disputes'].id,
      data: {
        relatedServices: [
          bySlug['separation-divorce']?.id,
          bySlug['recovery-relocation-orders']?.id,
          bySlug['child-support']?.id,
        ].filter(Boolean),
      },
    })
  }
  if (bySlug['separation-divorce']) {
    await payload.update({
      collection: 'services',
      id: bySlug['separation-divorce'].id,
      data: {
        relatedServices: [
          bySlug['parenting-disputes']?.id,
          bySlug['recovery-relocation-orders']?.id,
          bySlug['child-support']?.id,
        ].filter(Boolean),
      },
    })
  }

  console.log('Seeding Services Page...')
  const recoveryService = createdServices.find((s) => s.slug === 'recovery-relocation-orders')
  await payload.updateGlobal({
    slug: 'services-page',
    data: {
      eyebrow: 'Services',
      headingPlain: 'One client, one focus,',
      headingAccent: 'every matter',
      headingSuffix: 'a father faces.',
      ledeText:
        'Each section below leads with the answer you actually need. If your situation is urgent — a child withheld, a relocation threatened —',
      urgentServiceSlug: recoveryService?.id,
      ctaHeading: 'Not sure which one is you?',
      ctaLede: "Most matters touch more than one of these. Tell us what's happening and we'll map it for you.",
      ctaButtonLabel: 'Book a Consultation',
      ctaButtonHref: '/contact',
      metaTitle: 'Family Law Services for Fathers | Mannion Lawyers',
      metaDescription:
        'Parenting disputes, separation, recovery orders, child support, property settlement and consent orders — exclusively for fathers in NSW and the ACT.',
    },
  })

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
