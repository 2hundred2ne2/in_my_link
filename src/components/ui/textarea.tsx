"use client";

import { ComponentPropsWithoutRef, forwardRef, useId } from "react";

import { cn } from "@/lib/utils";

const variants = {
  default:
    "rounded-xl p-4 bg-background-muted border border-transparent focus:border-border focus:outline-none",
} as const;

const statuses = {
  default: "",
  error: "border-danger focus:border-danger",
} as const;

const resizeOptions = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
} as const;

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  variant?: keyof typeof variants;
  status?: keyof typeof statuses;
  resize?: keyof typeof resizeOptions;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { variant = "default", status = "default", resize = "vertical", id, className, ...rest },
    ref,
  ) => {
    const labelingId = useId();
    const inputId = id ?? labelingId;

    return (
      <textarea
        ref={ref}
        id={inputId}
        className={cn(variants[variant], statuses[status], resizeOptions[resize], className)}
        {...rest}
      />
    );
  },
);
