'use client';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { Menus } from './Menus';
import styles from './navButton.module.scss';
import { breakpoints } from '@/utils/breakpoint';

export const LeftMenuPanel: React.FC = () => {
  const windowWidth = useWindowWidth();

  if (windowWidth <= breakpoints.md) {
    return null;
  }

  return (
    <div className={styles.leftMenuArea}>
      <Menus />
    </div>
  );
};
