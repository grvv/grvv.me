# grvv

Monorepo for [grvv.me](https://grvv.me): portfolio, blog, admin, and a mobile writing app.
See `plan.md` for the roadmap and decisions.

```
apps/web          Next.js site (public pages; /admin later)
packages/shared   Zod schemas and types shared by web, api, and mobile
```

## Develop

```sh
pnpm install
pnpm dev          # next dev on http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
```

Site content lives in `apps/web/content/site.ts` and is validated against the schemas in
`packages/shared` at build time. Put the resume at `apps/web/public/resume.pdf`.
