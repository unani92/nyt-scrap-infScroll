import { ReactElement, useCallback, useRef, useState } from 'react';

const InfiniteScrollContainer = <T,>({
  items,
  onUpdated,
  totalLength,
  renderItem,
  className,
}: {
  items: T[];
  onUpdated: () => void;
  totalLength?: number;
  renderItem: (prop: T) => ReactElement<T>;
  className?: string;
}) => {
  const observer = useRef<IntersectionObserver>();
  const [canActivate, setCanActivate] = useState(true);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        const target = entries[0];
        const hasNextPage = (totalLength ?? 0) > items.length && items.length % 10 === 0;
        if (target?.isIntersecting && hasNextPage && canActivate) {
          setCanActivate(false);
          onUpdated();
          setTimeout(() => setCanActivate(true), 400);
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

export default InfiniteScrollContainer;
