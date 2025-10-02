import { memo, useMemo, useRef, useState } from "react";
import Card from "./Card";
import { useResizeObserver } from "../../../hooks/useResizeObserver";

export type SizeTier = "xs" | "sm" | "md" | "lg" | "xl";

export interface ResizableCardProps {
  className?: string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  children: (ctx: {
    width: number;
    height: number;
    tier: SizeTier;
  }) => React.ReactNode;
}

function getTier(width: number, height: number): SizeTier {
  const shortest = Math.min(width, height);
  if (shortest < 260) return "xs";
  if (shortest < 340) return "sm";
  if (shortest < 460) return "md";
  if (shortest < 620) return "lg";
  return "xl";
}

const ResizableCard = memo<ResizableCardProps>(
  ({
    className = "",
    minWidth = 220,
    minHeight = 180,
    maxWidth,
    maxHeight,
    children,
  }) => {
    const [containerRef, size] = useResizeObserver<HTMLDivElement>();
    const tier = useMemo(
      () => getTier(size.width, size.height),
      [size.width, size.height]
    );
    const [isResizing, setIsResizing] = useState(false);
    const startPos = useRef<{ x: number; y: number; w: number; h: number } | undefined>(undefined);

    const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      const el = containerRef.current;
      if (!el) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        w: el.offsetWidth,
        h: el.offsetHeight,
      };
      setIsResizing(true);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!isResizing || !startPos.current) return;
      const el = containerRef.current;
      if (!el) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      const nextW = Math.max(
        minWidth,
        Math.min(maxWidth ?? Infinity, startPos.current.w + dx)
      );
      const nextH = Math.max(
        minHeight,
        Math.min(maxHeight ?? Infinity, startPos.current.h + dy)
      );
      el.style.width = `${nextW}px`;
      el.style.height = `${nextH}px`;
    };

    const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (isResizing) setIsResizing(false);
      startPos.current = undefined;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    };

    return (
      <div
        ref={containerRef}
        className={`relative h-full w-full ${className}`}
        style={{
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          touchAction: "none",
        }}
      >
        <Card className={`h-full w-full ${isResizing ? "select-none" : ""}`}>
          {children({ width: size.width, height: size.height, tier })}
        </Card>

        {/* Resize handle (bottom-right) */}
        <button
          aria-label="Resize card"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="absolute bottom-2 right-2 h-5 w-5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 active:bg-white/20 transition-colors cursor-se-resize"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="opacity-70"
          >
            <path
              d="M5 15h10M8 12h7M11 9h4"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);

ResizableCard.displayName = "ResizableCard";

export default ResizableCard;
