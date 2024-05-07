import Image from 'next/image';
import { useWindowWidth } from './useWindowWidth';
import { breakpoints } from './config';
import styles from './imageCarousel.module.scss';
import clsx from 'clsx';

export interface DesktopCarouselProps {
  images: string[];
}

export const DesktopCarousel = ({ images }: DesktopCarouselProps) => {
  const windowWidth = useWindowWidth();

  if (images.length === 0) {
    return <></>;
  }

  if (windowWidth < breakpoints.md || images.length < 3) {
    return (
      <div>
        <Image
          src={images[0]}
          alt={`Slide ${1}`}
          width={100}
          height={100}
          className={styles.carouselImage}
        />
      </div>
    );
  }

  if (windowWidth < breakpoints.large || images.length < 5) {
    return (
      <div className={clsx(styles.desktopLayoutRow)}>
        <div className={styles.imageLargeSize}>
          <Image
            src={images[0]}
            alt={`Slide ${1}`}
            width={100}
            height={100}
            className={clsx(styles.carouselImage, styles.firstImage)}
          />
        </div>

        <div
          className={clsx(styles.desktopLayoutColumn, styles.imageSmallSize)}
        >
          <Image
            src={images[1]}
            alt={`Slide ${2}`}
            width={100}
            height={100}
            className={clsx(styles.carouselImage, styles.lastTopImage)}
          />
          <Image
            src={images[2]}
            alt={`Slide ${3}`}
            width={100}
            height={100}
            className={clsx(styles.carouselImage, styles.lastBottomImage)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.desktopLayoutRow)}>
      <div className={styles.imageLargeSize}>
        <Image
          src={images[0]}
          alt={`Slide ${1}`}
          width={100}
          height={100}
          className={clsx(styles.carouselImage, styles.firstImage)}
        />
      </div>

      <div className={clsx(styles.desktopLayoutColumn, styles.imageSmallSize)}>
        <Image
          src={images[1]}
          alt={`Slide ${2}`}
          width={100}
          height={100}
          className={clsx(styles.carouselImage)}
        />
        <Image
          src={images[2]}
          alt={`Slide ${3}`}
          width={100}
          height={100}
          className={clsx(styles.carouselImage)}
        />
      </div>

      <div className={clsx(styles.desktopLayoutColumn, styles.imageSmallSize)}>
        <Image
          src={images[3]}
          alt={`Slide ${4}`}
          width={100}
          height={100}
          className={clsx(styles.carouselImage, styles.lastTopImage)}
        />
        <Image
          src={images[4]}
          alt={`Slide ${5}`}
          width={100}
          height={100}
          className={clsx(styles.carouselImage, styles.lastBottomImage)}
        />
      </div>
    </div>
  );
};
