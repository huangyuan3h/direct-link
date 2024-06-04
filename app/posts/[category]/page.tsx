import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';
import { DOMAIN_URL } from '@/config/domain';
import APIClient from '@/utils/apiClient';
import { Metadata, ResolvingMetadata } from 'next';

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

type TitleConfig = {
  [key: string]: string;
};

type DescriptionConfig = TitleConfig;

const config: URLConfig = {
  'studying-abroad': 'studyAbroad',
  immigration: 'immigration',
  house: 'house',
  car: 'car',
  jobs: 'jobs',
};

const titleConfig: TitleConfig = {
  'studying-abroad': '北美留学',
  immigration: '北美移民',
  house: '买房&租房',
  car: '买车&租车',
  jobs: '工作',
};

const descriptionConfig: DescriptionConfig = {
  'studying-abroad': '🔥 北美留学申请攻略、院校排名、生活指南，助你圆梦海外！',
  immigration:
    '🌟  最新北美移民政策解读，项目申请指南，成功案例分享，助你开启新生活！',
  house:
    '🏠  北美买房、租房全攻略，房源信息、价格走势、避坑指南，帮你找到理想家园！',
  car: '🚗  北美买车、租车一站式服务，车型推荐、价格对比、保险知识，让你轻松上路！',
  jobs: '💼  北美热门行业招聘信息，求职技巧、简历优化、面试指南，助你找到心仪工作！',
};

type Props = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = params.category;

  const title = titleConfig[category as keyof URLConfig];
  const description = descriptionConfig[category as keyof URLConfig];

  return {
    title: `${title} - 北径信息`,
    description,
    alternates: {
      canonical: `${DOMAIN_URL}posts/${category}`,
    },
  };
}

export default async function Home({ params }: ViewPostParamsProps) {
  const category = config[params.category as keyof URLConfig];

  const data = await getPostsByCategory(category);

  return (
    <main className="">
      <Header />
      <PostList
        category={category}
        initialPosts={data.results}
        nextToken={data.next_token}
      />
    </main>
  );
}

export const revalidate = 60;
