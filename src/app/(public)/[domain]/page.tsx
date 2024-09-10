"use client";
import { Jua, Orbit } from "next/font/google";
import { useEffect, useState } from "react";

import { LinkLayout } from "@/components/linklayout";
import { Portal } from "@/components/portal";
import { ENV } from "@/constants/env";

const JuaFont = Jua({ subsets: ["latin"], weight: ["400"] });
const OrbitFont = Orbit({ subsets: ["latin"], weight: ["400"] });

export default function UserScreenPage({ params }: { params: { domain: string } }) {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontType, setFontType] = useState("폰트 A");
  const [fontSize, setFontSize] = useState("text-base");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { domain } = params;

  const fetchConfig = async () => {
    try {
      // 색상 데이터 api 호출
      const colorResponse = await fetch(`${ENV.apiUrl}/api/skin-config?domain=${domain}`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const colorData = await colorResponse.json();
      setBackgroundColor(colorData.color || "white");

      // 폰트 데이터 api 호출
      const fontReaponse = await fetch(`${ENV.apiUrl}/api/font-config?domain=${domain}`);
      if (!fontReaponse.ok) {
        throw new Error("Failed to fetch font config");
      }
      const fontData = await fontReaponse.json();
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

  useEffect(() => {
    fetchConfig();
  }, [domain]);

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
      <div
        className={`mx-auto flex min-h-dvh max-w-screen-sm flex-col items-center ${fontSizeClass} ${cardFontClass}`}
        style={inlineFontStyle}
      >
        <section className="my-8 flex flex-col items-center gap-3">
          <button type="button" className="h-[95px] w-[95px] rounded-full bg-slate-600"></button>
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
