import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';

import { goldenDivider } from './config';
import styles from './imageCarousel.module.scss';
import clsx from 'clsx';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { breakpoints } from '@/utils/breakpoint';

interface CarouselGalleryProps {
  images: string[];
  showModal: boolean;
  handleCloseModal: () => void;
}

export const CarouselGallery: React.FC<CarouselGalleryProps> = ({
  images,
  showModal,
  handleCloseModal,
}) => {
  const windowWidth = useWindowWidth();
  return (
    <Modal show={showModal} onHide={handleCloseModal} fullscreen centered>
      <Modal.Header closeButton={true}></Modal.Header>
      <Modal.Body>
        {windowWidth < breakpoints.sm ? (
          <div className={clsx(styles.galleryArea)}>
            {images.map((imageUrl, i) => (
              <Image
                src={imageUrl}
                key={`image-gallery-${i}`}
                alt={`Slide ${i}`}
                width={600}
                height={600}
                loading={i === 0 ? 'eager' : 'lazy'}
                style={{ height: windowWidth * goldenDivider }}
                className={clsx(styles.galleryImage)}
              />
            ))}
          </div>
        ) : (
          <div className={clsx(styles.galleryAreaDesktop)}>
            {images.map((imageUrl, i) => (
              <Image
                src={imageUrl}
                key={`image-gallery-${i}`}
                alt={`Slide ${i}`}
                width={600}
                height={600}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={clsx(styles.galleryImage)}
              />
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
