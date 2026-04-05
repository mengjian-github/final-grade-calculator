import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const siteUrl = 'https://finalgradecalculator.app'

const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/weighted-grade-calculator', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/grade-converter', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/how-to-calculate-final-grade', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/grade-calculator-guide', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/weighted-vs-unweighted-grades', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/college-grading-systems', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/what-grade-do-i-need', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/calculators', changeFrequency: 'weekly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
