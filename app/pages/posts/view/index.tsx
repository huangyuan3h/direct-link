'use client';

import clsx from 'clsx';
import { PostResponseType, PostType } from '../types';
import { Categories } from './components/Categories';
import { Content } from './components/Content';
import ImageCarousel from './components/ImageCarousel';
import { MessageArea } from './components/MessageArea';
import Share from './components/Share';
import { Title } from './components/Title';
import styles from './index.module.scss';
import RelatedPosts from './components/RelatedPosts';

interface ViewProps extends PostResponseType {
  relateds: PostType[];
}

export const View: React.FC<ViewProps> = ({
  subject,
  content,
  topics,
  images,
  email,
  relateds,
}: ViewProps) => {
  console.log(relateds);
  return (
    <div className={clsx('container', styles.layout)}>
      <div className={styles.mainContentArea}>
        <Title title={subject} />
        <ImageCarousel images={images} />
        <Share isMobile topics={topics} images={images} subject={subject} />
        <Content content={content} />
        <Categories categories={topics} />
        <RelatedPosts posts={relateds} />
      </div>
      <MessageArea
        topics={topics}
        images={images}
        subject={subject}
        email={email}
      />
    </div>
  );
};
