import { ChevronLeft } from 'react-bootstrap-icons';

import styles from './title.module.scss';
import Link from 'next/link';

export interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <div className="mt-2 flex gap-x-4">
      <Link href={'/'} className={styles.iconArea}>
        <ChevronLeft width={18} height={18} />
      </Link>
      <h1>{title}</h1>
    </div>
  );
};
