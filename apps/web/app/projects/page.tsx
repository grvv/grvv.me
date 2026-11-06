import type { Metadata } from 'next'
import { site } from '@/content/site'

export const metadata: Metadata = { title: 'Projects' }

export default function Projects() {
  return (
    <>
      <h1 className="mb-10 text-2xl font-medium tracking-tight">Projects</h1>
      <ul className="space-y-10">
        {site.projects.map((p) => (
          <li key={p.name}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium">{p.name}</h2>
              <span className="font-mono text-xs text-muted">{p.year}</span>
            </div>
            <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
            <p className="mt-2 font-mono text-xs text-muted">{p.tech.join(' · ')}</p>
            <p className="mt-2 flex gap-4 text-sm">
              {p.href && <a href={p.href} target="_blank" rel="noreferrer" className="underline">Site</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="underline">Code</a>}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
