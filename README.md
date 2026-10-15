# S Packery Inc. — Corporate Website

Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Lucide React · TypeScript

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages
| Route | Page |
|---|---|
| `/` | Home: hero, accreditations, why us, services, process, team, college, call to action |
| `/services` | Services overview: interactive tabs, full service list, process |
| `/services/accounting` · `/taxation` · `/auditing` · `/business-services` | Service detail: intro, who it's for, what's included, FAQs, related services, quote card |
| `/about` | Firm story, leadership profiles, founder quote, commitments, accreditations |
| `/college` | EZ Accounting College (emerald and gold brand): programme, how to apply, application form with CV upload |
| `/quote` | 3-step quote wizard (`/quote?service=auditing` preselects a service) |
| `/contact` | Contact cards and map |

Each page has its own title and description for Google. `sitemap.xml` and `robots.txt` are generated automatically.
Set `NEXT_PUBLIC_SITE_URL` (default `https://www.packery.co.za`) for correct sitemap URLs.

## Structure
```
app/                   One folder per page, plus layout.tsx (shared navbar/footer), template.tsx (page transitions)
components/            Page sections (Hero, ServicesGrid, ServiceDetailView, QuoteWizard, College, About, ...)
lib/site.ts            Firm content: contact, services, team, accreditations, college
lib/serviceDetails.ts  Long-form content for each service page
public/brand/          Official logos
```

## WhatsApp
All WhatsApp buttons use free click-to-chat links (`wa.me/27665572559`). Messages are page-aware (`lib/site.ts` → `waMessages`):
- Everywhere: "Good day S Packery Inc, I'd like assistance with / a quote for your services." (service pages name the service)
- On `/college`: "Good day, I'm interested in joining EZ Accounting College. How can I apply, and what are the requirements?"
No WhatsApp Business API, no add-on fee. Change the number in `lib/site.ts` → `whatsapp`.

## Quote request delivery
Works out of the box (validated + logged server-side, each request gets a reference like SP-50W74K). To receive requests by email,
copy `.env.example` to `.env.local` and set:
- `RESEND_API_KEY` — from resend.com (free tier is sufficient)
- `CONTACT_TO_EMAIL` — firm inbox, e.g. `admin@packery.co.za` (comma-separate for several)
- `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend

EZ College applications (`/api/college-apply`) use the same keys; set `COLLEGE_TO_EMAIL` to send them to a different inbox.
The CV (PDF/Word, max 4 MB) arrives as an email attachment. Each application gets a reference like EZ-A190HY.

On Vercel, add the same keys under Project → Settings → Environment Variables.

## Ask-us assistant ("Ollie")
Animated owl mascot (`components/assistant/`) on every page: blinks, follows the cursor, waves, wears a graduation cap on `/college`.
Answers come only from `lib/assistant.ts` (the firm's own content) — no AI model, so no improvised tax advice.
Unmatched questions are handed to WhatsApp with the visitor's question pre-filled. Add or edit answers in `lib/assistant.ts`.

## Reviews & testimonials
- Google reviews: set `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`. The section stays hidden until the listing has 5+ reviews averaging 4.5+ (cached 24h).
- "Review us on Google" button: set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` (footer + contact page).
- Testimonials: add entries to `testimonials` in `lib/site.ts` (with client permission). Shown when Google reviews don't qualify yet.

## Legal & compliance
- `/privacy` — POPIA privacy notice · `/paia` — PAIA manual (s51) · `/terms` — website terms + ECT Act s43 disclosures. Linked in every footer.
- Google Map loads only after the visitor clicks "Show map" (no Google cookies before consent).
- Forms link to the privacy notice; the college form has explicit POPIA consent.
- Production logs never contain form data (only reference numbers) — configure email delivery before go-live.
- Firm to confirm: S Packery Inc. registration number (`site.regNo` in `lib/site.ts`), Information Officer, retention periods.
  The Information Officer must be registered with the Information Regulator (eServices portal).

## Content sources
Content comes from the firm's own material: Business Profile, Auditing brochures, Postcard 4, finals flyer,
EZ Accounting College partnership proposal, and the "Website information" email (13 Oct 2026).

## Before go-live
- Team photos: after the photoshoot, add headshots to `/public/team/` and swap the initials avatars in `components/About.tsx`.
- Client testimonials: add once collected.
- EZ Accounting College: confirm programme length (proposal says 18 months; meeting mentioned one year).
- Confirm office hours (currently "Weekdays · closes 16:30").

All animations respect the visitor's "reduce motion" OS setting.
