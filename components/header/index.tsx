import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={clsx(styles.headerArea)}>
      <Banner />
    </header>
  );
};
