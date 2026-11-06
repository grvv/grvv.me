export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-muted">{title}</h2>
      {children}
    </section>
  )
}

export function Period({ start, end }: { start: string; end: string | null }) {
  const fmt = (s: string) =>
    new Date(`${s}-01`).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  return (
    <span className="font-mono text-xs text-muted">
      {fmt(start)} — {end ? fmt(end) : 'Present'}
    </span>
  )
}
