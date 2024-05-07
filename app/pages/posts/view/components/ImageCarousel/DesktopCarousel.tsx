import Image from 'next/image';

export interface DesktopCarouselProps {
  images: string[];
}

export const DesktopCarousel = ({ images }: DesktopCarouselProps) => {
  if (images.length === 0) {
    return <></>;
  }

  if (images.length < 3) {
    return (
      <div className="row">
        {images.map((imageUrl, i) => (
          <div className="col-md-4" key={i}>
            <Image src={imageUrl} alt={`Slide ${i}`} width={800} height={600} />
          </div>
        ))}
      </div>
    );
  }

  return <div className="container">desktop</div>;
};
