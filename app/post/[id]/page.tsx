import { View } from '@/app/pages/posts/view';
import { Header } from '@/components/header';
import APIClient from '@/utils/apiClient';

interface ViewPostParamsProps {
  params: { id: string };
}

const getPostsById = async (id: string) => {
  'use server';
  const client = new APIClient();
  return await client.get('/post/' + id);
};

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
