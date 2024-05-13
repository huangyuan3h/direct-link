import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';

const getPosts = async (): Promise<PostsResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}posts`, {
    method: 'POST',
    body: JSON.stringify({
      limit: 5,
      next_token: '',
      category: '',
    }),
  });
  return response.json();
};

export default async function Home() {
  const data = await getPosts();
  return (
    <main className="">
      <Header />
      <PostList {...data} />
    </main>
  );
}
