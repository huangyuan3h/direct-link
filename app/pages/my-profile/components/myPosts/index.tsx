import { PostType } from '@/app/pages/posts/types';
import { PostTile } from './PostTileV2';
import React, { useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { breakpoints } from '@/utils/breakpoint';

interface MyPostsProps {
  posts: PostType[];
  nextToken: string;
}

const MyPosts: React.FC<MyPostsProps> = ({
  posts,
  nextToken,
}: MyPostsProps) => {
  console.log(posts, nextToken);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(styles.scrollArea, 'container')} ref={ref}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          [breakpoints.sm]: 2,
          [breakpoints.md]: 3,
          [breakpoints.lg]: 4,
          [breakpoints.xl]: 5,
        }}
      >
        <Masonry gutter={'16px'}>
          {posts.map((post) => (
            <PostTile
              key={post.postId || post.subject}
              postId={post.postId}
              subject={post.subject}
              images={post.images}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default MyPosts;
