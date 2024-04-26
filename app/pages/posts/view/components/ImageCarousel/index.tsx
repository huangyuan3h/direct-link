import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselGallery } from './CarouselGallery';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleImageClick = (selectedIndex: number) => {
    setIndex(selectedIndex);
    handleShowModal();
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((imageUrl, i) => (
          <Carousel.Item
            key={i}
            onClick={() => handleImageClick(i)}
            style={{ cursor: 'pointer' }}
          >
            {/* <img className="d-block w-100" src={imageUrl} alt={`Slide ${i}`} /> */}
          </Carousel.Item>
        ))}
      </Carousel>
      <CarouselGallery
        images={images}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSelect={handleSelect}
        selectedIndex={index}
      />
    </>
  );
};

export default ImageCarousel;
