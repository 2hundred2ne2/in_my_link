"use client";
import { useState } from "react";

import { Card } from "../ui/card";

export default function LinkAddButton({ handleAddLinkInput, iconLists }: any) {
  const [transX, setTransX] = useState(0);

  const handleDrag = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.preventDefault();
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - clickEvent.clientX;

      setTransX(transX + deltaX);
    };

    const mouseUpHandler = (e: MouseEvent) => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return (
    <>
      <section className="mb-10 w-full">
        <div onMouseDown={handleDrag} style={{ transform: `translateX(${transX}px)` }}>
          <ul className="flex flex-row gap-4 px-3">
            {iconLists.map((icon: any, index: any) => {
              return (
                <li key={index} className="flex-shrink-0">
                  <button type="button" onClick={handleAddLinkInput}>
                    <Card
                      variant="muted"
                      className="flex h-16 w-16 flex-col items-center rounded-2xl"
                    >
                      <span className="mt-3 block min-h-10 min-w-10 rounded-xl">{icon.icon}</span>
                    </Card>
                    <span className="text-sm">{icon.iconLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
