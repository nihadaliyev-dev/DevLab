import { memo, forwardRef } from "react";
import { type CardProps } from "../../../types";

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    const baseClasses =
      "rounded-[3rem] border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]";

    return (
      <div ref={ref} className={`${baseClasses} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default memo(Card);
