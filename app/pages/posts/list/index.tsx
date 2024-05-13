'use client';

import { useWindowWidth } from '@/utils/hooks/useWindowWidth';

export const PostList: React.FC = () => {
  const windowWidth = useWindowWidth();

  console.log(windowWidth);

  return <div>post list</div>;
};
