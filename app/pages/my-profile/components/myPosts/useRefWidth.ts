import { useEffect, useState } from 'react';

export const useRefWidth = (ref: React.RefObject<HTMLDivElement>): number => {
  const [refWidth, setWidth] = useState(ref.current?.offsetWidth ?? 0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current?.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return refWidth;
};
