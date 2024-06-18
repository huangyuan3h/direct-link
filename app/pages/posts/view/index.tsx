'use client';

import clsx from 'clsx';
import { PostResponseType } from '../types';
import { Categories } from './components/Categories';
import { Content } from './components/Content';
import ImageCarousel from './components/ImageCarousel';
import { MessageArea } from './components/MessageArea';
import Share from './components/Share';
import { Title } from './components/Title';
import styles from './index.module.scss';

interface ViewProps extends PostResponseType {}

export const View: React.FC<ViewProps> = ({
  subject,
  content,
  topics,
  images,
  email,
}: ViewProps) => {
  return (
    <div className={clsx('container', styles.layout)}>
      <div className={styles.mainContentArea}>
        <Title title={subject} />
        <ImageCarousel images={images} />
        <Share isMobile />
        <Content content={content} />
        <Categories categories={topics} />
      </div>
      <MessageArea authEmail={email} />
    </div>
  );
};
