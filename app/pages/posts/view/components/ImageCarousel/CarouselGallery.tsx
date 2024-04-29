import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import { useWindowWidth } from './useWindowWidth';
import { breakpoints, goldenDivider } from './config';
import styles from './imageCarousel.module.scss';
import clsx from 'clsx';
import { CloseButton } from 'react-bootstrap';

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
                width={800}
                height={600}
                style={{ height: windowWidth * goldenDivider }}
                className={clsx(styles.galleryImage)}
              />
            ))}
          </div>
        ) : (
          <div>desktop</div>
        )}
      </Modal.Body>
    </Modal>
  );
};
