import { ReactElement, useCallback, useRef } from 'react';

const InfiniteScrollContainer = <T,>({
  items,
  onUpdated,
  totalLength,
  renderItem,
  className,
  isLoading,
}: {
  items: T[];
  onUpdated: () => void;
  totalLength?: number;
  renderItem: (prop: T) => ReactElement<T>;
  className?: string;
  isLoading: boolean;
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        const target = entries[0];
        const hasNextPage = (totalLength ?? 0) > items.length;
        if (target?.isIntersecting && hasNextPage && !isLoading) {
          observer.current?.unobserve(node);
          onUpdated();
        }
      });
      if (node) observer.current?.observe(node);
    },
    [onUpdated]
  );

  return (
    <div className={className}>
      {items.length > 0 &&
        items.map((item, idx) =>
          items.length === idx + 1 ? (
            <div ref={lastElementRef} key={idx}>
              {renderItem(item)}
            </div>
          ) : (
            <div key={idx}>{renderItem(item)}</div>
          )
        )}
    </div>
  );
};

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

function throttle(callback: IntersectionObserverCallback, delay: number) {
  let lastCall = 0;
  return function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(entries, observer);
    }
  };
}

export default InfiniteScrollContainer;
