"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface EditableTextProps {
  label: string;
  value?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  className?: string;
  onChange: (value: string) => void;
}

export function EditableText({
  label,
  value = "",
  leftIcon,
  rightIcon,
  errorMessage,
  className,
  onChange,
}: EditableTextProps) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (inputRef.current) {
      setIsEdit(false);
      onChange(inputRef.current.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      setIsEdit(false);
      onChange(inputRef.current.value);
    }
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="grid w-full pl-2 text-sm">
      {/* 편집상태가 아닐 때  */}
      <div
        className={cn("col-start-1 row-start-1 overflow-hidden", className, isEdit && "sr-only")}
      >
        <button
          type="button"
          className="flex min-h-7 max-w-full items-center"
          onClick={() => setIsEdit(true)}
        >
          {leftIcon && <span>{leftIcon}</span>}
          <span
            className={cn(
              "max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
              errorMessage && "text-danger",
              value?.trim().length === 0 && "text-foreground-muted",
            )}
          >
            {value || label}
          </span>
          {rightIcon && <span>{rightIcon}</span>}
        </button>
      </div>

      {/* 편집상태 */}
      <label className={cn("col-start-1 row-start-1", className, !isEdit && "sr-only")}>
        <span className="sr-only">{label}</span>
        <input
          ref={inputRef}
          type="text"
          placeholder={label}
          className="min-h-7 w-full outline-none"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </label>

      {errorMessage && (
        <div className="relative inline-block w-fit rounded-sm bg-danger p-1">
          <div
            aria-hidden
            className="absolute bottom-full h-0 w-0 border-b-4 border-l-4 border-r-4 border-b-danger border-l-transparent border-r-transparent"
          ></div>
          <p className="text-xs font-semibold text-foreground-inverted">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
