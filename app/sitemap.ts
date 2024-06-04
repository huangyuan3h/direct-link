import { PostsResponse } from '@/types/posts';
import APIClient from '@/utils/apiClient';
import { MetadataRoute } from 'next';

const domainUrl = 'https://www.north-path.site/';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fixed
  let sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${domainUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${domainUrl}rcic`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];

  // add list page

  const listpages: MetadataRoute.Sitemap = [
    {
      url: `${domainUrl}posts/studying-abroad`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${domainUrl}posts/immigration`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${domainUrl}posts/house`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${domainUrl}posts/car`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${domainUrl}posts/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  sitemaps.push(...listpages);

  // add vip

  const client = new APIClient();

  const res: PostsResponse = await client.post('posts', {
    limit: 5000,
    next_token: '',
    category: '',
  });

  if (!res.results || res.results.length === 0) {
    return sitemaps;
  }

  const vips: MetadataRoute.Sitemap = res.results.map((p) => {
    return {
      url: `${domainUrl}post/${p.postId}`,
      lastModified: p.updatedDate ? new Date(p.updatedDate) : new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    };
  });

  sitemaps.push(...vips);

  return sitemaps;
}
