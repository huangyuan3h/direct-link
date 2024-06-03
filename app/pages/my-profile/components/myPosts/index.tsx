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
import { Button } from 'react-bootstrap';

interface MyPostsProps {
  posts: PostType[];
  nextToken: string;
}

const MyPosts: React.FC<MyPostsProps> = ({
  posts: ps,
  nextToken,
}: MyPostsProps) => {
  console.log(ps, nextToken);

  const [posts, setPosts] = useState<PostType[]>(ps);

  const ref = useRef<HTMLDivElement>(null);

  const [deleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

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
          删除帖子
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
