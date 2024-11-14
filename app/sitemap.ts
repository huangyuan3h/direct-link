import { DOMAIN_URL } from '@/config/domain';
import { PostsResponse } from '@/types/posts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fixed
  let sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // {
    //   url: `${DOMAIN_URL}rcic`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    // },
    {
      url: `${DOMAIN_URL}about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // add list page

  const listpages: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}posts/study-in-canada`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/canada-immigration`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/canada-real-estate`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/canada-travel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/canada-car`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}posts/canada-jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  sitemaps.push(...listpages);

  // add vip

  let nextToken = '';

  do {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + 'posts',
      {
        method: 'POST',
        body: JSON.stringify({
          limit: 500,
          next_token: nextToken,
          category: '',
        }),
      }
    );

    const res: PostsResponse = await response.json();

    if (!res.results || res.results.length === 0) {
      return sitemaps;
    }

    const vips: MetadataRoute.Sitemap = res.results.map((p) => {
      return {
        url: `${DOMAIN_URL}post/${p.postId}`,
        lastModified: p.updatedDate ? new Date(p.updatedDate) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });

    sitemaps.push(...vips);

    nextToken = res.next_token;
  } while (nextToken !== '');

  return sitemaps;
}
