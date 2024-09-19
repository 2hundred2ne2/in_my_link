"use client";

import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ENV } from "@/constants/env";
import { useUser } from "@/context/user-context";

import { Heading } from "../ui/heading";

export function SkinConfigEditor() {
  // 훅은 항상 컴포넌트의 최상위에서 호출되어야 함
  const [backgroundColor, setBackgroundColor] = useState("bg-background");
  const [bgImage, setBgImage] = useState("");
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(true);

  const user = useUser(); // useUser 훅은 항상 컴포넌트 최상단에서 호출되어야 함

  const domain = user?.domain; // user가 있을 경우에만 domain을 설정
  const id = user?.userId;

  useEffect(() => {
    // user와 domain이 있을 때만 데이터 로드
    if (!domain) {
      return;
    }

    setIsBackgroundLoading(true);

    fetch(`${ENV.apiUrl}/api/skin-config?domain=${domain}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBackgroundColor(data.color);
        setBgImage(data.bgImage || "");
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setIsBackgroundLoading(false);
      });
  }, [domain]); // domain이 변경될 때만 데이터를 다시 불러옴

  const backgroundButtonClick = (color: string) => {
    fetch("/api/skin-config", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ color, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackgroundColor(color);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleStickerClick = (imageUrl: string) => {
    fetch("/api/skin-config", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ bgImage: imageUrl, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBgImage(imageUrl);
      })
      .catch((error) => console.error("Error:", error));
  };

  // user가 없으면 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <>
      <section className="space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">스킨 편집</h1>
        {isBackgroundLoading ? (
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
                      className={`h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96] ${
                        color.bgColor === backgroundColor
                          ? "border-black"
                          : color.bgColor === "bg-background"
                            ? "border-gray-300"
                            : "border-transparent"
                      } focus:outline-none ${color.bgColor}`}
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
                    { imageUrl: "/images/profile.png", alt: "프로필 스티커" },
                    { imageUrl: "/images/rainbow.png", alt: "무지개스티커" },
                    { imageUrl: "/images/heart.png", alt: "하트스티커" },
                    { imageUrl: "/images/party.png", alt: "파티스티커" },
                  ].map((sticker, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96] ${
                        sticker.imageUrl === bgImage ? "border-black" : "border-transparent"
                      }`}
                      onClick={() => handleStickerClick(sticker.imageUrl)}
                    >
                      <img
                        src={sticker.imageUrl}
                        alt={sticker.alt}
                        className="rounded-full object-cover"
                      />
                      <span className="sr-only">{sticker.alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
