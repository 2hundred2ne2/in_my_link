"use client";
import React, { useState, useEffect, ComponentPropsWithoutRef } from "react";

import { Checks, X } from "@phosphor-icons/react";

interface ToastProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "secondary" | "third";
  children?: React.ReactNode;
  className?: string;
  enterposition?: "entertop" | "enterbottom";
  closeposition?: "closetop" | "closebottom";
}

const ToastVariants = {
  default: "bg-zinc-900 text-white rounded-md",
  secondary: "bg-red-600 text-white rounded-md",
  third: "bg-white rounded-md border border-gray-200",
};

const Positionanimate = {
  entertop: "animate-toast-top",
  enterbottom: "animate-toast-bottom",
}; // 나타나게되는 방향 애니메이션 -> 위에서 아래로, 아래서 위로

const PositionanimateHide = {
  closetop: "animate-toast-top-hide",
  closebottom: "animate-toast-bottom-hide",
}; // 사라지게되는 방향 애니메이션 -> 위로 숨기기, 아래로 숨기기

function BoardCreate({
  variant = "default",
  children,
  className,
  enterposition = "entertop",
  closeposition = "closetop",
  ...rest
}: ToastProps) {
  const [toast, setToast] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const showToastHandler = () => {
    setToast(true);
    setIsHiding(false);

    // 3초 후에 숨기기 애니메이션 시작
    setTimeout(() => {
      setIsHiding(true);
    }, 1000);

    setTimeout(() => {
      setToast(false);
    }, 1500);
  };

  const closeHandler = () => {
    // 숨기기 애니메이션 시작
    setIsHiding(true);

    setTimeout(() => {
      setToast(false);
    }, 500);
  };

  useEffect(() => {
    if (isHiding && !toast) {
      setIsHiding(false); // 상태를 초기화하여 다음 표시를 가능하게
    }
  }, [isHiding, toast]);

  const classNames = `${ToastVariants[variant]} inline-flex flex-row gap-5 p-2 ${className} ${isHiding ? PositionanimateHide[closeposition] : Positionanimate[enterposition]}`;
  return (
    <div>
      <button onClick={showToastHandler} className="text-sky-600 p-10">
        저장
      </button>
      {toast && (
        <div className={classNames} {...rest}>
          <Checks size={24} color="#FFF" />
          {children}
          <button onClick={closeHandler}>
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default BoardCreate;
