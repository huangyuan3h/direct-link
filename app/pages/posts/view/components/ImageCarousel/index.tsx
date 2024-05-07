import React, { useEffect, useState } from 'react';

import { CarouselGallery } from './CarouselGallery';

import { breakpoints } from './config';
import { useWindowWidth } from './useWindowWidth';
import { DesktopCarousel } from './DesktopCarousel';
import { LoadingCarousel } from './LoadingCarousel';
import { MobileCarousel } from './MobileCarousel';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingCarousel />;
  }

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
        <MobileCarousel
          index={index}
          images={images}
          onSelect={handleSelect}
          onImageClick={handleImageClick}
        />
      ) : (
        <div className="container">
          <DesktopCarousel
            index={index}
            images={images}
            onSelect={handleSelect}
            onImageClick={handleImageClick}
          />
        </div>
      )}

      <CarouselGallery
        images={images}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ImageCarousel;
