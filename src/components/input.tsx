import { ComponentPropsWithoutRef, useId } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  variant?: "default";
  status?: "default" | "error";
  label?: string;
  errorMessage?: string;
}

const variants = {
  default:
    "h-14 p-4 rounded-xl bg-background-muted border border-transparent focus-visible:border-border focus-visible:outline-none",
};

const statuss = {
  default: "",
  error:
    "border border-danger focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger placeholder:text-foreground",
};

export function Input({
  variant = "default",
  status = "default",
  label,
  errorMessage,
  id,
  className,
  ...rest
}: InputProps) {
  const labelingId = useId();
  const inputId = id ?? labelingId;
  const classNames = `${variants[variant]} ${statuss[status]} ${className}`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm">
        {label}
      </label>
      <input id={inputId} className={classNames} {...rest} />
      {status === "error" && <p className="block text-sm text-danger">{errorMessage}</p>}
    </div>
  );
}
