"use client";

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
import { useUser } from "@/context/user-context"; // 사용자 정보를 가져오기 위해 useUser 훅 추가

export default function ProfilePage() {
  const user = useUser(); // 로그인된 사용자 정보 가져오기

  // 사용자 정보 출력 확인
  console.log("User Info:", user);

  // 사용자 정보가 없을 때 로딩 처리
  if (!user) {
    return <p>로딩 중...</p>;
  }

  console.log("User ID:", user.userId); // 유저 아이디 출력

  return (
    <>
      <AppHeader>
        <AppHeaderLeft>
          <Button variant="text">취소</Button>
        </AppHeaderLeft>
        <AppHeaderCenter />
        <AppHeaderRight>
          <Button variant="text" className="text-accent">
            저장
          </Button>
        </AppHeaderRight>
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

        {/* 사용자 정보 표시 부분 */}
        <div className="mt-2 px-3">
          <div className="flex flex-col">
            <Input
              placeholder="닉네임"
              value={user?.email || ""} // 사용자 이메일을 닉네임 필드에 표시
              className="w-full"
              onChange={(e) => console.log(e.target.value)}
            />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              20
            </Text>
          </div>
          <div className="mt-2 flex flex-col">
            <TextArea placeholder="자기소개" maxLength={150} resize="none" className="min-h-32" />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              150
            </Text>
          </div>
        </div>
      </main>
    </>
  );
}
