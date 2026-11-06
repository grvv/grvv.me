import type { Metadata } from 'next'
import { site } from '@/content/site'
import { Period } from '@/components/section'

export const metadata: Metadata = { title: 'Experience' }

export default function Experience() {
  return (
    <>
      <div className="mb-10 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-medium tracking-tight">Experience</h1>
        <a href="/resume.pdf" className="text-sm text-muted underline hover:text-fg">
          Resume (PDF)
        </a>
      </div>
      <ol className="space-y-10">
        {site.experience.map((e) => (
          <li key={`${e.company}-${e.start}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="font-medium">
                {e.role} ·{' '}
                {e.href ? <a href={e.href} target="_blank" rel="noreferrer" className="underline">{e.company}</a> : e.company}
              </h2>
              <Period start={e.start} end={e.end} />
            </div>
            {e.location && <p className="mt-1 text-sm text-muted">{e.location}</p>}
            <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  )
}
