import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselGallery } from './CarouselGallery';

import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
}

const breakpoints = {
  sm: 768,
};

const goldenDivider = 0.618;

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [windowWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // when no image, show nothing
  if (!images || images.length === 0) {
    return <></>;
  }

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
      {windowWidth < breakpoints.sm ? (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          fade
          indicators={false}
        >
          {images.map((imageUrl, i) => (
            <Carousel.Item
              key={i}
              onClick={() => handleImageClick(i)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                className="d-block w-100"
                src={imageUrl}
                alt={`Slide ${i}`}
                width={800}
                height={600}
                style={{ height: windowWidth * goldenDivider }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>desktop</div>
      )}

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
