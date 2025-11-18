import React, { useEffect, useRef } from "react";

export default function InfiniteScrollWrapper({ children, loadMore, hasMore }) {
  const loaderRef = useRef();

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="w-full">
      {children}
      {/* Trigger Element */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <div className="animate-spin h-6 w-6 border-2 border-teal-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}
