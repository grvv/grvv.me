# grvv.me — Project Plan

Personal portfolio, blog, and admin platform for **grvv.me**, built to showcase
React/Node, backend, and AI engineering skills.

---

## Goals

1. **Professional email** on the domain for recruiters (send + receive).
2. **Minimal portfolio site** at `https://grvv.me` (inspiration: puneet.sh).
3. **Blog** with articles published from an **admin panel** (web).
4. **React Native app** (Expo) to write/publish posts from a phone.
5. **AI features** that double as portfolio showcases.

---

## Decisions

| Area | Decision | Notes |
|---|---|---|
| Registrar | **GoDaddy** (stays — prepaid 3 years) | Only nameservers move to Cloudflare |
| DNS | **Cloudflare** (free) | DNS, SSL, CDN, analytics, R2 in one place |
| Email | **Google Workspace Business Starter** (₹99/mo offer) | Gmail UX, best deliverability, Meet/Calendar/Drive on the pro identity |
| Addresses | `hi@grvv.me` mailbox + six category aliases (`hello`, `work`, `jobs`, `dev`, `promo`, `alerts`), sorted by Gmail filters, catch-all off | See *Email address map* below |
| Design | Minimal, text-first, dark/light | |

---

## Architecture

```
grvv/                      (pnpm + Turborepo monorepo)
├── apps/web       → Next.js (App Router): public site + /admin
├── apps/api       → Hono (Node/TypeScript) + Drizzle ORM
├── apps/mobile    → Expo (React Native) writing/admin app
└── packages/
    ├── shared     → Zod schemas, types, typed API client
    └── ui         → design tokens
```

| Layer | Tech | Hosting | Cost |
|---|---|---|---|
| Web | Next.js static export (`output: 'export'`) | Cloudflare Workers Static Assets | Free, unlimited |
| API | Hono + Drizzle | Cloudflare Workers | Free (100k req/day) |
| Database | Postgres + pgvector | Neon | Free tier |
| Auth | Better Auth (passkeys + GitHub, single admin) | — | Free |
| Media | Cloudflare R2 | Cloudflare | Free tier |
| Editor | Tiptap (web), 10tap-editor (mobile) | — | Free |
| Analytics | Cloudflare Web Analytics | Cloudflare | Free |
| AI | Vercel AI SDK (provider-agnostic) | — | Usage-based, low |

---

## AI showcase features

1. **"Ask Gaurav"** — RAG chatbot over resume, projects, and posts (pgvector, streaming, citations).
2. **Semantic search + related posts** via embeddings.
3. **Writing assistant** in admin (web + mobile): titles, tags, summaries, SEO meta, proofreading.
4. **Auto TL;DR** generated on publish.
5. **Stretch:** MCP server exposing blog content to AI agents.

---

## Roadmap

### Phase 0 — Domain & email *(done 2026-11-07)*
- [x] Create Cloudflare account, add `grvv.me` (Free plan)
- [x] Review/clean imported DNS records
- [x] Turn off GoDaddy DNSSEC, forwarding, parked page
- [x] Change GoDaddy nameservers to Cloudflare's
- [x] Confirm zone is **Active** in Cloudflare
- [x] Sign up for Google Workspace with `grvv.me`, admin user `hi@grvv.me`
- [x] Add verification TXT, MX, SPF in Cloudflare (DNS only / grey cloud)
- [x] Generate DKIM in Admin console, add TXT, start authentication
- [x] Enable Cloudflare DMARC Management (creates `_dmarc` TXT, reports shown in dashboard)
- [x] Add aliases: `hello`, `work`, `jobs`, `dev`, `promo`, `alerts`
- [x] Catch-all: **off** — one alias per category, no plus addressing
- [x] Import `email/gmail-filters.xml` in Gmail and test labels (To, Cc, Bcc verified)
- [x] Add `hello@`, `work@`, `jobs@` as "Send mail as" identities (reply-from verified)
- [x] Test send/receive; score 10/10 on mail-tester.com
- [x] Re-enable DNSSEC via Cloudflare (DS record at GoDaddy) — Success 2026-11-07

