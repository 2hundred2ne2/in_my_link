"use client";
import { useEffect, useState } from "react";

import { Portal } from "@/components/portal";
import { ENV } from "@/constants/env";

export default function UserScreenPage() {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const domain = "test";
  useEffect(() => {
    // 색상 데이터 API 호출
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
      .catch((error) => console.error("Error:", error));
  }, [domain]); // domain이 변경될 때마다 색상 데이터를 재호출합니다

  return (
    <>
      <Portal>
        <div className={`fixed inset-0 z-[-10] ${backgroundColor}`}></div>
      </Portal>
      <div className="mx-auto flex min-h-dvh max-w-screen-sm flex-col items-center">
        <section className="my-8 flex flex-col items-center gap-3">
          <button type="button" className="h-[95px] w-[95px] rounded-full bg-slate-600"></button>
          <div className="my-2 flex flex-col items-center gap-3">
            <div className="">닉네임</div>
            <div className="">자신을 소개해볼까요?</div>
          </div>
        </section>
        <section className="flex flex-col gap-5 pb-10 text-[15px]">
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>instargram</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>kakao</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>blog</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>X</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>http://www.naver.com</div>
          </div>
        </section>
      </div>
    </>
  );
}
