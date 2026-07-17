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
      pageHeadingLine1: 'Recovery & relocation',
      pageHeadingLine2: 'when ',
      pageHeadingAccent: 'hours',
      pageLede:
        'If your child has been taken or withheld, or your ex plans to move them away, the court can order their return or prevent the move — and these applications can be made urgently, sometimes within days. Call us the day it happens, not the week after.',
      content: richText([
        { h2: 'What is a recovery order?' },
        "**A recovery order is a court order requiring a child to be returned — and it can authorise police to find and return them.** Fathers can apply whether or not parenting orders already exist, though existing orders make the path faster. The court can also issue orders preventing the child from being removed again, and in genuine emergencies, applications can be heard urgently. The court wants to see acted-on urgency, a clear picture of the child's circumstances, and a workable plan for their care on return. We put that together fast.",
        { h2: 'My ex wants to move the kids to another city or state. Can they?' },
        "**Not unilaterally — relocation that significantly affects your time with the children needs your agreement or a court order.** If you don't agree, the court decides based on your child's best interests, weighing the reasons for the move against the cost to the child's relationship with you. These are winnable cases for fathers. Courts refuse relocations regularly, especially where the child's relationship with dad is strong and the reasons for moving are thin. The worst thing you can do is grumble but not act — consent by inaction is still consent.",
        { h2: "What if I'm worried about an overseas move?" },
        '**Act immediately — international cases are far harder to unwind after the fact.** If you believe your child may be taken overseas without your agreement, the court can add their name to the Family Law Watchlist. This alerts the Australian Federal Police at every airport and seaport. This can be done urgently, sometimes the same day. If a child has already been taken to a Hague Convention country, return proceedings are possible — but slow and uncertain. Prevention is the better fight.',
        { h2: 'What should I do right now?' },
        "**Three things: write down the timeline while it's fresh, gather your evidence, and call us.** Note dates, messages, and exactly what was said about the move or the withholding. Keep your own communication calm and in writing. Don't retaliate by withholding the children when you next have them — it feels fair and it damages your case. Then get advice the same day. In this area more than any other, the gap between fathers who act in days and fathers who act in months shows up directly in outcomes.",
      ]),
      faqs: [
        {
          question: 'How fast can a recovery order be made?',
          answer:
            "In genuinely urgent cases, an application can be filed and heard within days — occasionally faster where a child's safety or imminent overseas travel is involved. Speed depends heavily on how quickly the evidence is assembled, which is exactly what we do.",
        },
        {
          question: 'Do I need existing parenting orders to apply for a recovery order?',
          answer:
            'No. A father without orders can still apply — the court simply deals with the recovery application alongside an application for parenting orders. Existing orders make the breach clear-cut, but their absence is no reason to wait.',
        },
        {
          question: "My ex says she'll move anyway and I can 'see them in the holidays.' Is that legal?",
          answer:
            "Not if it significantly cuts across your relationship with the children and you haven't agreed. You can apply for orders preventing the relocation before it happens — which is a far stronger position than seeking the children's return afterwards. Treat the threat itself as the trigger to act.",
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: "If this is happening to you right now, don't book — call.",
      finalCtaLede: "Recovery and relocation matters are won early. Tell us today and we'll tell you today what can be done.",
      metaTitle: 'Recovery & Relocation Orders | Mannion Lawyers',
      metaDescription:
        'Urgent legal action when your child has been taken, withheld, or is about to be moved. Recovery orders and relocation advice for fathers across NSW and the ACT.',
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
      pageHeadingLine2: 'fair is the ',
      pageHeadingAccent: 'whole point',
      pageLede:
        "Services Australia sets child support using a formula — but the inputs can be wrong, and you can challenge the assessment. If your assessment doesn't reflect your real income, your nights of care, or your circumstances, you can do something about it. Supporting your kids and being treated fairly are not in conflict.",
      content: richText([
        { h2: 'How is child support calculated?' },
        "**Services Australia uses a formula built on both parents' taxable incomes, the number and ages of the children, and the percentage of nights each parent cares for them.** Two inputs matter most. First, your care percentage: each extra band of overnight care reduces what you pay, because you're meeting costs directly during that time. This is one more reason parenting arrangements and child support should be handled together, not separately. Second, the income figures: if your ex's income is understated, or yours is overstated by a one-off year, the assessment is wrong from the start.",
        { h2: "The assessment doesn't reflect reality. What can I do?" },
        "**Object, or apply for a change of assessment — there are ten recognised special-circumstance grounds.** Common grounds for fathers: the other parent's real earning capacity is higher than their declared income; your contact costs are high (travel after a relocation, for instance); you're meeting costs directly, like school fees or health insurance; or the assessment doesn't reflect your actual income after a job loss. Strict timeframes apply to objections. How the application is argued genuinely affects the outcome — this is detail work, and it's work we do every day.",
        { h2: 'Can we just agree on an amount privately?' },
        "**Yes — through a limited or binding child support agreement, which can give both parents certainty the formula never will.** A binding agreement — where each parent gets independent legal advice — can fix amounts, cover specifics like school fees or orthodontics, and stop the annual reassessment lottery. For self-employed fathers and those with variable income, an agreement is often far better than the formula. We draft them, and just as importantly, we'll tell you when an agreement on the table is one you shouldn't sign.",
        { h2: "What if I genuinely can't pay right now?" },
        "**Deal with it head-on — arrears don't disappear — but assessments can be corrected and payments arranged.** If your income has dropped, an estimate can adjust your assessment going forward. If debt has accrued, negotiated payment arrangements prevent enforcement action like tax-refund interception or departure prohibition orders. What never works is ignoring it: child support debt is among the most aggressively enforced debts in Australia. Engaging early, with the right paperwork, keeps you in control of the conversation.",
      ]),
      faqs: [
        {
          question: 'My ex refuses to work but could. Do I just pay more forever?',
          answer:
            "Not necessarily. A change of assessment can be sought where a parent's earning capacity — not just their declared income — should be taken into account. These applications turn on evidence of qualifications, work history and genuine opportunities, and they succeed regularly when properly prepared.",
        },
        {
          question: 'Does paying child support guarantee me time with my kids?',
          answer:
            "No — and the reverse is also true: being behind on child support doesn't reduce your right to see your children. The two systems are legally separate. If you're paying faithfully but being denied time, that's a parenting matter, and we can act on it.",
        },
        {
          question: "I'm self-employed and my income swings year to year. How does that work?",
          answer:
            "Formula assessments handle variable income badly. Self-employed fathers are prime candidates for regular income estimates or a binding agreement that sets sensible fixed amounts. We'll look at your figures and tell you which puts you in the fairest position.",
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: "Paying fairly shouldn't mean paying blindly.",
      finalCtaLede: "Bring us your assessment. We'll tell you within one conversation whether it's worth challenging.",
      metaTitle: 'Child Support for Fathers | Mannion Lawyers',
      metaDescription:
        'Child support assessments, change of assessment applications, private agreements and enforcement — making sure what you pay or receive is actually fair.',
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
      pageHeadingLine2: "protecting what you've ",
      pageHeadingAccent: 'built',
      pageLede:
        "Property is not automatically split 50/50 in Australia. The split depends on contributions, future needs, and what's fair — and how your case is presented genuinely changes the outcome. Strict time limits also apply.",
      content: richText([
        { h2: 'How is property actually divided?' },
        '**Through a four-step process: identify the pool, assess contributions, weigh future needs, and check the result is just and equitable.** The pool includes everything — the house, savings, superannuation, businesses, vehicles, and debts — regardless of whose name they\'re in. Contributions cover both financial (income, deposits, inheritances) and non-financial (homemaking, parenting, renovations you did yourself). Future needs adjust for income capacity, health, age, and who cares for the children. Each step is argued. That\'s exactly why representation matters.',
        { h2: "I earned most of the money. Doesn't that count?" },
        "**It counts — alongside everything else.** The law treats homemaking and parenting as real contributions, so a father who was the sole earner won't simply receive everything he paid for. Financial contributions are weighed seriously — particularly assets you brought into the relationship, inheritances, and post-separation earnings. Fathers lose cases unnecessarily when contributions were never properly documented. We document your contributions thoroughly — including the non-financial ones fathers routinely undersell: the renovation, the school runs, the years of weekend parenting.",
        { h2: 'What about my superannuation and my business?' },
        "**Both are part of the pool — and both reward careful handling.** Super can be split without being cashed out. That opens up trades: many fathers keep the family home or business by conceding more super, or vice versa, depending on age and goals. A business needs a sensible valuation — overstated valuations are one of the most common ways fathers get squeezed, and we know how to challenge them. The right structure here is the difference between a settlement you recover from and one you don't.",
        { h2: 'How long do I have?' },
        '**Twelve months from a divorce becoming final, or two years from the end of a de facto relationship.** Miss the deadline and you need the court\'s permission to apply at all — which isn\'t guaranteed. Just as dangerous is informal drift. "She kept the house, I kept my super" arrangements that were never formalised can be reopened years later — often when the other party re-partners or asset values shift. A settlement isn\'t finished until it\'s in consent orders or a binding financial agreement — until then, you\'re exposed.',
      ]),
      faqs: [
        {
          question: 'Do I lose the house if the kids live with their mum most of the time?',
          answer:
            'Not automatically. The children\'s housing is a future-needs factor — one factor among many. It can be met different ways: a larger share of other assets, deferred sale arrangements, or you keeping the home. The outcome is negotiated, not preordained.',
        },
        {
          question: 'Can my ex claim assets I owned before we met?',
          answer:
            'Pre-relationship assets go into the pool — but bringing an asset in counts as a contribution credited to you. The longer the relationship, the more that contribution dilutes. How it\'s argued and documented materially affects the result.',
        },
        {
          question: 'We sorted property between ourselves years ago. Am I safe?',
          answer:
            "Only if it was formalised through consent orders or a binding financial agreement. Informal splits can be reopened, and time limits can be extended with the court's permission in some cases. If your settlement is a handshake, it's worth one conversation to close that door properly.",
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: 'The clock on property claims is already running.',
      finalCtaLede:
        'Twelve months from divorce, two years from de facto separation. Find out where you stand while every option is still open.',
      metaTitle: 'Property Settlement for Fathers | Mannion Lawyers',
      metaDescription:
        'How property is divided after separation in Australia. The four-step process, superannuation splitting, the family home, and binding financial agreements.',
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
      pageHeadingLine1: 'Consent orders & BFAs',
      pageHeadingLine2: 'make the deal ',
      pageHeadingAccent: 'stick',
      pageLede:
        "An informal agreement with your ex has no legal force — and it can be walked back at any time, usually at the worst possible moment. Consent orders and binding financial agreements turn what you've agreed into something the law will stand behind.",
      content: richText([
        { h2: 'What are consent orders?' },
        "**Consent orders are your agreement, approved by the court, with the same legal force as orders made after a trial — and nobody has to attend a hearing.** They can cover parenting arrangements, property division, superannuation splits, or all of them. You file the application. A registrar checks the parenting terms serve the children's best interests and the property terms are fair. Once approved, the orders are enforceable. For most separated fathers with a workable agreement, this is the cleanest, most cost-effective way to lock it in.",
        { h2: "What's a binding financial agreement, and when is it better?" },
        '**A BFA is a private contract — no court approval — that can be made before, during, or after a relationship.** Its strengths are privacy and flexibility: terms a court might not approve, arrangements made before you move in together (the "prenup"), or settlements both parties want kept entirely out of the court system. The trade-off is fragility. A BFA is only binding if strict requirements are met — including genuinely independent legal advice for both parties. Poorly drafted ones get set aside. For most post-separation settlements, consent orders are the right choice. BFAs suit situations where timing or privacy demands it. We\'ll tell you straight which fits your facts.',
        { h2: "I'm re-partnering. Should I think about this before moving in?" },
        "**Yes — especially if you came out of the last settlement with assets to protect.** A de facto relationship can give your new partner property claims after as little as two years — or sooner if you have a child together. A BFA made before or early in the relationship can quarantine what you've rebuilt — the house, the super, the business — while still being fair to your partner. Fathers rarely want to raise this conversation; almost every father we've helped through a second settlement wishes he had.",
        { h2: "Why can't we just write something up ourselves?" },
        "**Because the document's power comes entirely from how it's made.** A homemade agreement is evidence of intentions, nothing more. Consent orders are only enforceable because a registrar approved them; a BFA is only binding because the formalities — including certified independent legal advice — were strictly met. There's also a protective angle: independent advice means someone whose only job is your interests reads the deal before you sign it. We regularly stop fathers from signing agreements that looked fine and weren't.",
      ]),
      faqs: [
        {
          question: 'Do consent orders require going to court?',
          answer:
            'No hearing and no court appearance — the application is considered by a registrar on the papers. If the terms are fair and properly drafted, orders are usually made within weeks.',
        },
        {
          question: 'Can consent orders or a BFA ever be changed?',
          answer:
            "Parenting orders can be varied where circumstances change significantly. Property orders and BFAs are designed to be final, and are only set aside in limited situations — fraud, non-disclosure, or defective formalities. That finality is precisely the point: it's why they protect you.",
        },
        {
          question: "My ex sent me an agreement her lawyer drafted. Should I just sign it?",
          answer:
            "Never without your own advice — and for a BFA, you legally can't make it binding without it. A document drafted by your ex's lawyer was drafted to serve your ex's interests. A fixed-fee review is cheap insurance against signing away more than you realise.",
        },
      ],
      showUrgentCallout: true,
      finalCtaHeading: "A deal isn't done until it's enforceable.",
      finalCtaLede: "Bring us what you've agreed — or what you've been asked to sign. Fixed-fee drafting and review.",
      metaTitle: 'Consent Orders & Financial Agreements | Mannion Lawyers',
      metaDescription:
        'Turning agreements into legally binding, enforceable documents. Consent orders and binding financial agreements for fathers across NSW and the ACT.',
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
  const relatedMap: Record<string, string[]> = {
    'parenting-disputes': ['separation-divorce', 'recovery-relocation-orders', 'child-support'],
    'separation-divorce': ['parenting-disputes', 'recovery-relocation-orders', 'child-support'],
    'recovery-relocation-orders': ['parenting-disputes', 'separation-divorce', 'child-support'],
    'child-support': ['parenting-disputes', 'separation-divorce', 'recovery-relocation-orders'],
    'property-settlement': ['parenting-disputes', 'separation-divorce', 'recovery-relocation-orders'],
    'consent-orders-agreements': ['parenting-disputes', 'separation-divorce', 'recovery-relocation-orders'],
  }
  for (const [slug, relatedSlugs] of Object.entries(relatedMap)) {
    if (!bySlug[slug]) continue
    await payload.update({
      collection: 'services',
      id: bySlug[slug].id,
      data: {
        relatedServices: relatedSlugs.map((s) => bySlug[s]?.id).filter(Boolean),
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

  console.log('Seeding Resources...')
  const resources = [
    {
      title: "Father's rights in Australia: what every dad needs to know",
      slug: 'fathers-rights-australia',
      eyebrow: "Fathers' rights",
      excerpt:
        'What the Family Law Act actually says, the myths about fathers in family court, and what to do immediately after separation.',
    },
    {
      title: 'Child custody for fathers: how parenting arrangements are decided',
      slug: 'child-custody-fathers',
      eyebrow: 'Parenting',
      excerpt:
        'Parenting orders vs plans, equal time, overnight arrangements, and the evidence that actually helps your case.',
    },
    {
      title: "What to do if you're being kept from your children",
      slug: 'kept-from-children',
      eyebrow: 'Parenting',
      excerpt:
        'How to document denied contact, when to go to court urgently, and the mistakes fathers make that hurt their case.',
    },
    {
      title: 'Family court for fathers: a step-by-step guide',
      slug: 'family-court-guide',
      eyebrow: 'Court process',
      excerpt:
        'From mediation requirements through to final orders — what to expect at every stage, with realistic timelines and costs.',
    },
    {
      title: 'Child support explained for fathers',
      slug: 'child-support-explained',
      eyebrow: 'Child support',
      excerpt:
        "How child support is calculated, how shared care affects payments, and how to change an assessment that isn't fair.",
    },
    {
      title: 'Property settlement after separation: what fathers need to know',
      slug: 'property-settlement-fathers',
      eyebrow: 'Property',
      excerpt:
        'The four-step process, superannuation splitting, the family home, time limits, and binding financial agreements.',
      heroLede:
        "Property settlement is not about splitting everything down the middle. It's about reaching a result that is just and equitable — and knowing how to get there.",
      articleAuthor: paul.id,
      updatedLabel: 'Updated June 2026',
      readTime: '10 min read',
      datePublished: '2026-06-12',
      sections: [
        {
          heading: 'Who gets what?',
          anchorId: 'who-gets-what',
          body: richText([
            'Australian family law does not use a fixed formula for property division. There is no rule that says each party gets 50%. Instead, the court asks what is "just and equitable" given the particular circumstances of the relationship — and reaches a result that may be anywhere along that spectrum.',
            'In practice, outcomes vary considerably. Short relationships with few joint assets tend toward a more even or contributions-based split. Long relationships, particularly where one parent has been the primary carer and earner respectively, may result in adjustments that reflect those different roles. The starting point is always the actual contributions each party made — financial and non-financial — and the future needs of each party.',
            "One common misconception: property you brought into the relationship or inherited during it is not automatically protected. All property owned by either party — regardless of when it was acquired or whose name it is in — is part of the asset pool to be divided. How a particular asset is treated depends on when it was acquired, its current value, and the overall circumstances of the relationship.",
          ]),
          cta: {
            heading: "Worried about protecting what you've built?",
            text: "We'll give you an honest picture of what's in the pool, what's likely, and how to approach settlement strategically.",
            buttonLabel: 'Property settlement services',
            buttonHref: '/property-settlement',
          },
        },
        {
          heading: 'The four-step property settlement process',
          anchorId: 'four-steps',
          body: richText([
            'Courts use a structured four-step process to arrive at a property settlement. Understanding it helps you understand what matters and where leverage sits.',
            '**Step 1 — Identify and value the asset pool.** Every asset and liability owned by either party is identified and valued. This includes real estate, vehicles, superannuation, shares, business interests, bank accounts, and debts. Full and frank financial disclosure is required from both parties — concealing assets is a serious matter that courts treat severely.',
            '**Step 2 — Assess contributions.** The court considers what each party contributed to the relationship — both financial contributions (income, assets brought in, inheritances) and non-financial contributions (homemaking, parenting, unpaid work in a family business). Neither type of contribution automatically trumps the other. A parent who spent years as the primary carer while the other built a career has made substantial contributions — they are just harder to put a dollar value on.',
            "**Step 3 — Adjust for future needs.** The court then considers factors that affect each party's capacity to meet their future needs. These include: the age and health of each party, their income and earning capacity going forward, whether one party has primary care of children (and the financial impact that has), and the duration of the relationship. Adjustments at this step can significantly shift a settlement from the contributions position.",
            '**Step 4 — Is the outcome just and equitable?** The court asks whether the proposed division, having regard to all of the above, is just and equitable overall. This is a check on the process — the court is not bound to reach a particular figure even if the formula would suggest one.',
          ]),
          cta: {
            heading: 'Not sure where you sit in the four-step process?',
            text: "We'll walk you through it with your specific assets and circumstances in mind.",
            buttonLabel: 'Book a consultation',
            buttonHref: '/contact',
          },
        },
        {
          heading: 'Superannuation splitting',
          anchorId: 'superannuation',
          body: richText([
            'Superannuation is treated as property in Australian family law and is subject to division. It is not automatically split 50/50 — it is part of the asset pool and is divided as part of the overall settlement.',
            "Superannuation is typically split by a superannuation splitting order, which directs the trustee of one party's fund to transfer a specified amount to the other party's nominated fund. The split takes effect immediately in accumulation funds; in defined benefit funds, the mechanism is more complex.",
            'A few things fathers commonly misunderstand about super splitting:',
            {
              list: [
                'A super split does not mean you lose access to funds immediately — they remain in superannuation until the other party reaches preservation age',
                "The other party's super is also part of the pool — if they have a larger balance, that affects the overall outcome",
                'Super splitting must be formally documented through a court order or binding financial agreement — a verbal agreement about super has no legal effect',
              ],
            },
          ]),
        },
        {
          heading: 'The family home',
          anchorId: 'family-home',
          body: richText([
            'The family home is often the largest single asset in a property settlement — and one of the most emotionally charged. Common outcomes include:',
            {
              list: [
                'Sale and division of proceeds — the cleanest outcome, allowing both parties to move forward with liquid assets',
                "One party buys out the other — typically requires refinancing the mortgage in one name alone; the lender's approval is required",
                'Deferred sale — the home is not sold immediately, usually to provide stability for children while they are young, with a sale (and division) triggered by a specified future event',
              ],
            },
            'Where children are involved, the parent with primary care often seeks to remain in the family home. Courts consider this but do not automatically grant it — the financial practicality of maintaining the home on a single income and the overall fairness of the settlement both matter.',
            'If you are the father who has moved out of the family home, do not assume you have lost your interest in it. Your ownership stake continues until the property is formally dealt with by settlement or court order. Continuing to pay the mortgage is legally complex — get advice on your position and obligations.',
          ]),
          cta: {
            heading: 'Moved out of the family home?',
            text: "Your interest in the property does not disappear. We'll advise you on how to protect it.",
            buttonLabel: 'Talk to us',
            buttonHref: '/contact',
          },
        },
        {
          heading: 'Time limits',
          anchorId: 'time-limits',
          body: richText([
            'This is one of the most important things to know: there are strict time limits on property settlement applications.',
            {
              list: [
                'De facto couples: must apply within 2 years of the end of the relationship',
                'Married couples: must apply within 12 months of a divorce order becoming final',
              ],
            },
            "Missing the time limit does not make a claim impossible — but it requires the court's permission to file out of time, which is not guaranteed and adds cost and uncertainty. Many fathers delay property settlement because it feels less urgent than parenting matters, then find themselves out of time.",
            'The critical takeaway: do not allow a property settlement to drift. Even if you reach an informal agreement with the other party, that agreement has no legal effect until it is formalised by consent orders or a binding financial agreement. Without formalisation, either party can resile from the agreement at any time — and your time limit continues to run.',
          ]),
        },
        {
          heading: 'Binding financial agreements',
          anchorId: 'bfa',
          body: richText([
            'A Binding Financial Agreement (BFA) — sometimes called a prenuptial agreement or "financial agreement" — is a contract between the parties that deals with how property will be divided. BFAs can be made before a relationship, during it, or after separation.',
            'Unlike consent orders, a BFA does not require court approval. Each party must receive independent legal advice before signing — and the lawyer for each party must provide a signed certificate confirming advice was given. This requirement is not optional; without it, the agreement can be set aside.',
            'A properly executed BFA provides certainty and privacy — the details of your financial arrangements are not on the public record as they would be with court proceedings. It can be particularly useful where there are complex business interests, significant inherited assets, or where speed and confidentiality matter.',
            'BFAs can also be set aside by a court in certain circumstances — if there was fraud, duress, or a significant change in circumstances that makes it unjust to enforce. This is why quality of drafting and proper advice at the time of execution matters enormously.',
          ]),
        },
      ],
      finalCta: {
        heading: "Protect what you've built.",
        text: 'Property settlement is one of the most consequential financial events of your life. Getting it wrong is costly and often irreversible. We\'ll make sure you go into it informed and properly represented.',
        buttonLabel: 'Book a consultation',
        buttonHref: '/contact',
      },
      relatedItems: [
        {
          label: 'Property settlement',
          description: 'Our property settlement legal services',
          href: '/property-settlement',
        },
        {
          label: 'Consent orders & BFAs',
          description: 'Making agreements legally binding',
          href: '/consent-orders-agreements',
        },
        {
          label: 'Child support explained',
          description: 'How child support is calculated',
          href: '/resources/child-support-explained',
        },
      ],
      metaTitle: 'Property Settlement After Separation | Mannion Lawyers',
      metaDescription:
        'The four-step property settlement process, superannuation splitting, the family home, time limits, and binding financial agreements — explained for fathers.',
    },
    {
      title: "Parenting orders in Australia: a father's guide",
      slug: 'parenting-orders-guide',
      eyebrow: 'Parenting',
      excerpt: 'Types of parenting orders, how to get them, and what to do if the other party is breaching them.',
    },
  ]
  for (const [i, r] of resources.entries()) {
    await payload.create({ collection: 'resources', data: { ...r, order: i } })
  }

  console.log('Seeding Resources Page...')
  await payload.updateGlobal({
    slug: 'resources-page',
    data: {
      eyebrow: 'Resources',
      headingPlain: 'Guides for fathers',
      headingAccent: 'navigating family law',
      ledeText:
        'Practical, plain-English guides on parenting disputes, property, child support, and what to expect at every stage.',
      metaTitle: 'Resources for Fathers | Mannion Lawyers',
      metaDescription:
        'Practical guides for fathers navigating separation, parenting disputes, property settlement and child support across NSW and the ACT.',
    },
  })

  console.log('Done. Visit /admin to review and add real photos.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
