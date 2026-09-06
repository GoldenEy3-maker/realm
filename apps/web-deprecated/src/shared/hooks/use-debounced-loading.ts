import { useEffect, useRef, useState } from "react";

export function useDebouncedLoading(isLoading: boolean, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        setLoading(true);
      }, delay);
    } else {
      setLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isLoading, delay]);

  return loading;
}
