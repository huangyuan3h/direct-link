import { PostResponseType } from '@/app/pages/posts/types';
import { View } from '@/app/pages/posts/view';
import { Header } from '@/components/header';
import { DOMAIN_URL } from '@/config/domain';
import APIClient from '@/utils/apiClient';
import { Metadata, ResolvingMetadata } from 'next';

interface ViewPostParamsProps {
  params: { id: string };
}

const getPostsById = async (id: string) => {
  'use server';
  const client = new APIClient();
  return await client.get('/post/' + id);
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const p: PostResponseType = await getPostsById(id);

  const title = p.subject;
  const description = p.content.slice(0, 150);
  const keywords = p.topics.join(',');

  const images = p.images;

  return {
    title: `${title} - 北径信息`,
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
  return (
    <main className="">
      <Header />
      <View {...posts} />
    </main>
  );
}

export const revalidate = 60;
