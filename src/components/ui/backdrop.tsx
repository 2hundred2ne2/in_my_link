"use client";
import { ComponentPropsWithoutRef } from "react";

/**
@example
 const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <main>hello</main>
      <div>
        <button onClick={() => setIsOpen(true)}>Open</button>
        <button onClick={() => setIsOpen(false)}>Close</button>

        {isOpen && (
          <BackDrop>
            <div className="p-4 bg-white rounded shadow-lg">
              BackDrop 위
              <button onClick={() => setIsOpen(false)} className="mt-4 text-red-500">
                닫기
              </button>
            </div>
          </BackDrop>
        )}
      </div>
    </>
  ); 
 */
interface BackDropProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  children?: React.ReactNode;
}

export function BackDrop({ className = "", children, ...rest }: BackDropProps) {
  className = "fixed inset-0 flex items-center justify-center bg-dimmed  opacity-65";
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
