import React, { useId } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  variant?: "default";
  status?: "default" | "error" | "disabled";
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  errorMessage?: string;
  className?: string;
  id?: string;
}

const variants = {
  default: "h-14 p-4 rounded-xl bg-background-muted",
};

const statuss = {
  default: "",
  error:
    "border border-danger focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger placeholder:text-foreground",
  disabled: "border bg-[#E4E4E7] text-foreground-disabled",
};

export function Input({
  variant = "default",
  status = "default",
  type,
  label,
  errorMessage,
  id,
  className,
  ...rest
}: InputProps) {
  const inputId = id ? id : useId();
  const classNames = `${variants[variant]} ${statuss[status]} ${className}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm mb-2">
        {label}
      </label>
      <input id={inputId} type={type} className={classNames} {...rest} />
      {status === "error" && <p className="block text-danger text-sm">{errorMessage}</p>}
    </div>
  );
}
