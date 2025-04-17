import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current?.contains(event.target as Node)) return;

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, callback]);
};
