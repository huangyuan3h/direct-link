'use client';

import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useEffect, useState } from 'react';
import { PostTile } from './components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';
import useSWR from 'swr';

const gap = 16;

const getPosts = async (): Promise<PostsResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}posts`, {
    method: 'POST',
    body: JSON.stringify({
      limit: 50,
      next_token: '',
      category: '',
    }),
  });
  return response.json();
};

export const PostList: React.FC = () => {
  const windowWidth = useWindowWidth();
  const columnNum = useColumnNumber();

  const { data, isLoading } = useSWR('api/posts', getPosts);

  const [posts, setPosts] = useState<PostType[]>([]);

  const [nextToken, setNextToken] = useState<string>('');

  useEffect(() => {
    if (!isLoading && data?.results) {
      setPosts(data?.results);
      setNextToken(data?.next_token);
    }
  }, [isLoading, data]);

  const itemWidth = (windowWidth - (columnNum + 1) * gap) / columnNum;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.scrollArea}>
      {posts.map((p, idx) => {
        const columnPosition = idx % columnNum;

        return (
          <PostTile
            key={`post-tile-${idx}`}
            subject={p.subject}
            images={p.images}
            postId={p.postId}
            style={{
              width: itemWidth,
              left: gap + columnPosition * (gap + itemWidth),
            }}
          />
        );
      })}
    </div>
  );
};
