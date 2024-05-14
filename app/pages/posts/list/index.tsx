'use client';

import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useEffect, useRef, useState } from 'react';
import { PostTile } from './components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';
import useSWR from 'swr';

const gap = 16;
const refreshedTime = 50;

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
  const [postTopPostions, setTopPostions] = useState<number[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && data?.results) {
      setPosts(data?.results);
      setNextToken(data?.next_token);
      setTopPostions(Array(data?.results.length).fill(0));
    }
  }, [isLoading, data]);

  useEffect(() => {
    setTimeout(() => {
      if (!ref.current || columnNum === 0) {
        return;
      }
      const elements = ref.current.children;

      const newTopPostions: number[] = [];

      for (let i = 0; i < elements.length; i++) {
        const rowNumber = Number.parseInt(`${i / columnNum}`, 10);

        if (rowNumber === 0) {
          newTopPostions.push(gap);
          continue;
        }

        const previousTop = newTopPostions[i - columnNum];

        const previousElement = elements[i - columnNum];

        const currentTop = previousTop + previousElement.clientHeight;

        newTopPostions.push(currentTop);
      }

      setTopPostions(newTopPostions);
    }, refreshedTime);
  }, [posts.length, columnNum, windowWidth]);

  const itemWidth = (windowWidth - (columnNum + 1) * gap) / columnNum;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.scrollArea} ref={ref}>
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
              top: postTopPostions[idx],
            }}
          />
        );
      })}
    </div>
  );
};
