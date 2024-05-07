'use client';

import { PostResponseType } from '../types';
import { Categories } from './components/Categories';
import { Content } from './components/Content';
import ImageCarousel from './components/ImageCarousel';
import { Title } from './components/Title';

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
    <div>
      <div className="container">
        <Title title={subject} />
      </div>
      <ImageCarousel images={images} />
      <div className="container">
        <Content content={content} />
        <Categories categories={categories} />
      </div>
    </div>
  );
};
