import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://finalgradecalculator.app';

const routes = [
  '',
  '/weighted-grade-calculator',
  '/grade-converter',
  '/calculators',
  '/how-to-calculate-final-grade',
  '/grade-calculator-guide',
  '/weighted-vs-unweighted-grades',
  '/college-grading-systems',
  '/what-grade-do-i-need',
  '/privacy',
  '/terms',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/privacy' || route === '/contact' ? 0.4 : 0.8,
  }));
}
