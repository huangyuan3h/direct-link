import Carousel from 'react-bootstrap/Carousel';

import Image from 'next/image';

import { goldenDivider } from './config';
import clsx from 'clsx';
import styles from './imageCarousel.module.scss';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';

export interface MobileCarouselProps {
  index: number;
  onSelect: (idx: number) => void;
  images: string[];
  onImageClick: (idx: number) => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  index,
  images,
  onSelect,
  onImageClick,
}: MobileCarouselProps) => {
  const windowWidth = useWindowWidth();

  return (
    <Carousel
      activeIndex={index}
      onSelect={onSelect}
      fade
      indicators={false}
      controls={images.length > 1}
    >
      {images.map((imageUrl, i) => (
        <Carousel.Item
          key={i}
          onClick={() => onImageClick(i)}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={imageUrl}
            alt={`Slide ${i}`}
            width={100}
            height={100}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ height: windowWidth * goldenDivider }}
            className={clsx(styles.carouselImage)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
