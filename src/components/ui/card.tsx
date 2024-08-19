import { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "muted";
  className?: string;
  children?: React.ReactNode;
}

const variants = {
  default: "bg-background border",
  muted: "bg-background-muted border border-transparent",
};

export function Card({ variant = "default", className, children, ...rest }: CardProps) {
  const classNames = `${variants[variant]} ${className} inline-flex`;
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
// className 으로 padding 값 전달.
