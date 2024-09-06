import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AppHeaderProps {
  children?: ReactNode;
  className?: string;
}

/**
  @example
  <AppHeader>
    <AppHeaderLeft>
      left
    </AppHeaderLeft>
    <AppHeaderCenter>
      center
    </AppHeaderCenter>
    <AppHeaderRight>
      right
    </AppHeaderRight>
  </AppHeader>
 */
export function AppHeader({ children, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 grid h-16 w-full max-w-sm grid-cols-[1fr_minmax(auto,65%)_1fr] bg-background/85 px-3 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </header>
  );
}

export interface AppHeaderLeftProps {
  children?: ReactNode;
  className?: string;
}

export function AppHeaderLeft({ children, className }: AppHeaderLeftProps) {
  return <div className={cn("flex items-center", className)}>{children}</div>;
}

export interface AppHeaderCenterProps {
  children?: ReactNode;
  className?: string;
}

export function AppHeaderCenter({ children, className }: AppHeaderCenterProps) {
  return <div className={cn("flex items-center justify-center", className)}>{children}</div>;
}

export interface AppHeaderRightProps {
  children?: ReactNode;
  className?: string;
}

export function AppHeaderRight({ children, className }: AppHeaderRightProps) {
  return <div className={cn("flex items-center justify-end", className)}>{children}</div>;
}
