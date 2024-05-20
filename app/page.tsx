import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';

const getAllPosts = async (): Promise<PostsResponse> => {
  'use server';
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/posts', {
    method: 'POST',
    body: JSON.stringify({
      limit: 50,
      next_token: '',
      category: '',
    }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default async function Home() {
  const data = await getAllPosts();
  return (
    <main className="">
      <Header />
      <PostList
        category=""
        initialPosts={data.results}
        nextToken={data.next_token}
      />
    </main>
  );
}

export const revalidate = 60;
