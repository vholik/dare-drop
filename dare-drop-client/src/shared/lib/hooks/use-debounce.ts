import { type MutableRefObject, useRef, useCallback } from "react";

/**
 * Hook for canceling previous call of the function until delay came
 * @param cb
 * @param delay - delay in miliseconds
 * @returns
 */
export function useDebounce(cb: (...args: any[]) => any, delay: number) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any[]) => {
      if (timer) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay]
  );
}
