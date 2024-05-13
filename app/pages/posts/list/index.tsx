'use client';

import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import { useColumnNumber } from './utils/layout';
import { PostType, PostsResponse } from '../types';
import { useState } from 'react';

export const PostList: React.FC<PostsResponse> = ({
  results: ps,
  next_token,
}: PostsResponse) => {
  const columnNum = useColumnNumber();
  const initialized = useComponentInitialized();

  const [posts, setPosts] = useState<PostType[]>(ps);

  const [nextToken, setNextToken] = useState<string>(next_token);

  console.log(posts, nextToken);

  console.log(columnNum);
  if (columnNum === 0 || !initialized) {
    return <div>loading..</div>;
  }

  return <div>post list</div>;
};
