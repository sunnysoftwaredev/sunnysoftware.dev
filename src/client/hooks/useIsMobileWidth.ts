import useInnerWidth from './useInnerWidth';

/**
 * Hook for determining if the current view is a mobile view based on the inner width.
 * @returns {boolean} True if the width of the window is less than 1024 pixels, indicating a mobile view.
 */
export default function useMobileView(): boolean {
  const width = useInnerWidth();
  return width < 1024;
};
