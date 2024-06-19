import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';

import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';
import TopNav from '@/components/top-nav';

import { DOMAIN_URL } from '@/config/domain';

import APIClient from '@/utils/apiClient';
import { getImageUrl } from '@/utils/getImageUrl';
import { Metadata, ResolvingMetadata } from 'next';

interface ViewPostParamsProps {
  params: { category: string };
}

const getPostsByCategory = async (category: string): Promise<PostsResponse> => {
  'use server';
  const client = new APIClient();
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
};

const titleConfig: TitleConfig = {
  'studying-abroad': '北美留学指南',
  immigration: '北美移民资讯',
  house: '北美买房&租房',
  car: '北美买车&租车',
  jobs: '北美工作机会',
  news: '最新新闻动态',
};

const descriptionConfig: DescriptionConfig = {
  'studying-abroad':
    '🔥 北美留学申请攻略、院校排名、生活指南，助你圆梦海外！获取最新留学资讯，了解最佳申请策略，体验无忧留学生活。',
  immigration:
    '🌟 最新北美移民政策解读，项目申请指南，成功案例分享，助你开启新生活！全面掌握移民动态，实现移民梦想。',
  house:
    '🏠 北美买房、租房全攻略，房源信息、价格走势、避坑指南，帮你找到理想家园！实用买房租房建议，助你做出最佳决策。',
  car: '🚗 北美买车、租车一站式服务，车型推荐、价格对比、保险知识，让你轻松上路！全面了解汽车市场，做出明智选择。',
  jobs: '💼 北美热门行业招聘信息，求职技巧、简历优化、面试指南，助你找到心仪工作！探索职业机会，提升职业竞争力。',
  news: '📰 最新北美新闻动态，重大事件解读，热点话题分析，第一时间掌握全球资讯。了解最新新闻，紧跟时代步伐。',
};

const keywordConfig: DescriptionConfig = {
  'studying-abroad':
    '北美留学, 留学申请, 美国留学, 加拿大留学, 留学指南, 院校排名, 留学生活, 语言考试, 奖学金, 留学策略, 海外留学',
  immigration:
    '北美移民, 移民政策, 移民项目, 移民申请, 移民条件, 技术移民, 投资移民, 加拿大移民, 美国移民, 移民动态, 移民指南',
  house:
    '北美房产, 买房, 租房, 房价, 房源, 地产, 美国房产, 加拿大房产, 租房信息, 买房指南, 房地产, 购房技巧',
  car: '北美汽车, 买车, 租车, 汽车保险, 汽车贷款, 二手车, 新车, 美国汽车, 加拿大汽车, 汽车租赁, 车型推荐, 价格对比',
  jobs: '北美工作, 求职, 招聘, 简历, 面试, LinkedIn, Indeed, Glassdoor, 美国工作, 加拿大工作, 职业机会, 求职技巧',
  news: '北美新闻, 最新新闻, 热点话题, 重大事件, 全球资讯, 新闻动态, 时事分析, 北美动态, 时事新闻, 新闻报道',
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
    title: `${title} | North Path - 北径信息综合平台`,
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
          name: '北径信息',
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
