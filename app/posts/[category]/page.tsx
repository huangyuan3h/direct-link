import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';

interface ViewPostParamsProps {
  params: { category: string };
}

const getPostsByCategory = async (category: string): Promise<PostsResponse> => {
  'use server';
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/posts', {
    method: 'POST',
    body: JSON.stringify({
      limit: 50,
      next_token: '',
      category: category,
    }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
};

type URLConfig = {
  [key: string]: string;
};

const config: URLConfig = {
  'studying-abroad': 'studyAbroad',
  immigration: 'immigration',
  house: 'house',
  car: 'car',
  jobs: 'jobs',
};

export default async function Home({ params }: ViewPostParamsProps) {
  const category = config[params.category as keyof URLConfig];

  const data = await getPostsByCategory(category);

  return (
    <main className="">
      <Header />
      <PostList
        category={category}
        initialPosts={data.results}
        nextToken={data.next_token}
      />
    </main>
  );
}

export const revalidate = 60;
