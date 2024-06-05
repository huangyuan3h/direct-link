export interface MenuInterface {
  title: string;
  key: string;
  url?: string;
  children?: {
    title: string;
    key: string;
    url: string;
  }[];
}

export const menuConfig: MenuInterface[] = [
  {
    key: 'all',
    title: '全部',
    url: '/',
  },
  {
    key: 'studying-abroad',
    title: '留学',
    url: '/posts/studying-abroad',
  },
  {
    key: 'immigration',
    title: '移民',
    url: '/posts/immigration',
  },
  {
    key: 'house',
    title: '买房&租房',
    url: '/posts/house',
  },
  {
    key: 'car',
    title: '买车&租车',
    url: '/posts/car',
  },
  {
    key: 'jobs',
    title: '工作',
    url: '/posts/jobs',
  },
  {
    key: 'utils',
    title: '工具箱',
    children: [
      {
        key: 'rcic',
        title: '持牌顾问验证',
        url: '/rcic',
      },
    ],
  },
];