### Phase 1 — Portfolio live (week 1) *(current — grvv.me live 2026-11-07)*
Minimal Next.js site: home, projects, experience, resume PDF, contact. Deploy to `grvv.me`, redirect `www` → apex.
- [x] Monorepo scaffold: pnpm + Turborepo, `apps/web` (Next.js 16), `packages/shared` (Zod schemas) — 2026-11-07
- [x] Pages: `/`, `/projects`, `/experience`, 404, `robots.txt`, `sitemap.xml`; all static; email obfuscated client-side
- [ ] Fill `apps/web/content/site.ts` with real bio, projects, experience, links
- [ ] Drop resume at `apps/web/public/resume.pdf`
- [x] First commit; GitHub repo `grvv/grvv.me`; pushed 2026-11-07
- [x] Hosting decision 2026-11-07: **all-Cloudflare, static export** (Option C). Vercel dropped — Hobby is non-commercial-only and adds a second vendor; OpenNext-on-Workers skipped as unproven with Next 16 + 10 ms CPU limit. Revisit SSR/ISR only if a feature truly needs it; a VPS (Hetzner/Contabo) is a possible Phase 5 self-host showcase, not needed now.
- [x] `output: 'export'` in `next.config.ts` (Cache Components removed — incompatible with the `force-static` metadata routes need); `wrangler.jsonc` assets-only Worker `grvv-web` serving `out/`; `pnpm run deploy` / `pnpm run preview` scripts (in apps/web); verified locally with `wrangler dev` (all routes 200, unknown path 404)
- [x] `wrangler login` (one-time, opens browser; Cloudflare account email = `dev@grvv.me` alias) then `pnpm --filter web run deploy` → live at `grvv-web.<account>.workers.dev`
- [x] Custom domains `grvv.me` + `www.grvv.me` via `routes` in `wrangler.jsonc` (`custom_domain: true`); wrangler creates DNS + cert on deploy — live 2026-11-07
- [ ] Cloudflare → Rules → Redirect Rules → template "Redirect from WWW to root" (free; `_redirects` in Workers Static Assets allows relative targets only)
- [ ] Cloudflare → SSL/TLS → Edge Certificates → **Always Use HTTPS** on (plain `http://` currently serves 200). SSL mode is irrelevant for Workers custom domains (no origin).
- [ ] Deploy on push: Workers & Pages → `grvv-web` → Settings → Build → connect GitHub `grvv/grvv.me`, root `apps/web`, build `pnpm build`, deploy `pnpm exec wrangler deploy` (free; replaces manual `pnpm run deploy`)
- [ ] Cloudflare Web Analytics snippet in `app/layout.tsx`
- [ ] OG image (`app/opengraph-image.tsx`) and favicon

Dev: `pnpm dev` (all), `pnpm build`, `pnpm typecheck`, `pnpm lint`; `pnpm --filter web preview` serves the export via wrangler at :8787.
Static-export constraints: no ISR, server actions, `next/image` default loader, or request-time route handlers; blog publish (Phase 2) = API writes to DB → triggers a rebuild (Workers Builds deploy hook), ~1–2 min to live. Admin is a client-side app talking to the Hono API. Node via fnm (`eval "$(fnm env)"`), pnpm installed globally.

### Phase 2 — Backend + blog (weeks 2–3)
Hono API, DB schema, auth, posts CRUD, R2 image uploads, Tiptap admin, public blog with RSS, sitemap, OG images.

### Phase 3 — AI (weeks 4–5)
Embeddings pipeline on publish → semantic search → "Ask Gaurav" → writing assistant.

### Phase 4 — Mobile (weeks 6–7)
Expo app: auth, drafts, editor, publish, stats; shares API client from `packages/shared`.

### Phase 5 — Polish
Tests, CI (GitHub Actions), performance/SEO audits, write-up posts about how each piece was built.

---

## Phase 0 — Detailed steps

### A. Cloudflare nameservers (registrar stays GoDaddy)

1. **Sign up** at https://dash.cloudflare.com/sign-up and verify your email.
2. **Add the domain:** Dashboard → *Add a domain* → enter `grvv.me` → keep
   *Quick scan for DNS records* → Continue → choose the **Free** plan.
