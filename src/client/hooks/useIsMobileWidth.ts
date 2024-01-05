import useInnerWidth from './useInnerWidth';

function isMobile() {
  const width = useInnerWidth();
  return width < 1024;
}

export default isMobile;