import useInnerWidth from './useInnerWidth';

/**
 * Hook to determine if the screen width is considered small.
 * @param threshold The maximum width for a screen to be considered small. Defaults to 1024.
 * @returns A boolean indicating whether the screen is small.
 */
export default function useIsSmallScreen(threshold: number = 1024): boolean {
  const width = useInnerWidth();
  return width < threshold;
};
