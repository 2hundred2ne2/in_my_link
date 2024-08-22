import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "muted";
  className?: string;
  children?: React.ReactNode;
}

const variants = {
  default: "bg-background border",
  muted: "bg-background-muted border border-transparent",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...rest }: CardProps, ref) => {
    return (
      <div ref={ref} className={cn(variants[variant], className)} {...rest}>
        {children}
      </div>
    );
  },
);
