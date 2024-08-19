"use client";
import { useState } from "react";

import { BackDrop } from "@/components/ui/backdrop";

export default function HomePage() {
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
}