3. **Review DNS records** Cloudflare imported. A fresh GoDaddy domain usually has
   parking records (an `A` record for `@` pointing to GoDaddy parking IPs, a `CNAME`
   for `www`, maybe `_domainconnect`). **Delete them** — the site isn't live yet
   and we'll add real records in Phase 1. Leave nothing you don't recognise.
4. **Note the two nameservers** Cloudflare assigns. They're unique to your account — copy them exactly.
   Assigned for grvv.me: **`melinda.ns.cloudflare.com`** and **`noah.ns.cloudflare.com`**
   (replacing GoDaddy's `ns07/ns08.domaincontrol.com`).
5. **In GoDaddy** (https://dcc.godaddy.com → *My Products* → `grvv.me` → *Manage*):
   - *Domain → Forwarding*: remove any forwarding.
   - *DNS → DNSSEC*: make sure it's **off** (if on, turn it off first — otherwise the
     domain will break after switching).
6. **Change nameservers in GoDaddy:** *DNS* → *Nameservers* tab → **Change
   Nameservers** → *I'll use my own nameservers* → paste the two Cloudflare
   nameservers → Save → confirm the warning.
7. **Back in Cloudflare:** click *Check nameservers now*. Activation usually takes
   minutes, up to 24h. You'll get an email when the zone is **Active**.
8. **Verify** from a terminal:
   ```sh
   dig NS grvv.me +short        # should list the two *.ns.cloudflare.com servers
   ```
9. **Recommended Cloudflare settings** once active:
   - *SSL/TLS → Overview*: **Full (strict)** (once the site is hosted).
   - *SSL/TLS → Edge Certificates*: enable **Always Use HTTPS**.
   - *DNS → Settings*: **Enable DNSSEC**, then copy the DS record into GoDaddy
     (*DNS → DNSSEC → Add*). Do this last, after everything works.

> Registration, renewal, and billing stay with GoDaddy. Only DNS moves. Keep
> auto-renew on in GoDaddy.

### B. Email with Google Workspace

1. **Sign up** at https://workspace.google.com → *Get started* → Business Starter.
   - Business name: your name; employees: *Just you*; region: India.
   - Current contact email: **personal Gmail** (this becomes the recovery address).
   - "Do you have a domain?" → **Yes** → `grvv.me`.
   - Username: **`hi`** → creates `hi@grvv.me` (your mailbox *and* super-admin).
   - Check the post-offer renewal price and Annual vs Flexible billing at checkout.
2. **Verify the domain.** Google gives a `google-site-verification=…` TXT record.
   If it offers "Sign in to Cloudflare" to add it automatically, that's fine;
   otherwise add it manually (below), then click *Verify*.
3. In **Cloudflare → DNS → Records**, add with **Proxy status = DNS only**
   (grey cloud — mail records must never be proxied):

   | Type | Name | Content | Notes |
   |---|---|---|---|
   | TXT | `@` | `google-site-verification=…` | Value from Google |
   | MX | `@` | `smtp.google.com` | Priority 1 (Google's current single MX) |
   | TXT | `@` | `v=spf1 include:_spf.google.com ~all` | Only **one** SPF record allowed |
   | TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=…` | DKIM — generated in step 4 |
   | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:<id>@dmarc-reports.cloudflare.net` | Generated by Cloudflare *DMARC Management*; monitor mode |

   Do **not** enable Cloudflare *Email Routing* — it would replace the MX record.
4. **DKIM:** Admin console (https://admin.google.com) → *Apps → Google Workspace →
   Gmail → Authenticate email* → *Generate new record* (2048-bit, prefix `google`)
   → add the TXT above → back in Admin, click **Start authentication**.
   Google may need 24–72h after signup before it lets you generate the key.
5. **Aliases:** *Directory → Users → hi → User information → Alternative email
   addresses* → `hello`, `work`, `jobs`, `dev`, `promo`, `alerts` (free, up to 30).
   Aliases, not plus addresses: they hide the real mailbox, work on sites that
   reject `+`, and can be deleted if one leaks.
6. **Catch-all: off (decided).** Mail to guessed addresses (`admin@`, `info@`…)
   bounces. If ever needed: *Apps → Google Workspace → Gmail → Routing → Default
   routing* → All recipients → Change envelope recipient → `hi@grvv.me`, with
   *Perform this action only on non-recognized addresses*.
7. **Sorting:** Gmail → *Settings → See all settings → Filters and Blocked
   Addresses → Import filters* → `email/gmail-filters.xml` → *Create filters*.
   One filter per alias matching `deliveredto:<alias>` (catches Bcc and list mail too); labels are created on import. No scripts, no cost,
   runs the moment mail arrives (see address map below).
8. **Reply-as:** Gmail → *Settings → Accounts → Send mail as* → add
   `hello@`, `work@`, `jobs@` (aliases verify instantly). Select *Reply from the
   same address the message was sent to*. Keep `hi@` as default.
9. **Security:** turn on 2-Step Verification (passkey or authenticator app) for
   `hi@grvv.me`; recovery email = personal Gmail, plus your phone number.
10. **Test:**
    - Send to and from a personal Gmail; check it lands in Inbox, not Spam.
    - *Show original* → SPF, DKIM, DMARC should all say **PASS**.
    - From the personal Gmail, send one mail to each alias → `hello@`, `work@`,
      `jobs@` land in Inbox with their label; `dev@`, `promo@`, `alerts@` skip
      the Inbox and show only under their label.
    - Send to the address shown on https://www.mail-tester.com → aim for 10/10.
11. **Hardening** (after a couple of weeks of clean reports in Cloudflare *Email → DMARC
    Management*): edit the `_dmarc` record, change `p=none` to `p=quarantine`, keep the
    Cloudflare `rua` address.

### C. Email address map

One real mailbox (one paid license) plus six free aliases. Catch-all is **off**,
so mail to any other address bounces. Each alias is a *category*, not a
service — pick the alias by what kind of mail the sender will produce.

| Address | Use | Label | Inbox |
|---|---|---|---|
| `hi@grvv.me` | **Mailbox.** Resume, signature, people you actually correspond with | — | Yes |
| `hello@grvv.me` | Public contact: website, social bios (scrape-able, replaceable) | Hello | Yes |
| `work@grvv.me` | Clients, employer, collaborators, invoices | Work | Yes |
| `jobs@grvv.me` | LinkedIn, Naukri, Wellfound, recruiter platforms, job alerts | Jobs | Yes |
| `dev@grvv.me` | GitHub, npm, Vercel, Cloudflare, Neon, Expo, AWS, API keys | Dev | No |
| `promo@grvv.me` | Newsletters, marketing, anything that gates content behind a signup | Promo | No |
| `alerts@grvv.me` | Uptime monitors, cron/server notifications, DMARC reports | Alerts | No |

**Sorting** is done by native Gmail filters (`email/gmail-filters.xml`), one
`to:<alias>` rule each. Labels sync to every device. If spam shows up under a
label, that alias leaked: either add a Gmail filter for the sender, or delete
the alias in Admin console and create a new one (e.g. `promo2@`).
Add a filter entry to the XML whenever you add an alias.

**Rules**
- Never use an `@grvv.me` address as the recovery email for GoDaddy, Cloudflare,
  or Google Workspace — keep personal Gmail + 2FA for those to avoid a lockout loop.
- Don't publish raw addresses in website HTML (obfuscate or use a contact form).
- Never give `hi@` to a website. Signups always get a category alias.
- Unsubscribe at the source (Gmail *Manage subscriptions*) — sorting hides promotions, it doesn't stop them.

---

## Costs (yearly)

| Item | Cost |
|---|---|
| Domain (GoDaddy, prepaid 3 yrs) | Paid |
| Cloudflare (DNS, Workers, R2, Analytics), Neon | $0 |
| Google Workspace Business Starter | ₹99/mo offer (~₹1,200/yr) — check renewal price |
| AI API usage | ~$0–5/mo |
| Apple/Google dev accounts (only to publish mobile app to stores) | $99/yr / $25 once — optional, Expo Go/dev builds work without |
