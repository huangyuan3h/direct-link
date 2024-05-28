import { breakpoints } from '@/utils/breakpoint';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';

const ITEM_MAX_WIDTH = 260;

export const useColumnNumber = (): number => {
  const windowWidth = useWindowWidth();
  if (windowWidth === 0) {
    return 0;
  }

  if (windowWidth < breakpoints.sm) {
    return 2;
  }

  return Math.floor(windowWidth / ITEM_MAX_WIDTH);
};
