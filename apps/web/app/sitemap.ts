import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://grvv.me'
  return ['', '/projects', '/experience'].map((p) => ({ url: `${base}${p}` }))
}
