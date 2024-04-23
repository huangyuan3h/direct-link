export interface MenuInterface {
  title: string;
  key: string;
  children: {
    title: string;
    key: string;
    url: string;
  }[];
}

export const menuConfig: MenuInterface[] = [
  {
    key: 'posts',
    title: '帖子&新闻',
    children: [
      {
        key: 'all',
        title: '全部',
        url: '/in-developing',
      },
      {
        key: 'studying-abroad',
        title: '留学',
        url: '/in-developing',
      },
      {
        key: 'immigration',
        title: '移民',
        url: '/in-developing',
      },
      {
        key: 'house',
        title: '买房&租房',
        url: '/in-developing',
      },
      {
        key: 'car',
        title: '买车&租车',
        url: '/in-developing',
      },
      {
        key: 'jobs',
        title: '工作',
        url: '/in-developing',
      },
    ],
  },
  {
    key: 'studying-abroad',
    title: '北美留学',
    children: [
      {
        key: 'university list',
        title: '学校简介',
        url: '/in-developing',
      },
    ],
  },
  {
    key: 'immigration',
    title: '北美移民',
    children: [
      {
        key: 'immigration program list',
        title: '加拿大移民项目',
        url: '/in-developing',
      },
      {
        key: 'rcic',
        title: '持牌顾问验证',
        url: '/rcic',
      },
    ],
  },
  {
    key: 'house',
    title: '租房&买房',
    children: [
      {
        key: 'rent-house',
        title: '租房',
        url: '/in-developing',
      },
      {
        key: 'buy-house',
        title: '买房',
        url: '/in-developing',
      },
    ],
  },
  {
    key: 'car',
    title: '买车&租车',
    children: [
      {
        key: 'rent-car',
        title: '买车',
        url: '/in-developing',
      },
      {
        key: 'buy-car',
        title: '租车',
        url: '/in-developing',
      },
    ],
  },
];
