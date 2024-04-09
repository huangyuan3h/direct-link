import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';
import { Profile, ProfileProps } from './Profile';

export interface HeaderProps extends ProfileProps {}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className={clsx(styles.headerArea)}>
      <div className={'container flex justify-between items-center'}>
        <Banner />
        <Profile onMenuClick={onMenuClick} />
      </div>
    </header>
  );
};
