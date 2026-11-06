import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import { site } from '@/content/site'
import './globals.css'

const sans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const { profile } = site

export const metadata: Metadata = {
  metadataBase: new URL('https://grvv.me'),
  title: { default: profile.name, template: `%s · ${profile.handle}` },
  description: `${profile.title}. ${profile.bio[0]}`,
  openGraph: { type: 'website', siteName: profile.handle, locale: 'en_IN' },
}

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/resume.pdf', label: 'Resume' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-10 sm:py-16">
          <header className="mb-14 flex items-baseline justify-between gap-6">
            <Link href="/" className="font-medium tracking-tight">
              {profile.handle}
            </Link>
            <nav className="flex gap-5 text-sm text-muted">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-fg">
                  {n.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-20 border-t border-line pt-6 text-sm text-muted">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {profile.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                  {l.label}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
