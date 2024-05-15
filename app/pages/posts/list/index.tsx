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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}posts`,
      {
        method: 'POST',
        body: JSON.stringify({ limit, next_token: nextToken, category }),
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { results: [], next_token: '' };
  }
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
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

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
    }
  }, [isLoading, data, appendDataToPosts]);

  useEffect(() => {
    setImageLoaded(false);
  }, [posts.length]);

  const itemWidth = (windowWidth - (columnNum + 1) * gap) / columnNum;

  useEffect(() => {
    if (imagesLoadedCount === data?.results.length) {
      setImageLoaded(true);
      setImagesLoadedCount(0);
    }
  }, [imagesLoadedCount, data?.results.length]);

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

    updateLayoutFn();
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
      {posts.map((post, idx) => {
        return (
          <PostTile
            key={`post-tile-${idx}`}
            subject={post.subject}
            images={post.images}
            postId={post.postId}
            style={{
              width: itemWidth,
              transform: `translate(${postLeftPositions[idx]}px, ${postTopPostions[idx]}px)`,
            }}
            onImageloaded={() => {
              setImagesLoadedCount((prevCount) => prevCount + 1);
            }}
          />
        );
      })}
    </div>
  );
};
