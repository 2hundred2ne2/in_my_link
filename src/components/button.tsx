"use client";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

// 공통 스타일
const baseButtonStyles =
  "inline-flex items-center justify-center rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-700",
  secondary: "bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300",
  text: "text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300",
};

const buttonSizes = {
  small: "py-1 px-3 text-sm",
  medium: "py-2 px-4 text-sm",
  large: "py-3 px-6 text-base",
};

const buttonRadii = {
  none: "rounded-none",
  default: "rounded-md",
  full: "rounded-full",
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  radius?: "none" | "default" | "full";
  loading?: boolean; // 로딩 상태
  disabled?: boolean; // 버튼의 비활성화
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      radius = "default",
      loading = false,
      disabled = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          baseButtonStyles,
          buttonVariants[variant],
          buttonSizes[size],
          buttonRadii[radius],
          className,
          isDisabled && "opacity-50 pointer-events-none",
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <span className="loader mr-2" />} {/* 로딩 아이콘 추가 */}
        {children}
      </button>
    );
  },
);
