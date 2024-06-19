import {
  House,
  AlphabetUppercase,
  Icon,
  Airplane,
  PersonCheck,
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
    Icon: House,
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
  //   key: 'house',
  //   title: '买房&租房',
  //   url: '/posts/house',
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
