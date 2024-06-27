import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PostCard from './PostCard';
import { PostType } from '../../../types';

interface RelatedPostsProps {
  posts: PostType[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-y-1.5 mt-4">
      {posts.map((post) => (
        <PostCard post={post} key={`post-card-${post.postId}`} />
      ))}
    </div>
  );
};

export default RelatedPosts;
