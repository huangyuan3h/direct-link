import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

interface CarouselGalleryProps {
  images: string[];
  showModal: boolean;
  handleCloseModal: () => void;
  handleSelect: (selectedIndex: number) => void;
  selectedIndex: number;
}

export const CarouselGallery: React.FC<CarouselGalleryProps> = ({
  images,
  showModal,
  handleCloseModal,
  handleSelect,
  selectedIndex,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} fullscreen centered>
      <Modal.Body>
        <Carousel
          activeIndex={selectedIndex}
          onSelect={handleSelect}
          indicators={false}
        >
          {images.map((imageUrl, i) => (
            <Carousel.Item key={i}>
              {/* <img
                className="d-block w-100"
                src={imageUrl}
                alt={`Slide ${i}`}
              /> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};
