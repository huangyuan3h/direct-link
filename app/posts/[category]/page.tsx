import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';

import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';
import TopNav from '@/components/top-nav';

import { DOMAIN_URL } from '@/config/domain';

import APIClient from '@/utils/apiClient';
import { getImageUrl } from '@/utils/getImageUrl';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

interface ViewPostParamsProps {
  params: { category: string };
}

const getPostsByCategory = async (category: string): Promise<PostsResponse> => {
  'use server';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('Authorization'); // the cookie is only to make sure use new data
  const client = new APIClient(authCookie?.value);
  return await client.post('/posts', {
    limit: 30,
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
  news: 'news',
  'studying-abroad': 'studyAbroad',
  immigration: 'immigration',
  house: 'house',
  car: 'car',
  jobs: 'jobs',
  travel: 'travel',
};

const titleConfig: TitleConfig = {
  'studying-abroad': '加拿大留学指南',
  immigration: '加拿大移民资讯',
  house: '加拿大买房&租房',
  car: '加拿大买车&租车',
  jobs: '加拿大学习工作',
  news: '加拿大最新新闻动态',
  travel: '加拿大旅游攻略',
};

const descriptionConfig: DescriptionConfig = {
  'studying-abroad':
    '🔥 加拿大留学申请攻略、院校排名、生活指南，助你圆梦海外！获取最新留学资讯，了解最佳申请策略，体验无忧留学生活。',
  immigration:
    '🌟 最新加拿大移民政策解读，项目申请指南，成功案例分享，助你开启新生活！全面掌握移民动态，实现移民梦想。',
  house:
    '🏠 加拿大买房、租房全攻略，房源信息、价格走势、避坑指南，帮你找到理想家园！实用买房租房建议，助你做出最佳决策。',
  car: '🚗 加拿大买车、租车一站式服务，车型推荐、价格对比、保险知识，让你轻松上路！全面了解汽车市场，做出明智选择。',
  jobs: '💼 加拿大热门行业招聘信息，求职技巧、简历优化、面试指南，助你找到心仪工作！探索职业机会，提升职业竞争力。',
  news: '📰 最新加拿大新闻动态，重大事件解读，热点话题分析，第一时间掌握加拿大资讯。了解最新新闻，紧跟时代步伐。',
  travel:
    '🇨🇦 加拿大旅游景点推荐、行程规划、住宿指南、美食攻略，带你玩转枫叶之国！探索自然奇观，体验多元文化。',
};

const keywordConfig: DescriptionConfig = {
  'studying-abroad':
    '加拿大留学, 留学申请, 加拿大学院, 留学指南, 院校排名, 留学生活, 语言考试, 奖学金, 留学策略, 海外留学, PGWP, EE',
  immigration:
    '加拿大移民, 移民政策, 移民项目, 移民申请, 移民条件, 技术移民, 投资移民, 省提名移民, Express Entry, 联邦技术移民, 经验类移民',
  house:
    '加拿大房产, 买房, 租房, 房价, 房源, 地产, 多伦多房产, 温哥华房产, 租房信息, 买房指南, 房地产, 购房技巧',
  car: '加拿大汽车, 买车, 租车, 汽车保险, 汽车贷款, 二手车, 新车, 汽车租赁, 车型推荐, 价格对比',
  jobs: '加拿大学习工作, 求职, 招聘, 简历, 面试, LinkedIn, Indeed, Glassdoor,  职业机会, 求职技巧',
  news: '加拿大新闻, 最新新闻, 热点话题, 重大事件, 加拿大资讯, 新闻动态, 时事分析,  时事新闻, 新闻报道',
  travel:
    '加拿大旅游, 旅游景点, 旅游攻略, 加拿大旅行, Banff, Niagara Falls, Vancouver, Toronto, 景点推荐, 自由行, 跟团游',
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
  const keywords = keywordConfig[category as keyof URLConfig];

  return {
    title: `${title} | North Path - 北径移民资讯`,
    description,
    keywords: keywords,
    alternates: {
      canonical: `${DOMAIN_URL}posts/${category}`,
    },
  };
}

export default async function Home({ params }: ViewPostParamsProps) {
  const category = config[params.category as keyof URLConfig];

  const data = await getPostsByCategory(category);

  const articles = data.results.map((r, idx) => {
    const email = r.email;
    const name = r.email.slice(0, r.email.indexOf('@'));
    const images = r.images.map((url) => getImageUrl(url));
    return {
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${DOMAIN_URL}post/${r.postId}`,
        },
        headline: r.subject,
        image: images,
        datePublished: r.updatedDate,
        author: {
          '@type': 'Person',
          name: name,
          email: email,
        },
        publisher: {
          '@type': 'Organization',
          name: '北径移民资讯',
          logo: {
            '@type': 'ImageObject',
            url: `${DOMAIN_URL}android-chrome-512x512.png`,
          },
        },
        articleBody: r.content,
      },
    };
  });

  const listArticles = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: data.results.length,
    itemListElement: articles,
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listArticles) }}
      />
      <Header v2Header />
      <div className="flex">
        <LeftMenuPanel />
        <div className="w-full">
          <TopNav />
          <PostList
            category={category}
            initialPosts={data.results}
            nextToken={data.next_token}
          />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60;
