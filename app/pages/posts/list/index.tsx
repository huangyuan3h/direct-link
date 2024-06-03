'use client';

import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostTile } from '../../../../components/PostTile';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import styles from './index.module.scss';
import useSWR from 'swr';
import APIClient from '@/utils/apiClient';

const gap = 16;

const limit = 50; // each time fetch posts number

const reachBottomPercentage = 60; // when reach 60% load next page

const getPosts = async (
  nextToken: string,
  category: string
): Promise<PostsResponse> => {
  try {
    const client = new APIClient();
    return await client.post('/posts', {
      limit: 50,
      next_token: nextToken,
      category,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { results: [], next_token: '' };
  }
};

export interface PostListProps {
  category: string;
  initialPosts: PostType[];
  nextToken: string;
}

export const PostList: React.FC<PostListProps> = ({
  initialPosts,
  nextToken: initialNextToken,
  category,
}: PostListProps) => {
  const windowWidth = useWindowWidth();
  const columnNum = useColumnNumber(windowWidth);
  const [nextToken, setNextToken] = useState<string>(initialNextToken);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [ssrLoading, setSSRLoading] = useState(true);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    !loadMoreData ? null : `api/posts`,
    () => getPosts(nextToken, category)
  );

  const [postTopPostions, setTopPostions] = useState<number[]>([]);
  const [postLeftPositions, setPostLeftPositions] = useState<number[]>([]);

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  const [itemWidth, setItemWidth] = useState(200);

  useEffect(() => {
    setItemWidth((windowWidth - (columnNum + 1) * gap) / columnNum);
  }, [windowWidth, columnNum]);

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

  useEffect(() => {
    if (imagesLoadedCount === data?.results.length) {
      setImageLoaded(true);
      setImagesLoadedCount(0);
    }
  }, [imagesLoadedCount, data?.results.length]);

  useEffect(() => {
    if (ssrLoading && imagesLoadedCount === initialPosts.length) {
      setImageLoaded(true);
      setImagesLoadedCount(0);
      setSSRLoading(false);
    }
  }, [imagesLoadedCount, ssrLoading, initialPosts.length]);

  useEffect(() => {
    if (!isImageLoaded) {
      return;
    }

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
  }, [columnNum, isImageLoaded, itemWidth]);

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
