import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';
import { Profile } from './Profile';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={clsx(styles.headerArea)}>
      <div className={'container flex justify-between'}>
        <Banner />
        <Profile />
      </div>
    </header>
  );
};
