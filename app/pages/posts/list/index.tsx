'use client';

import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useEffect, useRef, useState } from 'react';
import { PostTile } from './components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';
import useSWR from 'swr';

const gap = 16;
const AnimationGap = 200; // second refresh to avoid shake

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
  const [postLeftPositions, setPostLeftPositions] = useState<number[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && data?.results) {
      setPosts(data?.results);
      setNextToken(data?.next_token);
      setTopPostions(Array(data?.results.length).fill(0));
      setPostLeftPositions(Array(data?.results.length).fill(0));
    }
  }, [isLoading, data]);

  const itemWidth = (windowWidth - (columnNum + 1) * gap) / columnNum;

  useEffect(() => {
    const updateLayoutFn = () => {
      if (!ref.current || columnNum === 0) {
        return;
      }

      const elements = ref.current.children;

      const newTopPosition: number[] = [];
      const newLeftPosition: number[] = [];

      for (let i = 0; i < elements.length; i++) {
        const rowNumber = Number.parseInt(`${i / columnNum}`, 10);
        const columnPosition = i % columnNum;

        let actualTop = 0;
        let actualLeft = columnPosition * (gap + itemWidth);

        if (rowNumber !== 0) {
          const previousTop = newTopPosition[i - columnNum];

          const previousElement = elements[i - columnNum];

          actualTop = previousTop + previousElement.clientHeight;
        }

        newTopPosition.push(actualTop);
        newLeftPosition.push(actualLeft);
      }

      setTopPostions(newTopPosition);
      setPostLeftPositions(newLeftPosition);
    };
    updateLayoutFn();
    setTimeout(() => {
      updateLayoutFn();
    }, AnimationGap);
  }, [posts.length, columnNum, windowWidth, itemWidth]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.scrollArea} ref={ref}>
      {posts.map((p, idx) => {
        return (
          <PostTile
            key={`post-tile-${idx}`}
            subject={p.subject}
            images={p.images}
            postId={p.postId}
            style={{
              width: itemWidth,
              transform: `translate(${postLeftPositions[idx]}px, ${postTopPostions[idx]}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
