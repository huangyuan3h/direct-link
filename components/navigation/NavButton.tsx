import Link from 'next/link';
import { Icon } from 'react-bootstrap-icons';
import styles from './navButton.module.scss';
import clsx from 'clsx';

export interface NavButtonProps {
  Icon: Icon;
  title: string;
  url: string;
  className: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  Icon,
  title,
  url,
  className,
}: NavButtonProps) => {
  return (
    <Link href={url} className={clsx(styles.menuButton, className)}>
      <Icon />
      <div>{title}</div>
    </Link>
  );
};
