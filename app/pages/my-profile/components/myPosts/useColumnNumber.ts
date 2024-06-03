import { breakpoints } from '@/utils/breakpoint';

export const useColumnNumber = (width: number): number => {
  if (width < breakpoints.sm) {
    return 2;
  }

  if (width < breakpoints.md) {
    return 3;
  }

  if (width < breakpoints.lg) {
    return 4;
  }

  return 5;
};
