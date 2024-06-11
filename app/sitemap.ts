import { DOMAIN_URL } from '@/config/domain';
import { PostsResponse } from '@/types/posts';
import APIClient from '@/utils/apiClient';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fixed
  let sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${DOMAIN_URL}rcic`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];

  // add list page

  const listpages: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}posts/studying-abroad`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/immigration`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/house`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/car`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  sitemaps.push(...listpages);

  // add vip

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + 'posts', {
    method: 'POST',
    body: JSON.stringify({ limit: 5000, next_token: '', category: '' }),
  });

  const res: PostsResponse = await response.json();

  if (!res.results || res.results.length === 0) {
    return sitemaps;
  }

  const vips: MetadataRoute.Sitemap = res.results.map((p) => {
    return {
      url: `${DOMAIN_URL}post/${p.postId}`,
      lastModified: p.updatedDate ? new Date(p.updatedDate) : new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    };
  });

  sitemaps.push(...vips);

  return sitemaps;
}
