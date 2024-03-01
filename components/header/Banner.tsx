import styles from './header.module.scss';
import clsx from 'clsx';
import BannerIcon from './banner.svg';
import Image from 'next/image';

export const Banner: React.FC = () => {
  return (
    <a className={clsx(styles.banner)} href="/">
      <Image src={BannerIcon} className={styles.iconImage} alt="北境咨询" />
      北境咨询
    </a>
  );
};
