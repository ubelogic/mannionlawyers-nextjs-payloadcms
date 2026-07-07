# Mannion Lawyers — Next.js + PayloadCMS

A rebuild of the Mannion Lawyers ("Family Law for Fathers") homepage as a
Next.js 16 app with PayloadCMS 3 wired in as the CMS — everything on the
homepage (hero text, services, testimonials, FAQs, offices, nav, footer) is
editable from `/admin`, no code changes needed.

This is page 1 of the site (homepage + shared header/footer). Send along the
other pages when you're ready and they can be added the same way.

## What's inside

- **Next.js 16** (App Router, TypeScript)
- **PayloadCMS 3**, mounted directly inside the Next.js app (single repo,
  single deploy — no separate CMS server)
- **MongoDB** as the database (via `@payloadcms/db-mongodb`)
- **Vercel Blob** for media storage in production (logo, hero photo, service
  images — serverless functions have no persistent disk)
- The original design system (colors, type scale, spacing, animations)
  carried over faithfully from `styles.css` into `src/app/(site)/globals.css`

### Content model

| Type | Slug | Purpose |
|---|---|---|
| Global | `header` | Nav links, mega-menu copy, "Book a Consultation" CTA |
| Global | `footer` | Footer columns, office phone numbers, legal text |
| Global | `home-page` | Every homepage section: hero, video, services intro, process steps, about teaser, testimonials intro, FAQ intro, locations intro, final CTA |
| Collection | `services` | The 6 practice areas — homepage cards + mega-menu items + (later) their own pages |
| Collection | `testimonials` | Client quotes |
| Collection | `faqs` | FAQ accordion |
| Collection | `offices` | The 4 office locations |
| Collection | `media` | Uploaded images |
| Collection | `users` | Admin login |

## Local setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Get a MongoDB database.** Easiest free option: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) → create a free M0 cluster → "Connect" → copy the connection string.

3. **Copy the env file and fill it in**

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URI` — your MongoDB connection string
   - `PAYLOAD_SECRET` — any long random string (`openssl rand -base64 32`)
   - Leave `BLOB_READ_WRITE_TOKEN` empty locally — uploads will just save to disk in dev.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   - Site: http://localhost:3000
   - Admin: http://localhost:3000/admin — first visit prompts you to create the first admin user.

5. **Seed starter content** (optional but recommended — fills in all the homepage
   text/testimonials/FAQs/offices from the original site so you're not starting
   from a blank CMS):

   ```bash
   npm run seed
   ```

   This does **not** include photos (the logo, hero photo, service images,
   about photo) since those weren't part of what was handed over. After
   seeding, go to `/admin` → **Media**, upload the real photos, then attach
   them to: Header → Logo, Home Page → Hero/About images, and each Service →
   Image.

## Deploying to Vercel

1. **Push this repo to GitHub** (see below).
2. **Import the repo in Vercel** ([vercel.com/new](https://vercel.com/new)).
3. **Add environment variables** in the Vercel project settings (same as your `.env`):
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL` — set to your production URL, e.g. `https://your-site.vercel.app`
4. **Add Vercel Blob storage**: in your Vercel project → Storage → Create Database → Blob. Vercel automatically injects `BLOB_READ_WRITE_TOKEN` into your project once it's linked — no manual copy/paste needed.
5. Deploy. Visit `/admin` on your live URL to create your admin user and (if you haven't already) run the seed script against your production database, or just enter content by hand.

### Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js + PayloadCMS homepage"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Notes

- The homepage route is set to `force-dynamic` so content edits in `/admin`
  show up immediately without a rebuild.
- Images use Next.js's `<Image>` component. If you add another remote image
  host later (besides Vercel Blob), add it to `images.remotePatterns` in
  `next.config.mjs`.
- The original site's `main.js` behaviors (mobile nav, mega-menu, scroll
  reveal, sticky mobile CTA, click-to-load video) were reimplemented as React
  client components: `SiteHeader`, `StickyCta`, `RevealInit`, `VideoFacade`.
