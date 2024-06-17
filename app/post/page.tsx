import { Header } from '@/components/header';
import { Post } from '../pages/posts/post';
import Footer from '@/components/footer';

export default async function Home() {
  return (
    <main className="">
      <Header />
      <Post />
      <div className="container">
        <Footer />
      </div>
    </main>
  );
}
