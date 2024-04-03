import clsx from 'clsx';
import styles from './header.module.scss';
import { Banner } from './Banner';

export interface DistrictionFreeHeaderProps {}

export const DistrictionFreeHeader: React.FC<
  DistrictionFreeHeaderProps
> = () => {
  return (
    <header className={clsx(styles.headerArea)}>
      <Banner />
    </header>
  );
};
