import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://grvv.me'
  return ['', '/projects', '/experience'].map((p) => ({ url: `${base}${p}` }))
}
