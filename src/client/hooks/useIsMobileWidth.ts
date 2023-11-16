import useInnerWidth from './useInnerWidth';

export default (): boolean => {
  const width = useInnerWidth();
  return width < 1024;
};
