import { breakpoints } from '@/utils/breakpoint';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';

export const useColumnNumber = (): number => {
  const windowWidth = useWindowWidth();
  if (windowWidth === 0) {
    return 0;
  }
  if (windowWidth < breakpoints.sm) {
    return 2;
  }
  if (windowWidth < breakpoints.md) {
    return 3;
  }
  if (windowWidth < breakpoints.lg) {
    return 4;
  }

  return 5;
};
