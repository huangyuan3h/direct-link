'use client';

import { PostResponseType } from '../types';
import ImageCarousel from './components/ImageCarousel';

interface ViewProps extends PostResponseType {}

export const View: React.FC<ViewProps> = ({
  id,
  subject,
  content,
  categories,
  images,
}: ViewProps) => {
  console.log(id, subject, content, categories, images);
  return (
    <div className="container pt-8">
      <h3>{subject}</h3>
      <ImageCarousel images={images} />
    </div>
  );
};
