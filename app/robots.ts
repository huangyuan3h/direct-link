import { DOMAIN_URL } from '@/config/domain';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/my/', '/in-developing'],
    },
    sitemap: `${DOMAIN_URL}sitemap.xml`,
  };
}
