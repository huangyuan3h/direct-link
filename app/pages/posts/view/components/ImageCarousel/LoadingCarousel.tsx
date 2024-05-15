import { useEffect, useState } from 'react';
import { MAX_HEIGHT, goldenDivider } from './config';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { breakpoints } from '@/utils/breakpoint';

export const LoadingCarousel: React.FC = () => {
  const windowWidth = useWindowWidth();

  const [height, setHeight] = useState(MAX_HEIGHT);

  useEffect(() => {
    setHeight(windowWidth * goldenDivider);
  }, [windowWidth]);

  if (windowWidth < breakpoints.sm) {
    return (
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'grey',
        }}
      ></div>
    );
  }

  return (
    <div
      className="container"
      style={{
        width: '100%',
        backgroundColor: 'grey',
        height: `${MAX_HEIGHT}px`,
      }}
    ></div>
  );
};
