import {
  HandThumbsUp,
  Houses,
  AlphabetUppercase,
  Icon,
  Airplane,
  PersonCheck,
  Headset,
  Person,
  ShieldLock,
} from 'react-bootstrap-icons';

export interface MenuInterface {
  title: string;
  key: string;
  url: string;
  Icon: Icon;
  showOnTopNav?: boolean;
  children?: {
    title: string;
    key: string;
    url: string;
  }[];
}

export const menuConfig: MenuInterface[] = [
  {
    key: 'all',
    title: '推荐',
    Icon: HandThumbsUp,
    showOnTopNav: true,
    url: '/',
  },
  {
    key: 'studying-abroad',
    title: '留学',
    Icon: AlphabetUppercase,
    url: '/posts/studying-abroad',
    showOnTopNav: true,
  },
  {
    key: 'immigration',
    title: '移民',
    Icon: Airplane,
    url: '/posts/immigration',
    showOnTopNav: true,
  },
  {
    key: 'house',
    title: '房',
    Icon: Houses,
    url: '/posts/house',
    showOnTopNav: true,
  },
  {
    key: 'rcic',
    title: '持牌验证',
    Icon: PersonCheck,
    url: '/rcic',
  },
  // {
  //   key: 'news',
  //   title: '新闻',
  //   Icon: Airplane,
  //   url: '/posts/news',
  //   showOnTopNav: true,
  // },

  // {
  //   key: 'car',
  //   title: '买车&租车',
  //   url: '/posts/car',
  // },
  // {
  //   key: 'jobs',
  //   title: '工作',
  //   url: '/posts/jobs',
  // },
  // {
  //   key: 'utils',
  //   title: '工具箱',
  //   children: [
  //     {
  //       key: 'rcic',
  //       title: '持牌顾问验证',
  //       url: '/rcic',
  //     },
  //   ],
  // },
];

export const otherMenus: MenuInterface[] = [
  {
    key: 'about',
    title: '关于我们',
    Icon: Person,
    url: '/about',
  },
  {
    key: 'contact',
    title: '联系我们',
    Icon: Headset,
    url: '/contact',
  },
  {
    key: 'privacy-policy',
    title: '隐私政策',
    Icon: ShieldLock,
    url: '/privacy-policy',
  },
];
