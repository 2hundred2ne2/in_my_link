"use client";

import { useState } from "react";

import { X } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import { Portal } from "./portal";
import { Button } from "./ui/button";
import { Heading } from "./ui/heading";

export function Preview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Portal>
        <section
          className={cn(
            "fixed left-0 top-0 mx-auto flex h-full w-full flex-col bg-background transition-transform duration-300 ease-out",
            isOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <h1 className="sr-only">미리보기</h1>
          <div className="mx-auto w-full max-w-sm flex-1 pt-16">
            <div className="flex flex-col items-center px-3 pt-12">
              <div>
                {/* avatar */}
                <span className="inline-block h-24 w-24 rounded-full bg-primary-300"></span>
              </div>
              <Heading className="mt-4">Nickname</Heading>
            </div>
          </div>
        </section>
      </Portal>

      <div className="relative flex justify-center">
        {isOpen ? (
          <Button
            variant="text"
            radius="full"
            className="fixed bottom-0 z-10 mx-auto mb-20 h-10 w-40 border-[0.2px] bg-background p-0 shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">닫기</span>
            <X size={20} />
          </Button>
        ) : (
          <Button
            variant="text"
            radius="full"
            className="fixed bottom-0 z-10 mx-auto mb-20 h-10 w-40 border-[0.2px] bg-background shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            미리보기
          </Button>
        )}
      </div>
    </>
  );
}
