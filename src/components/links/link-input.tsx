"use client";

import { useEffect, useRef, useState } from "react";

import { PencilSimple } from "@phosphor-icons/react";

import { cn, getSnsUrl } from "@/lib/utils";
import { LinkType } from "@/types/link";

export interface LinkInputProps {
  /** 입력 필드의 레이블 */
  label: string;

  /** 값 */
  value?: string;

  /**  링크 타입 */
  linkType: LinkType;

  className?: string;

  /** 값이 변경될 때 호출되는 콜백 함수 */
  onChange: (value: string) => void;
}

export function LinkInput({ label, value = "", linkType, className, onChange }: LinkInputProps) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  const urlPrefix = getSnsUrl(linkType);
  const displayLabel = linkType;

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
          <span
            className={cn(
              "max-w-full whitespace-nowrap text-ellipsis overflow-hidden",
              value.trim().length === 0 && "text-foreground-muted",
            )}
          >
            {value || label}
          </span>
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
