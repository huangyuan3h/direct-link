import { PostType } from '@/app/pages/posts/types';
import { PostTile } from './PostTileV2';
import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { breakpoints } from '@/utils/breakpoint';
import { DeleteModal } from './ConfirmDelete';
import APIClient from '@/utils/apiClient';
import { toastMessages } from '@/utils/toastMessage';
import { toast } from 'react-toastify';

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

  const [deleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostType>();

  const handleClickDelete = (id: string) => {
    const current = posts.find((p) => p.postId === id);
    setCurrentPost(current);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    const client = new APIClient();

    client.post('/my/post/delete', { post_id: currentPost?.postId });

    const res = await toast.promise(
      client.post('/my/post/delete', { post_id: currentPost?.postId }),
      {
        success: toastMessages.DELETE_SUCCESS,
        pending: toastMessages.DELETE_LOADING,
        error: toastMessages.DELETE_ERROR,
      },
      { position: 'top-center' }
    );

    if (res.message === 'success') {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className={clsx(styles.scrollArea, 'container')} ref={ref}>
      <DeleteModal
        title={currentPost?.subject ?? ''}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        show={deleteModal}
      />
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
              onDelete={handleClickDelete}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default MyPosts;
