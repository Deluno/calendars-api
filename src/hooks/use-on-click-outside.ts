import { RefObject, useEffect } from 'react';

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const mouseListener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    const touchListener = (event: TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', mouseListener);
    document.addEventListener('touchstart', touchListener);

    return () => {
      document.removeEventListener('mousedown', mouseListener);
      document.removeEventListener('touchstart', touchListener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
