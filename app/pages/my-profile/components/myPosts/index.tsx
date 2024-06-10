import { PostType } from '@/app/pages/posts/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { breakpoints } from '@/utils/breakpoint';
import { DeleteModal } from './ConfirmDelete';
import APIClient from '@/utils/apiClient';
import { toastMessages } from '@/utils/toastMessage';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';
import { PostTile } from '@/components/PostTile';

interface MyPostsProps {
  posts: PostType[];
  nextToken: string;
}

type PostsResponse = {
  results: PostType[];
  next_token: string;
};

const limit = 50;

const reachBottomPercentage = 80; // when reach 60% load next page

const getMyPosts = async (nextToken: string): Promise<PostsResponse> => {
  try {
    const client = new APIClient();

    return await client.post('/my/posts', {
      limit: limit,
      next_token: nextToken,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { results: [], next_token: '' };
  }
};

const MyPosts: React.FC<MyPostsProps> = ({
  posts: ps,
  nextToken: token,
}: MyPostsProps) => {
  const [posts, setPosts] = useState<PostType[]>(ps);

  const ref = useRef<HTMLDivElement>(null);

  const [nextToken, setNextToken] = useState(token);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    nextToken !== '' ? '/my/posts' : null,
    () => getMyPosts(nextToken),
    {
      revalidateOnFocus: false,
    }
  );

  const [deleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

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
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } =
        document.documentElement;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (
        scrollPercentage >= reachBottomPercentage &&
        !isLoading &&
        nextToken !== '' &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        mutate();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, nextToken, isLoadingMore, mutate]);

  const handleCheckClick = (id: string) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((p) => p !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const client = new APIClient();

    const res = await toast.promise(
      client.post('/my/post/delete', { post_ids: selectedPosts }),
      {
        success: toastMessages.DELETE_SUCCESS,
        pending: toastMessages.DELETE_LOADING,
        error: toastMessages.DELETE_ERROR,
      },
      { position: 'top-center' }
    );

    if (res.message === 'success') {
      setShowDeleteModal(false);
      setPosts(posts.filter((post) => !selectedPosts.includes(post.postId)));
      setSelectedPosts([]);
    }
  };

  return (
    <div className={clsx(styles.scrollArea, 'container')} ref={ref}>
      <DeleteModal
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        show={deleteModal}
      />
      <div className="m-2 flex flex-row-reverse">
        <Button
          variant="primary"
          size="sm"
          onClick={handleDeleteClick}
          disabled={selectedPosts.length === 0}
        >
          批量删除
        </Button>
      </div>
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
              onChecked={handleCheckClick}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default MyPosts;
