'use client';

import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostTile } from './components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';
import useSWR from 'swr';

const gap = 16;

const limit = 20; // each time fetch posts number

const reachBottomPercentage = 60; // when reach 60% load next page

const getPosts = async (
  nextToken: string,
  category: string
): Promise<PostsResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}posts`, {
    method: 'POST',
    body: JSON.stringify({
      limit,
      next_token: nextToken,
      category,
    }),
  });
  return response.json();
};

export const PostList: React.FC = () => {
  const windowWidth = useWindowWidth();
  const columnNum = useColumnNumber();
  const [nextToken, setNextToken] = useState<string>('');

  const { data, isLoading, mutate } = useSWR(`api/posts`, () =>
    getPosts(nextToken, '')
  );

  const [posts, setPosts] = useState<PostType[]>([]);

  const [postTopPostions, setTopPostions] = useState<number[]>([]);
  const [postLeftPositions, setPostLeftPositions] = useState<number[]>([]);
  const [loadMoreData, setLoadMoreData] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const appendDataToPosts = useCallback((newData: PostType[]) => {
    setPosts((prevPosts) => {
      const existingIds = new Set(prevPosts.map((post) => post.postId));

      const uniqueNewData = newData.filter(
        (post) => !existingIds.has(post.postId)
      );

      return [...prevPosts, ...uniqueNewData];
    });
  }, []);

  useEffect(() => {
    if (!isLoading && data?.results) {
      appendDataToPosts(data?.results);
      setNextToken(data?.next_token);
      setImageLoaded(false);
    }
  }, [isLoading, data, appendDataToPosts]);

  const itemWidth = (windowWidth - (columnNum + 1) * gap) / columnNum;

  useEffect(() => {
    if (isLoading || !data?.results || data.results.length === 0) return;
    const imagePromises = data?.results.map(
      (posts) =>
        new Promise((resolve, reject) => {
          if (!posts.images || posts.images.length === 0) {
            return;
          }
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = posts.images[0];
        })
    );

    Promise.all(imagePromises)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('An error occurred while loading images:', error);
      });
  }, [isLoading, data]);

  useEffect(() => {
    const updateLayoutFn = () => {
      if (!ref.current || columnNum === 0 || !isImageLoaded) {
        return;
      }

      const elements = ref.current.children;
      const elementsHeight = Array.from(elements).map(
        (ele) => ele.clientHeight
      );

      const newTopPosition: number[] = [];
      const newLeftPosition: number[] = [];

      for (let i = 0; i < elements.length; i++) {
        const columnPosition = i % columnNum;
        let actualLeft = columnPosition * (gap + itemWidth);

        const previousItemsHeight = elementsHeight
          .filter((_, idx) => {
            return idx < i && idx % columnNum === columnPosition;
          })
          .reduce((prev, currentVal) => prev + currentVal, 0);

        newTopPosition.push(previousItemsHeight);
        newLeftPosition.push(actualLeft);
      }

      setTopPostions(newTopPosition);
      setPostLeftPositions(newLeftPosition);
    };
    setTimeout(() => {
      updateLayoutFn();
    }, 100);
  }, [columnNum, itemWidth, isImageLoaded]);

  // loading more data

  useEffect(() => {
    const container = ref.current;

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = ref.current!;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      setLoadMoreData(scrollPercentage >= reachBottomPercentage && !isLoading);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (!loadMoreData || nextToken === '') return;
    mutate().then(() => {
      setLoadMoreData(false);
    });
  }, [loadMoreData, mutate, nextToken]);

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
