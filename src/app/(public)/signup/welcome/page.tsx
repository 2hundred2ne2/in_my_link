import { Metadata } from "next";
import Link from "next/link";

import { UserInfo } from "@/components/signup/welcome-userinfo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "회원가입",
};

export default async function WelcomePage() {
  return (
    <>
      <main className="min-h-dvh pb-[68px] pt-16">
        {/* 유저 정보 */}
        <UserInfo />
        <div className="mt-24 flex flex-col gap-4 px-2">
          <div className="flex flex-col items-center">
            <span className="item">
              <Text>이제 나만의 페이지를 만들러 가볼까요?</Text>
            </span>
          </div>
          <Link href="/links" className="flex flex-col">
            <Button variant="primary" size="large" className="h-14 rounded-lg">
              시작하기
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
