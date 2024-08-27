"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface EditableTextProps {
  label: string;
  value?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange: (value: string) => void;
}

export function EditableText({
  label,
  value = "",
  leftIcon,
  rightIcon,
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
    <div className="grid pl-2 w-full text-sm">
      {/* 편집상태가 아닐 때  */}
      <div
        className={cn("row-start-1 col-start-1 overflow-hidden", className, isEdit && "sr-only")}
      >
        <button
          type="button"
          className="flex items-center max-w-full min-h-7"
          onClick={() => setIsEdit(true)}
        >
          {leftIcon && <span>{leftIcon}</span>}
          <span
            className={cn(
              "max-w-full whitespace-nowrap text-ellipsis overflow-hidden",
              value.trim().length === 0 && "text-foreground-muted",
            )}
          >
            {value || label}
          </span>
          {rightIcon && <span>{rightIcon}</span>}
        </button>
      </div>

      {/* 편집상태 */}
      <label className={cn("row-start-1 col-start-1", className, !isEdit && "sr-only")}>
        <span className="sr-only">{label}</span>
        <input
          ref={inputRef}
          type="text"
          placeholder={label}
          className="w-full min-h-7 outline-none"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
}
