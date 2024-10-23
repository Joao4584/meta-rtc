import { useCallback } from 'react';

const useDelay = () => {
  const delay = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }, []);

  return { delay };
};

export default useDelay;
