import { useEffect, useState, MutableRefObject } from "react";

export function useIsVisible(ref: MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry?.isIntersecting as boolean);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}