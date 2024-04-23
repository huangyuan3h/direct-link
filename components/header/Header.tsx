import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';
import { HeaderRightArea } from './HeaderRightArea';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={clsx(styles.headerArea)}>
      <div className={'container flex justify-between items-center'}>
        <Banner />
        <HeaderRightArea />
      </div>
    </header>
  );
};
