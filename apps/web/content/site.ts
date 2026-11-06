import { SiteContentSchema, type SiteContent } from '@grvv/shared'

// Edit this file to change what the site shows. It is validated at build time,
// so a typo in a URL or a missing field fails the build instead of shipping.
const content: SiteContent = {
  profile: {
    name: 'Gaurav Sharma',
    handle: 'grvv',
    title: 'Software engineer',
    location: 'India',
    bio: [
      'I build web and mobile products with React, Node, and TypeScript, and lately a lot of AI-assisted tooling.',
      'This site is the public end of a small platform I am building in the open: a Next.js front end, a Hono API, an Expo app for writing on the go, and a few AI features on top. The code and the write-ups will land here as each piece ships.',
    ],
    email: 'hello@grvv.me',
    links: [
      { label: 'GitHub', href: 'https://github.com/grvv' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/grvv' },
    ],
  },
  projects: [
    {
      name: 'grvv.me',
      description:
        'This site. A pnpm and Turborepo monorepo with a Next.js front end, shared Zod schemas, and a roadmap toward an API, a mobile writing app, and an AI assistant over the content.',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'Turborepo'],
      repo: 'https://github.com/grvv/grvv.me',
      year: 2026,
    },
  ],
  experience: [
    {
      company: 'Your current company',
      role: 'Software Engineer',
      start: '2024-01',
      end: null,
      location: 'Remote',
      highlights: [
        'Replace with two or three concrete outcomes. Numbers beat adjectives.',
        'What you owned, what shipped, what changed because of it.',
      ],
    },
    {
      company: 'Previous company',
      role: 'Frontend Engineer',
      start: '2022-06',
      end: '2023-12',
      highlights: ['One or two lines is enough for older roles.'],
    },
  ],
}

export const site = SiteContentSchema.parse(content)
