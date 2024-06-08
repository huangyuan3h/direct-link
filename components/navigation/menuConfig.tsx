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
  children?: {
    title: string;
    key: string;
    url: string;
  }[];
}

export const menuConfig: MenuInterface[] = [
  {
    key: 'all',
    title: '首页',
    Icon: House,
    url: '/',
  },
  {
    key: 'studying-abroad',
    title: '留学',
    Icon: AlphabetUppercase,
    url: '/posts/studying-abroad',
  },
  {
    key: 'immigration',
    title: '移民',
    Icon: Airplane,
    url: '/posts/immigration',
  },
  {
    key: 'rcic',
    title: '持牌验证',
    Icon: PersonCheck,
    url: '/rcic',
  },
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
