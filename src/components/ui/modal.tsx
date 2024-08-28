import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Portal } from "../portal";

import { BackDrop } from "./backdrop";

const DURATION = 300;

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
      setTimeout(() => setIsModalOpen(true), 30);
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
          `fixed inset-0 z-20 flex items-center justify-center p-3 transition-opacity duration-100 ease-in`,
          isModalOpen ? "opacity-100" : "opacity-0",
          !isBackdropVisible && "bg-transparent",
        )}
        onClick={onClose}
      >
        <div
          className={cn(
            `w-full max-w-md rounded-2xl bg-background p-6 transition-all duration-[${DURATION}ms] z-30 ease-in-out`,
            isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
            !isBackdropVisible && "border border-[0.1] shadow-md",
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
