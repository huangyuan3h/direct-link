import { Header } from '@/components/header';
import APIClient from '@/utils/apiClient';

interface ViewPostParamsProps {
  params: { id: string };
}

const getPostsById = async (id: string) => {
  const client = new APIClient();
  return await client.get('/post/' + id);
};

export default async function Home({ params }: ViewPostParamsProps) {
  const posts = await getPostsById(params.id);
  console.log(posts);
  return (
    <main className="">
      <Header />
    </main>
  );
}
