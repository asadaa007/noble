# Noble MEP Solutions

A bespoke Next.js App Router website for NOBLE MEP SOLUTIONS (PRIVATE) LIMITED. The reference informed the business features; this site uses an original forest, ivory and copper design with local fonts and technical SVG illustrations.

## Run locally

Use Node.js 20.9+ (Node 22 LTS recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. For a production build:

```sh
npm test
npm run typecheck
npm run build
npm start
```

## What is included

25 content pages: home, about, services, catalogue, project explorer, contact, two legal drafts, seven service pages, six equipment guides and four city enquiry pages. Also: custom 404, icon, sitemap and robots.

- 20 equipment types with combined search, category and manufacturer filters, details dialogs and six guides.
- Persistent local equipment shortlist and quote handoff; unknown or corrupt saved IDs are discarded.
- Accessible technology tabs, FAQs, mobile navigation, light/dark themes and reduced-motion support.
- Eight **illustrative** project briefs with sector/city/search filters, capacity/name sorting, grid/table view, gallery navigation and capacity comparison.
- Validated contact form with service selections, equipment removal, download-as-text and server delivery integration.
- Configurable phone/email/WhatsApp/address/map. Unconfigured channels are not fabricated.

## Content editing

- Company details: `src/lib/company.ts` and `.env.local`.
- Logo: replace temporary mark in `src/components/brand.tsx`; replace `src/app/icon.svg` too.
- Service copy: `src/lib/services.ts`.
- Equipment/manufacturer data: `src/lib/products.ts`.
- Projects: `src/lib/projects.ts`. Current examples and capacities are demonstrations, not company accomplishments. Replace them with approved real project records and images, then update all illustrative disclosures deliberately.
- Design tokens/responsive styles: `src/app/globals.css`.
- Stage-by-stage decisions and verification: `BUILD_PLAN.md`.

## Enquiry delivery contract

The form POSTs JSON to `/api/enquiry`. The server validates data, rejects unexpected origins, enforces a 24 KB request limit, checks a honeypot and applies a process-local limit of 5 attempts per 10 minutes. It does not save enquiry contents locally or log them.

Set `ENQUIRY_WEBHOOK_URL` to a company-controlled **HTTPS** endpoint and optionally `ENQUIRY_WEBHOOK_TOKEN` to a secret bearer token. Neither variable uses `NEXT_PUBLIC_`. The receiving endpoint must accept this payload and return a 2xx status **only once it has durably accepted the enquiry** (for example, queued an email or created a CRM record):

```json
{
  "type": "website-enquiry",
  "enquiry": {
    "name": "Example",
    "email": "person@example.com",
    "phone": "",
    "organisation": "",
    "city": "Lahore",
    "message": "Project requirements of at least 20 characters",
    "services": ["hvac-services"],
    "products": ["ahu"],
    "consent": true,
    "website": ""
  },
  "brief": "Readable plain-text enquiry",
  "submittedAt": "ISO timestamp"
}
```

Requests time out after 12 seconds. Redirects are rejected. No configured endpoint → HTTP 503 with a truthful not-sent message; failed or timed-out delivery → HTTP 502 with an unconfirmed-delivery message. Visitors can always download the brief locally. The download does not transmit data. A 2xx means accepted by the receiving service, not proof that a person has read the email.

For deployment behind a proxy, preserve the original `Host` header so same-origin checks work. Configure the platform to replace, rather than trust, client-supplied forwarding headers. The in-process rate limiter is only a supplementary guard: add a shared edge/WAF or Redis-backed rate limit for multiple instances/serverless, and implement deduplication/retry policy in the receiving service. Test a real delivery to an approved destination before launch. No production email provider, credentials or CRM was supplied, so external delivery is intentionally not configured or tested here.

## Launch dependencies

1. Supply final logo, phone/WhatsApp, email and physical address/map if applicable.
2. Confirm the proposed service range and manufacturer relationships. Currently all equipment uses `Project-selected`; the manufacturer filter becomes richer as real authorized records are added.
3. Supply actual projects, approved photos and any verified qualifications. No PEC category, invented clients, performance totals or office network is claimed.
4. Review and finalize privacy/terms drafts, enquiry retention, hosting/delivery providers and privacy contact.
5. Configure and end-to-end test enquiry delivery, HTTPS hosting and production spam protection.
6. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin; rebuild after public environment changes. Once all content is approved, set `SITE_LAUNCH_READY=true` and rebuild to allow indexing. Legal draft routes remain noindex until explicitly finalized in their metadata.

No publishing or production account setup is included in this local delivery.

## Image sources

Illustrative architectural photography from Unsplash, downloaded locally for this build (not copied from the reference site):

- `architecture.jpg`: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- `interior.jpg`: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- `building.jpg`: https://images.unsplash.com/photo-1497366811353-6870744d04b2
- `industrial.jpg`: https://images.unsplash.com/photo-1581094794329-c8112a89af12

These images do not depict verified Noble projects. Technical SVG drawings are original schematic illustrations. DM Sans and Manrope are installed font packages; Lucide supplies UI icons.

## WhatsApp chat

The floating chat widget appears on every page and opens a conversation with the confirmed business number **+92 345 7163313**. Visitors can edit a draft, continue to WhatsApp and send it there. No WhatsApp API credentials are needed, and no message is sent automatically. The contact page also provides a direct link. Override the number with `NEXT_PUBLIC_WHATSAPP` and rebuild when changing it. The widget does not store drafts or load third-party chat scripts.

Implementation follows [WhatsApp click-to-chat documentation](https://faq.whatsapp.com/5913398998672934).
