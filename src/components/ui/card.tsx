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

export function Card({ variant = "muted", className, children, ...rest }: CardProps) {
  const classNames = `${variants[variant]} inline-flex p-2 ${className}`;
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
