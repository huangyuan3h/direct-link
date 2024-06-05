import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';
import { HeaderRightArea } from './HeaderRightArea';

export interface HeaderProps {
  v2Header?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ v2Header }: HeaderProps) => {
  return (
    <header className={clsx(styles.headerArea)}>
      <div
        className={clsx(
          'flex justify-between items-center',
          v2Header ? 'px-4' : 'container'
        )}
      >
        <Banner />
        <HeaderRightArea />
      </div>
    </header>
  );
};
