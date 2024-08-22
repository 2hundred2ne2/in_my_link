import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Portal } from "../portal";

import { BackDrop } from "./backdrop";

const DURATION = 200;

interface ModalProps {
  /**
   * 모달 열림 여부
   */
  isOpen?: boolean;

  /**
   * 백드롭 보임 여부
   */
  isBackdropVisible?: boolean;

  children?: ReactNode;

  className?: string;

  onClose?: () => void;
}

export function Modal({
  isOpen = false,
  isBackdropVisible = true,
  children,
  className,
  onClose,
}: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRender(true);
      setTimeout(() => setIsModalOpen(true), 10);
    } else {
      setIsModalOpen(false);
      setTimeout(() => setIsRender(false), DURATION);
    }
  }, [isOpen]);

  if (!isRender) {
    return null;
  }

  return (
    <Portal>
      <BackDrop
        className={cn(
          `fixed inset-0 flex items-center justify-center p-3 z-20 transition-opacity duration-[${DURATION}ms] ease-in-out`,
          isModalOpen ? "opacity-100" : "opacity-0",
          !isBackdropVisible && "bg-transparent",
        )}
        onClick={onClose}
      >
        <div
          className={cn(
            `w-full max-w-md p-6 rounded-2xl bg-background transition-all duration-[${DURATION}ms] ease-in-out z-30`,
            isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
            !isBackdropVisible && "shadow-md border border-[0.1]",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </BackDrop>
    </Portal>
  );
}
