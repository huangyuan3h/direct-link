import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';
import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';
import TopNav from '@/components/top-nav';
import APIClient from '@/utils/apiClient';

interface ViewPostParamsProps {
  params: { category: string };
}

const getPostsByCategory = async (category: string): Promise<PostsResponse> => {
  'use server';
  const client = new APIClient();
  return await client.post('/posts', {
    limit: 50,
    next_token: '',
    category,
  });
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
      <Header v2Header />
      <div className="flex">
        <LeftMenuPanel />
        <div>
          <TopNav />
        </div>
        {/* <PostList
          category={category}
          initialPosts={data.results}
          nextToken={data.next_token}
        /> */}
      </div>
    </main>
  );
}

export const revalidate = 60;
