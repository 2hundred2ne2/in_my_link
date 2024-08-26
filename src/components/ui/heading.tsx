import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  heading1: "text-3xl font-bold", // "text-3xl md:text-4xl font-bold",
  heading2: "text-2xl font-bold", // "text-2xl md:text-3xl font-bold",
  heading3: "text-xl font-semibold", // "text-xl md:text-2xl font-semibold",
  subtitle1: "text-lg  font-medium", // "text-lg md:text-xl font-medium",
  subtitle2: "text-base ", // "text-base md:text-lg",
} as const;

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  variant?: keyof typeof variants;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
  className?: string;
}

export function Heading({ variant = "heading2", order = 1, children, className }: HeadingProps) {
  const Component: keyof JSX.IntrinsicElements = `h${order}`;
  return <Component className={cn(variants[variant], className)}>{children}</Component>;
}
