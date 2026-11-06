import Link from 'next/link'
import { site } from '@/content/site'
import { Email } from '@/components/email'
import { Section } from '@/components/section'

const { profile, projects } = site
const [user, domain] = profile.email.split('@')

export default function Home() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-medium tracking-tight">{profile.name}</h1>
      <p className="mb-8 text-muted">
        {profile.title} · {profile.location}
      </p>
      <div className="mb-14 space-y-4 leading-relaxed">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <Section title="Selected work">
        <ul className="space-y-5">
          {projects.slice(0, 3).map((p) => (
            <li key={p.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{p.href ? <a href={p.href} className="underline">{p.name}</a> : p.name}</span>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </li>
          ))}
        </ul>
        <Link href="/projects" className="mt-5 inline-block text-sm text-muted underline hover:text-fg">
          All projects
        </Link>
      </Section>

      <Section title="Contact">
        <p className="leading-relaxed">
          Email is best: <Email user={user} domain={domain} className="underline" />. Or find me on{' '}
          {profile.links.map((l, i) => (
            <span key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="underline">
                {l.label}
              </a>
              {i < profile.links.length - 1 ? ' or ' : '.'}
            </span>
          ))}
        </p>
      </Section>
    </>
  )
}
