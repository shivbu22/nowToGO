import { useState, useEffect, RefObject } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0.1, rootMargin = '0px', triggerOnce = true }: ObserverOptions = {}
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, rootMargin, triggerOnce]);

  return isVisible;
};

export default useIntersectionObserver;
