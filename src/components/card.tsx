import { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "muted";
  className?: string;
  children?: React.ReactNode;
  padding?: string;
}

const variants = {
  default: "bg-background border",
  muted: "bg-background-muted border border-transparent",
};

export function Card({ variant = "default", className, children, padding, ...rest }: CardProps) {
  const classNames = `${variants[variant]} ${padding} ${className} inline-flex`;
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
