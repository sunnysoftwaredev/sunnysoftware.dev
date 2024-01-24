import { useState, useEffect } from 'react';

function debounce(fn: Function, ms: number): () => void {
  let timer: number;
  return (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(this, arguments), ms);
  };
}

export default function useWindowSize(): number {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 250);

    window.addEventListener('resize', debouncedHandleResize);
    return (): void => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return width;
};
