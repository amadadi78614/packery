# S Packery Inc. — Corporate Website

Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Lucide React · TypeScript

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
```
app/
  layout.tsx           Metadata, fonts, JSON-LD (AccountingService schema)
  page.tsx             Section composition
  globals.css          Theme tokens + utility components
  api/contact/route.ts Quote endpoint (validation, honeypot, rate limit, reference no., optional email)
components/
  Hero.tsx             Aurora background, rotating badge, word cycler, animated dashboard, count-ups
  Marquee.tsx          Scrolling gold services ticker
  WhyUs.tsx            "Why visit us" — six client outcomes, staggered reveal
  Services.tsx         Interactive tabs, animated panel, spotlight hover, per-service quote CTA
  Process.tsx          Four-step timeline that draws as you scroll
  QuoteWizard.tsx      3-step Get-a-Quote flow (services → profile → details) with reference number
  About.tsx            Firm story + partner card + quote
  CtaBand.tsx          Closing call to action
  Contact.tsx          Contact cards + embedded Google Map
  MobileBar.tsx        Sticky Call / Get a Quote bar on phones
  motion.tsx           Reveal, CountUp, requestQuote helpers
lib/site.ts            ALL firm data (name, phone, partner, services) — edit here
```

## Quote request delivery
Works out of the box (validated + logged server-side, each request gets a reference like SP-50W74K). To receive requests by email,
copy `.env.example` to `.env.local` and set:
- `RESEND_API_KEY` — from resend.com (free tier is sufficient)
- `CONTACT_TO_EMAIL` — firm inbox (comma-separate for several)
- `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend

On Vercel, add the same keys under Project → Settings → Environment Variables.

## Before go-live
- Replace the monogram in `components/Logo.tsx` with the firm's official logo file (`/public/logo.svg`).
- Add a professional headshot to `/public` and swap the initials avatar in `components/About.tsx`.
- Confirm office hours (currently "Weekdays · closes 16:30") and add street address / email if desired in `lib/site.ts` and `components/Contact.tsx`.
- Confirm practice registration details (e.g. SAICA / IRBA numbers) for the footer if the firm wants them displayed.

All animations respect the visitor's "reduce motion" OS setting.
"# packery" 
