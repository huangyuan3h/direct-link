import { Header } from '@/components/header';
import { Post } from '../pages/posts/post';

export default async function Home() {
  return (
    <main className="">
      <Header />
      <Post />
    </main>
  );
}
