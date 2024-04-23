import { Header } from '@/components/header';

interface ViewPostParamsProps {
  params: { id: string };
}

export default async function Home({ params }: ViewPostParamsProps) {
  console.log(params.id);

  return (
    <main className="">
      <Header />
    </main>
  );
}
