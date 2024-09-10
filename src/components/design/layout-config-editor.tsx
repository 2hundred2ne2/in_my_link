"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Heading } from "@/components/ui/heading";

export function LayoutConfigEditor() {
  const [layout, setLayout] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 로그인된 사용자의 도메인 값을 가져오세요
  const domain = "test"; // 예시 도메인

  useEffect(() => {
    const fetchLayout = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/button-config?domain=${domain}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLayout(data.layout); // 서버에서 가져온 레이아웃 값 설정
      } catch (error) {
        console.error("Error fetching layout:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLayout();
  }, [domain]);

  const handleLayoutChange = async (newLayout: number) => {
    try {
      const response = await fetch(`/api/button-config`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain, // 로그인된 사용자의 도메인
          layout: newLayout, // 선택한 레이아웃
        }),
      });

      if (response.ok) {
        setLayout(newLayout); // 레이아웃 변경 시 상태 업데이트
        const data = await response.json();
        console.log("레이아웃 업데이트 성공:", data.message);
      } else {
        console.error("레이아웃 업데이트 실패");
      }
    } catch (error) {
      console.error("레이아웃 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <>
      <section className="mb-16 space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">버튼 편집</h1>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            레이아웃
          </Heading>

          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <div className="mt-2 space-y-3">
              <button
                type="button"
                className={`block h-32 w-full rounded-xl bg-background-muted/90 md:h-36 ${
                  layout === 1 ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleLayoutChange(1)}
              >
                <Image
                  alt="레이아웃 1"
                  src="/images/layout-1.png"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
                <span className="sr-only">레이아웃 1</span>
              </button>

              <button
                type="button"
                className={`block h-32 w-full rounded-xl bg-background-muted/90 md:h-36 ${
                  layout === 2 ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleLayoutChange(2)}
              >
                <Image
                  alt="레이아웃 2"
                  src="/images/layout-2.png"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
                <span className="sr-only">레이아웃 2</span>
              </button>

              <button
                type="button"
                className={`block h-32 w-full rounded-xl bg-background-muted/90 md:h-36 ${
                  layout === 3 ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleLayoutChange(3)}
              >
                <Image
                  alt="레이아웃 3"
                  src="/images/layout-3.png"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
                <span className="sr-only">레이아웃 3</span>
              </button>

              <button
                type="button"
                className={`block h-32 w-full rounded-xl bg-background-muted/90 md:h-36 ${
                  layout === 4 ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleLayoutChange(4)}
              >
                <Image
                  alt="레이아웃 4"
                  src="/images/layout-4.png"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
                <span className="sr-only">레이아웃 4</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
