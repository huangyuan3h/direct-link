'use client';

import { PostType, PostsResponse } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostTile } from '../../../../components/PostTile';
import styles from './index.module.scss';
import useSWR from 'swr';
import APIClient from '@/utils/apiClient';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { breakpoints } from '@/utils/breakpoint';

const limit = 10; // each time fetch posts number

const reachBottomPercentage = 80; // when reach 80% load next page

const getPosts = async (
  nextToken: string,
  category: string
): Promise<PostsResponse> => {
  try {
    const client = new APIClient();
    return await client.post('/posts', {
      limit,
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
  const [nextToken, setNextToken] = useState<string>(initialNextToken);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  const [loadMoreData, setLoadMoreData] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    loadMoreData ? `api/posts?nextToken=${nextToken}` : null,
    () => getPosts(nextToken, category),
    {
      revalidateOnFocus: false,
    }
  );

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const appendDataToPosts = useCallback((newData: PostType[]) => {
    setPosts((prevPosts) => {
      const set = new Set([...prevPosts, ...newData]);
      return Array.from(set);
    });
  }, []);

  useEffect(() => {
    if (!isLoading && data?.results) {
      appendDataToPosts(data?.results);
      setNextToken(data?.next_token);
    }
  }, [isLoading, data, appendDataToPosts]);

  useEffect(() => {
    if (imagesLoadedCount === data?.results.length) {
      setImagesLoadedCount(0);
    }
  }, [imagesLoadedCount, data?.results.length]);

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
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          [breakpoints.xs]: 2,
          [breakpoints.sm]: 3,
          [breakpoints.md]: 3,
          [breakpoints.lg]: 4,
          [breakpoints.xl]: 5,
        }}
      >
        <Masonry gutter={'16px'}>
          {posts.map((post, idx) => {
            return (
              <PostTile
                key={`post-tile-${idx}`}
                subject={post.subject}
                images={post.images}
                postId={post.postId}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
