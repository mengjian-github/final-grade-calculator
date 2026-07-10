import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://finalgradecalculator.app';
const LAST_MODIFIED = '2026-07-10';

const routes = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/weighted-grade-calculator/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/grade-converter/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/calculators/', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/how-to-calculate-final-grade/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/grade-calculator-guide/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/weighted-vs-unweighted-grades/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/college-grading-systems/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/what-grade-do-i-need/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/contact/', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: route.priority,
  }));
}
