import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';

export default function Home() {
  return (
    <main className="">
      <Header />
      <PostList posts={[]} token="" category="" />
    </main>
  );
}
