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
import { Post } from '@/app/pages/posts/post';

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

  return (
    <main className="">
      <Header />
      <Post posts={posts} />
      <div className="container">
        <Footer />
      </div>
    </main>
  );
}

export const revalidate = 60;
