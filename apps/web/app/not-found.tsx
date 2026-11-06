import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-medium tracking-tight">Not found</h1>
      <p className="text-muted">
        Nothing here. <Link href="/" className="underline">Back home</Link>.
      </p>
    </>
  )
}
