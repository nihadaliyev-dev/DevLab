import { useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  Size
] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { inlineSize: width, blockSize: height } =
        (entry as any).borderBoxSize?.[0] || {};
      if (width != null && height != null) {
        setSize({ width, height });
        return;
      }
      const cr = entry.contentRect;
      setSize({ width: cr.width, height: cr.height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
