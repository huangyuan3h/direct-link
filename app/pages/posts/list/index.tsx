'use client';

import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useState } from 'react';
import { PostTile } from './components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';

export const PostList: React.FC<PostsResponse> = ({
  results: ps,
  next_token,
}: PostsResponse) => {
  const windowWidth = useWindowWidth();
  const columnNum = useColumnNumber();
  const initialized = useComponentInitialized();

  const [posts, setPosts] = useState<PostType[]>(ps);

  const [nextToken, setNextToken] = useState<string>(next_token);

  const itemWidth = windowWidth / columnNum;

  console.log(posts, nextToken);

  console.log(itemWidth);
  if (columnNum === 0 || !initialized) {
    return <div>loading..</div>;
  }

  const firstItem = posts[0];

  return (
    <div className={styles.scrollArea}>
      <PostTile
        subject={firstItem.subject}
        images={firstItem.images}
        postId={firstItem.postId}
        style={{ width: itemWidth }}
      />
    </div>
  );
};
