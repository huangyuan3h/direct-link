'use client';

import { PostResponseType } from '../types';
import { Categories } from './components/Categories';
import { Content } from './components/Content';
import ImageCarousel from './components/ImageCarousel';
import { Title } from './components/Title';
import styles from './index.module.scss';

interface ViewProps extends PostResponseType {}

export const View: React.FC<ViewProps> = ({
  subject,
  content,
  topics,
  images,
}: ViewProps) => {
  return (
    <div className="container">
      <div className={styles.mainContentArea}>
        <Title title={subject} />

        <ImageCarousel images={images} />

        <Content content={content} />
        <Categories categories={topics} />
      </div>
    </div>
  );
};
