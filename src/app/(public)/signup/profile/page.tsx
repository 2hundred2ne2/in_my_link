"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Camera } from "@phosphor-icons/react/dist/ssr";

import { Input } from "@/components/input";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [nickname, setNickname] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const router = useRouter();

  const handleNext = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
        body: JSON.stringify({
          nickname,
          intro,
        }),
      });

      if (response.ok) {
        //
        router.push("/signup/link");
      } else {
        alert("프로필 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("오류가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };

  return (
    <>
      <AppHeader>
        <AppHeaderLeft></AppHeaderLeft>
        <AppHeaderCenter></AppHeaderCenter>
        <AppHeaderRight></AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pb-[68px] pt-16">
        <div className="flex flex-col items-center px-3 pt-12">
          <button className="relative">
            <span className="sr-only">프로필 변경</span>
            <input type="file" />
            <span className="inline-block h-24 w-24 rounded-full bg-primary-300"></span>
            <span className="absolute bottom-0 right-1 inline-flex min-h-7 min-w-7 items-center justify-center rounded-full border border-foreground-muted bg-background-muted">
              <Camera size={20} weight="fill" />
            </span>
          </button>
        </div>

        {/* 닉네임, 자기소개 */}
        <div className="mt-2 px-3">
          <div className="flex flex-col">
            <Input
              placeholder="닉네임"
              className="w-full"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              {nickname.length}/20
            </Text>
          </div>
          <div className="mt-2 flex flex-col">
            <TextArea
              placeholder="자기소개"
              maxLength={150}
              resize="none"
              className="min-h-32"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              {intro.length}/150
            </Text>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 px-2">
          <Button variant="primary" size="large" onClick={handleNext}>
            다음
          </Button>
          <Button variant="text" size="large">
            <Link href="/signup/link">건너뛰기</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
