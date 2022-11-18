import { RefObject, useEffect, useState } from 'react';

const getElementSize = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  return {
    width:
      element.offsetWidth +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight),
    height:
      element.offsetHeight +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom),
  };
};

const useElementSize = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      setDimensions(getElementSize(ref.current!));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return dimensions;
};

export default useElementSize;
