import { PostResponseType } from '@/app/pages/posts/types';
import { View } from '@/app/pages/posts/view';
import Footer from '@/components/footer';
import { Header } from '@/components/header';
import { DOMAIN_URL } from '@/config/domain';
import APIClient from '@/utils/apiClient';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { PostsResponse } from '@/app/pages/posts/types';
import { RedirectType, redirect } from 'next/navigation';

interface ViewPostParamsProps {
  params: { id: string };
}

const getPostsById = async (id: string): Promise<PostResponseType | null> => {
  'use server';
  try {
    const client = new APIClient();
    return await client.get('/post/' + id);
  } catch (e) {
    // find nothing
    return null;
  }
};

const getPostsByCategory = async (category: string): Promise<PostsResponse> => {
  'use server';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('Authorization'); // the cookie is only to make sure use new data
  const client = new APIClient(authCookie?.value);
  return await client.post('/posts', {
    limit: 8, // 3-7 link is the best for seo
    next_token: '',
    category,
  });
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata | null> {
  const id = params.id;

  const p: PostResponseType | null = await getPostsById(id);

  if (!p) {
    return null;
  }

  const title = p.subject;
  const description = p.content.slice(0, 150);
  const keywords = p.topics.join(',');

  const images = p.images;

  return {
    title: `${title} - North Path | 北径信息`,
    description,
    keywords: keywords,
    alternates: {
      canonical: `${DOMAIN_URL}post/${id}`,
    },
    openGraph: {
      images: images,
    },
  };
}

export default async function Home({ params }: ViewPostParamsProps) {
  const posts = await getPostsById(params.id);

  if (!posts) {
    return redirect(`/?notfound`, RedirectType.replace);
  }

  const category = posts.category;
  const { results } = await getPostsByCategory(category);
  const filteredList = results.filter((post) => post.postId !== params.id);
  // json ld

  const email = posts.email;
  const name = posts.email.slice(0, posts.email.indexOf('@'));
  const images = posts.images.map((url) => url);

  const relatedArticle = filteredList.map((a, idx) => {
    return {
      '@type': 'ListItem',
      position: idx + 1,
      name: a.subject,
      url: a.images[0],
    };
  });

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN_URL}post/${posts.postId}`,
    },
    headline: posts.subject,
    image: images,
    datePublished: posts.updatedDate,
    author: {
      '@type': 'Person',
      name: name,
      email: email,
    },
    publisher: {
      '@type': 'Organization',
      name: '北径信息',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAIN_URL}android-chrome-512x512.png`,
      },
    },
    isPartOf: {
      '@type': 'ItemList',
      name: posts.subject,
      itemListElement: relatedArticle,
    },
    articleBody: posts.content,
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <Header />
      <View {...posts} relateds={filteredList} />
      <div className="container">
        <Footer />
      </div>
    </main>
  );
}

export const revalidate = 60;
