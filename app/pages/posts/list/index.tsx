'use client';

import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import { useColumnNumber } from './utils/layout';

export const PostList: React.FC = () => {
  const columnNum = useColumnNumber();
  const initialized = useComponentInitialized();

  console.log(columnNum);
  if (columnNum === 0 || !initialized) {
    return <div>loading..</div>;
  }

  return <div>post list</div>;
};
