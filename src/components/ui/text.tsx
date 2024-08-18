import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  body1: "text-sm md:text-base",
  body2: "text-xs md:text-sm",
} as const;

interface TextProps<T extends ElementType = "span"> {
  as?: T;
  variant?: keyof typeof variants;
  children?: ReactNode;
  className?: string;
}

export function Text<T extends ElementType = "span">({
  as,
  variant = "body1",
  children,
  className,
}: TextProps & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = as || "span";
  return <Component className={cn(variants[variant], className)}> {children}</Component>;
}
