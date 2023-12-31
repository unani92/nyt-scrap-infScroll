import { ReactElement, useCallback, useRef } from 'react';

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
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        const target = entries[0];
        const hasNextPage = (totalLength ?? 0) > items.length && items.length % 10 === 0;
        if (target?.isIntersecting && hasNextPage) {
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
          items.length % 10 === 0 && items.length === idx + 1 ? (
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
