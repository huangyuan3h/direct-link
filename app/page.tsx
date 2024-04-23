import { Header } from '../components/header';
import { PostList } from './pages/posts/list';

export default function Home() {
  return (
    <main className="">
      <Header />
      <PostList />
    </main>
  );
}
