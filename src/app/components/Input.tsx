import React, { useId } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  shape?: "default";
  status?: "default" | "error" | "disabled";
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

const shapes = {
  default: "w-[224px] h-[56px] p-[16px] rounded-[12px] bg-background-muted",
};

const statuss = {
  default: "",
  error:
    "border border-danger focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger placeholder:text-foreground",
  disabled: "border bg-[#E4E4E7] text-foreground-disabled",
};

export function Input({
  shape = "default",
  status = "default",
  type,
  label,
  placeholder,
  errorMessage,
  ...rest
}: InputProps) {
  const inputId = useId();
  const className = `${shapes[shape]} ${statuss[status]}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm mb-2">
        {label}
      </label>
      <input id={inputId} type={type} placeholder={placeholder} className={className} {...rest} />
      {status === "error" && <p className="block text-danger text-sm">{errorMessage}</p>}
    </div>
  );
}
