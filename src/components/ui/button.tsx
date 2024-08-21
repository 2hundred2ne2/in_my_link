"use client";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

// 공통 스타일
const baseButtonStyles =
  "inline-flex items-center justify-center rounded-md font-medium text-sm transition-colors";

const buttonVariants = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800",
  secondary: "bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-100 ",
  text: "text-zinc-900 hover:bg-zinc-100 ",
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
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  radius?: keyof typeof buttonRadii;
  loading?: boolean; // 로딩 상태
  disabled?: boolean; // 버튼의 비활성화
  children?: ReactNode;
}
/** 
@example
     // Primary 버튼
      <Button variant="primary">Primary Button</Button>
      // Secondary 버튼
      <Button variant="secondary">Secondary Button</Button>
      // Text 버튼
      <Button variant="text">Text Button</Button>
      // Small 버튼
      <Button size="small">Small Button</Button>
      // Medium 버튼 (기본 크기)
      <Button size="medium">Medium Button</Button>
      // Large 버튼
      <Button size="large">Large Button</Button>
      // Default (기본) 모서리
      <Button radius="default">Default Radius Button</Button>
      // None (모서리 없음)
      <Button radius="none">No Radius Button</Button>
      // Full (완전 원형)
      <Button radius="full">Full Radius Button</Button>
      // 로딩 상태
      <Button loading>Loading...</Button>
      // 비활성화 상태
      <Button disabled>Disabled Button</Button>
      // 추가 클래스 및 스타일
      <Button className="custom-class">Custom Styled Button</Button>
      // HTML 속성 전달
      <Button
        type="submit"
        onClick={function () {
          alert("Button clicked!");
        }}
      >
        Submit
      </Button>
*/
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
          "active:scale-[0.98] duration-100 transition-transform",
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
