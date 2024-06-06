import Link from 'next/link';
import { Icon } from 'react-bootstrap-icons';
import styles from './navButton.module.scss';

export interface NavButtonProps {
  Icon: Icon;
  title: string;
  url: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  Icon,
  title,
  url,
}: NavButtonProps) => {
  return (
    <Link href={url} className={styles.menuButton}>
      <Icon />
      <div>{title}</div>
    </Link>
  );
};
