'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

// Assembles the address in the browser so the plain form is not in the server HTML for scrapers.
export function Email({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const mounted = useMounted()
  if (!mounted) return <span className={className}>{`${user} [at] ${domain}`}</span>
  const address = `${user}@${domain}`
  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  )
}
