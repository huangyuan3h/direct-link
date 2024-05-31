import { PostType } from '@/app/pages/posts/types';
import { PostTile } from '@/components/PostTile';
import React from 'react';

interface MyPostsProps {
  posts: PostType[];
}

const MyPosts: React.FC<MyPostsProps> = ({ posts }: MyPostsProps) => {
  const handleImageLoaded = () => {
    console.log('Image loaded');
  };
  return (
    <div className="my-posts">
      {posts.map((post) => (
        <PostTile
          key={post.postId || post.subject}
          postId={post.postId}
          subject={post.subject}
          images={post.images}
          onImageloaded={handleImageLoaded}
        />
      ))}
    </div>
  );
};

export default MyPosts;
