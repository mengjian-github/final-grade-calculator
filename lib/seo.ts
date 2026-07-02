import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  appendSiteName?: boolean;
}

const BASE_URL = 'https://finalgradecalculator.app';

function normalizeCanonicalPath(path?: string): string {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/logo.png',
  appendSiteName = true,
}: SEOProps): Metadata {
  const fullTitle = !appendSiteName || title.includes('Final Grade Calculator')
    ? title
    : `${title} | Final Grade Calculator`;

  const canonicalPath = normalizeCanonicalPath(canonical);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'final grade calculator',
      'grade calculator',
      'calculate final grade',
      'weighted grade calculator',
      ...keywords,
    ].join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Final Grade Calculator',
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${BASE_URL}${ogImage}`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Final Grade Calculator - Calculate Your Grade',
  description:
    'Free final grade calculator to quickly calculate what you need on your final exam. Supports weighted grades, multiple assignments, and various grading scales.',
};
