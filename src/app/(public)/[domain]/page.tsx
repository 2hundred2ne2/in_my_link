"use client";
import { Jua, Orbit } from "next/font/google";
import { useEffect, useState } from "react";

import { LinkLayout } from "@/components/linklayout";
import { Portal } from "@/components/portal";
import { ENV } from "@/constants/env";
import { useUser } from "@/context/user-context";

const JuaFont = Jua({ subsets: ["latin"], weight: ["400"] });
const OrbitFont = Orbit({ subsets: ["latin"], weight: ["400"] });

export default function UserScreenPage({ params }: { params: { domain: string } }) {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [stickerImage, setStickerImage] = useState(""); // 스티커 이미지 상태 추가
  const [fontType, setFontType] = useState("폰트 A");
  const [fontSize, setFontSize] = useState("text-base");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useUser(); // 사용자 정보를 가져옵니다

  useEffect(() => {
    if (!user) {
      return;
    } // 사용자가 없으면 데이터 로딩을 중단합니다

    const fetchConfig = async () => {
      try {
        // 색상 데이터 API 호출
        const colorResponse = await fetch(`${ENV.apiUrl}/api/skin-config?domain=${user.domain}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const designData = await colorResponse.json();
        console.log("Fetched Color Data:", designData); // 색상 데이터 콘솔에 출력
        setBackgroundColor(designData.color || "white");
        setStickerImage(designData.bgImage || "");

        // 폰트 데이터 API 호출
        const fontResponse = await fetch(`${ENV.apiUrl}/api/font-config?domain=${user.domain}`);
        if (!fontResponse.ok) {
          throw new Error("Failed to fetch font config");
        }
        const fontData = await fontResponse.json();
        setFontType(fontData.type || "폰트 A");
        setFontSize(`text-${fontData.size}` || "text-base");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [user]); // `user`가 변경될 때마다 다시 실행됩니다

  if (loading) {
    return <div>로딩 중 ...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  const cardFontClass =
    fontType === "폰트 B" ? JuaFont.className : fontType === "폰트 C" ? OrbitFont.className : "";

  const inlineFontStyle =
    fontType !== "폰트 B" && fontType !== "폰트 C" ? { fontFamily: fontType } : {};

  const fontSizeClass = fontSize;

  return (
    <>
      <Portal>
        <div className={`fixed inset-0 z-[-10] ${backgroundColor}`}></div>
      </Portal>
      <Portal>
        {stickerImage && (
          <img
            src={stickerImage}
            alt="스티커"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </Portal>
      <div
        className={`mx-auto flex min-h-dvh max-w-screen-sm flex-col items-center ${fontSizeClass} ${cardFontClass}`}
        style={inlineFontStyle}
      >
        <section className="mt-[150px] flex flex-col items-center gap-3">
          <button type="button" className="h-[120px] w-[120px] rounded-full bg-slate-800"></button>
          <div className="my-2 flex flex-col items-center gap-3">
            <div className="">닉네임</div>
            <div className="">자신을 소개해볼까요?</div>
          </div>
        </section>
        <section className="flex flex-col gap-5 pb-10 text-[15px]">
          <LinkLayout />
        </section>
      </div>
    </>
  );
}
