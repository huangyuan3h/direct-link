'use client';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { Menus } from './Menus';
import styles from './navButton.module.scss';
import { breakpoints } from '@/utils/breakpoint';
import { useEffect, useState } from 'react';

export const LeftMenuPanel: React.FC = () => {
  const windowWidth = useWindowWidth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (windowWidth <= breakpoints.md || !loaded) {
    return null;
  }

  return (
    <div className={styles.leftMenuArea}>
      <Menus />
    </div>
  );
};
