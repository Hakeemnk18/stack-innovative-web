import type { MetadataRoute } from 'next'
import packagesData from '../data/packages.json'

const SITE_URL = 'https://stackinnovative.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const packagePages: MetadataRoute.Sitemap = packagesData.items
    .filter((pkg) => !pkg.custom)
    .map((pkg) => ({
      url: `${SITE_URL}/packages/${pkg.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...packagePages,
  ]
}
