import { PostList } from '@/app/pages/posts/list';
import { PostsResponse } from '@/app/pages/posts/types';
import { Header } from '@/components/header';

import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';
import Title from '@/components/title';
import TopNav from '@/components/top-nav';

import { DOMAIN_URL } from '@/config/domain';

import APIClient from '@/utils/apiClient';
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
    limit: 20,
    next_token: '',
    category,
  });
};

type CategoryUrlType =
  | 'study-in-canada'
  | 'canada-immigration'
  | 'canada-real-estate'
  | 'canada-car'
  | 'canada-jobs'
  | 'news'
  | 'canada-travel';

type pageConfigType = {
  [key in CategoryUrlType]: {
    category: string;
    title: string;
    description: string;
    keywords: string;
  };
};

const pagesConfig: pageConfigType = {
  'study-in-canada': {
    category: 'studyAbroad',
    title: '加拿大留学 - North Path | 北径信息',
    description:
      '加拿大留学申请攻略、院校排名、生活指南，北径信息助你圆梦海外！获取最新留学资讯，了解最佳申请策略，体验无忧留学生活。',
    keywords:
      '加拿大留学, 留学申请, 加拿大学院, 留学指南, 院校排名, 留学生活, 语言考试, 奖学金, 留学策略, 海外留学, PGWP, EE, 北径信息',
  },
  'canada-immigration': {
    category: 'immigration',
    title: '加拿大移民 - North Path | 北径信息',
    description:
      '最新加拿大移民政策解读、项目申请指南、成功案例分享，北径信息助你开启新生活！全面掌握移民动态，实现移民梦想。',
    keywords:
      '加拿大移民, 移民政策, 移民项目, 移民申请, 移民条件, 技术移民, 投资移民, 省提名移民, Express Entry, 联邦技术移民, 经验类移民, 北径信息',
  },
  'canada-real-estate': {
    category: 'house',
    title: '加拿大买房&租房 - North Path | 北径信息',
    description:
      '加拿大买房、租房全攻略，房源信息、价格走势、避坑指南，北径信息帮你找到理想家园！实用买房租房建议，助你做出最佳决策。',
    keywords:
      '加拿大房产, 买房, 租房, 房价, 房源, 地产, 多伦多房产, 温哥华房产, 租房信息, 买房指南, 房地产, 购房技巧, 北径信息',
  },
  'canada-car': {
    category: 'car',
    title: '加拿大买车&租车 - North Path | 北径信息',
    description:
      '加拿大买车、租车一站式服务，车型推荐、价格对比、保险知识，北径信息让你轻松上路！全面了解汽车市场，做出明智选择。',
    keywords:
      '加拿大汽车, 买车, 租车, 汽车保险, 汽车贷款, 二手车, 新车, 汽车租赁, 车型推荐, 价格对比, 北径信息',
  },
  'canada-jobs': {
    category: 'jobs',
    title: '加拿大学习工作 - North Path | 北径信息',
    description:
      '加拿大热门行业招聘信息，求职技巧、简历优化、面试指南，北径信息助你找到心仪工作！探索职业机会，提升职业竞争力。',
    keywords:
      '加拿大学习工作, 求职, 招聘, 简历, 面试, LinkedIn, Indeed, Glassdoor,  职业机会, 求职技巧, 北径信息',
  },
  news: {
    category: 'news',
    title: '加拿大最新新闻动态 - North Path | 北径信息',
    description:
      '最新加拿大新闻动态，重大事件解读，热点话题分析，北径信息第一时间掌握加拿大资讯。了解最新新闻，紧跟时代步伐。',
    keywords:
      '加拿大新闻, 最新新闻, 热点话题, 重大事件, 加拿大资讯, 新闻动态, 时事分析,  时事新闻, 新闻报道, 北径信息',
  },
  'canada-travel': {
    category: 'travel',
    title: '加拿大旅游攻略 - North Path | 北径信息',
    description:
      '加拿大旅游景点推荐、行程规划、住宿指南、美食攻略，北径信息带你玩转枫叶之国！探索自然奇观，体验多元文化。',
    keywords:
      '加拿大旅游, 旅游景点, 旅游攻略, 加拿大旅行, Banff, Niagara Falls, Vancouver, Toronto, 景点推荐, 自由行, 跟团游, 北径信息',
  },
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

  const { title, description, keywords } =
    pagesConfig[category as CategoryUrlType];

  return {
    title,
    description,
    keywords: keywords,
    alternates: {
      canonical: `${DOMAIN_URL}posts/${category}`,
    },
  };
}

export default async function Home({ params }: ViewPostParamsProps) {
  const { category } = pagesConfig[params.category as CategoryUrlType];

  const data = await getPostsByCategory(category);

  const articles = data.results.map((r, idx) => {
    const email = r.email;
    const name = r.email.slice(0, r.email.indexOf('@'));
    const images = r.images.map((url) => url);
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

  const { title } = pagesConfig[category as CategoryUrlType];

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listArticles) }}
      />
      <Header v2Header />
      <Title text={title} />
      <div className="flex">
        <LeftMenuPanel />
        <div style={{ width: '100%' }}>
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
