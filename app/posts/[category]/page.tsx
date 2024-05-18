import { PostList } from '@/app/pages/posts/list';
import { Header } from '@/components/header';
// import APIClient from '@/utils/apiClient';

interface ViewPostParamsProps {
  params: { category: string };
}

// const getPostsByCategory = async (category: string) => {
//   const client = new APIClient();
//   return await client.post('/posts', {
//     limit: 50,
//     next_token: '',
//     category,
//   });
// };

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

  return (
    <main className="">
      <Header />
      <PostList category={category} />
    </main>
  );
}
