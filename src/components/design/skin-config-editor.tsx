"use client";
import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ENV } from "@/constants/env";

import { Heading } from "../ui/heading";

export function SkinConfigEditor() {
  const [backgroundColor, setBackgroundColor] = useState("bg-background");
  const [isBackgroundloding, setIsBackgroundloding] = useState(true);

  const domain = "test";
  useEffect(() => {
    setIsBackgroundloding(true);

    fetch(`${ENV.apiUrl}/api/skin-config?domain=${domain}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 색상 데이터 처리
        console.log(data.color);
        setBackgroundColor(data.color);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setIsBackgroundloding(false);
      });
  }, [domain]); // domain이 변경될 때마다 색상 데이터를 재호출합니다

  const backgroundButtonClick = (color: string) => {
    //setActiveBackgroundButtonIndex(index);
    // 여기에 fetch 호출을 추가하면 됩니다.
    fetch("/api/skin-config", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color }), // 필요한 데이터로 수정하세요
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackgroundColor(color);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <section className="space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">스킨 편집</h1>
        {isBackgroundloding ? (
          <>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : (
          <>
            <div>
              <Heading variant="subtitle2" order={2} className="font-medium">
                배경 컬러
              </Heading>
              <div className="overflow-x-auto">
                <div className="mt-2 flex min-w-max gap-3">
                  {[
                    { bgColor: "bg-background", label: "기본" },
                    { bgColor: "bg-background-muted", label: "약함" },
                    { bgColor: "bg-green-100", label: "파스텔 그린" },
                    { bgColor: "bg-pink-100", label: "파스텔 핑크" },
                    { bgColor: "bg-blue-100", label: "파스텔 블루" },
                  ].map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96] ${color.bgColor === backgroundColor ? "border-black" : "border-transparent"} focus:outline-none ${color.bgColor}`}
                      onClick={() => backgroundButtonClick(color.bgColor)}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* <div>
                    <Heading variant="subtitle2" order={2} className="font-medium">
                      스티커
                    </Heading>
                    <div className="overflow-x-auto">
                      <div className="mt-2 flex min-w-max gap-3">
                        <button
                          type="button"
                          className="h-14 w-14 flex-shrink-0 rounded-full border bg-background transition-transform duration-100 active:scale-[0.96]"
                        >
                          <span className="sr-only">기본</span>
                        </button>
                        <button
                          type="button"
                          className="h-14 w-14 flex-shrink-0 rounded-full bg-background-muted transition-transform duration-100 active:scale-[0.96]"
                        >
                          <span className="sr-only">약함</span>
                        </button>
                        <button
                          type="button"
                          className="h-14 w-14 flex-shrink-0 rounded-full bg-green-100 transition-transform duration-100 active:scale-[0.96]"
                        >
                          <span className="sr-only">파스텔 그린</span>
                        </button>
                        <button
                          type="button"
                          className="h-14 w-14 flex-shrink-0 rounded-full bg-pink-100 transition-transform duration-100 active:scale-[0.96]"
                        >
                          <span className="sr-only">파스텔 핑크</span>
                        </button>
                        <button
                          type="button"
                          className="h-14 w-14 flex-shrink-0 rounded-full bg-blue-100 transition-transform duration-100 active:scale-[0.96]"
                        >
                          <span className="sr-only">파스텔 블루</span>
                        </button>
                      </div>
                    </div>
                  </div> */}
          </>
        )}
      </section>
    </>
  );
}
