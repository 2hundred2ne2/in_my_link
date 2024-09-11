"use client";
import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ENV } from "@/constants/env";

import { Heading } from "../ui/heading";

export function SkinConfigEditor() {
  const [backgroundColor, setBackgroundColor] = useState("bg-background");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
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
        // 색상과 배경 이미지 데이터 처리
        console.log(data.color);
        console.log(data.bgImage);
        setBackgroundColor(data.color);
        setBackgroundImage(data.bgImage);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setIsBackgroundloding(false);
      });
  }, [domain]); // domain이 변경될 때마다 색상 데이터를 재호출합니다

  const backgroundButtonClick = (color: string) => {
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

  const updateBackgroundImage = (image: string) => {
    fetch("/api/skin-config", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bgImage: image }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackgroundImage(image);
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
                      className={`h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96] ${color.bgColor === backgroundColor ? "border-black" : color.bgColor === "bg-background" ? "border-gray-300" : "border-transparent"} focus:outline-none ${color.bgColor}`}
                      onClick={() => backgroundButtonClick(color.bgColor)}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Heading variant="subtitle2" order={2} className="font-medium">
                스티커
              </Heading>
              <div className="overflow-x-auto">
                <div className="mt-2 flex min-w-max gap-3">
                  {[
                    { image: "/images/profile.png", label: "프로필스티커" },
                    { image: "/images/rainbow.png", label: "무지개스티커" },
                    { image: "/images/heart.png", label: "하트스티커" },
                    { image: "/images/party.png", label: "파티스티커" },
                  ].map((sticker, index) => (
                    <button
                      key={index}
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96]"
                      onClick={() => {
                        console.log("Selected Sticker Image:", sticker.image); // 이미지 경로 확인용 콘솔 출력
                        updateBackgroundImage(sticker.image);
                      }}
                      style={{ backgroundImage: `url(${sticker.image})`, backgroundSize: "cover" }}
                    >
                      <span className="sr-only">{sticker.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* 일단 배경 이미지 미리보기 창 띄워놓기.... */}
            {backgroundImage && (
              <div
                className="h-[500px] w-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <p className="text-center text-white">배경 이미지 미리보기</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
