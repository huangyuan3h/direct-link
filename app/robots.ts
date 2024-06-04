import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/my/', '/in-developing'],
    },
    sitemap: 'https://www.north-path.site/sitemap.xml',
  };
}
