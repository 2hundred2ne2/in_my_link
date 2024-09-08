import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ENV } from "@/constants/env";

/**동적 페이지 설정 */
export const forceDynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "회원가입",
};

const FireWorks = dynamic<any>(
  () => import("@/components/signup/fireworks").then((module) => module.FireWorks),
  { ssr: false },
);

/**GET API: 유저테이블에서 회원가입 한 유저 정보 불러오기 */
async function getUser(id: number) {
  console.log("get user info");
  try {
    const response = await fetch(`${ENV.apiUrl}/api/users?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error("유저 정보를 불러오는데 실패했어요");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default async function WelcomePage() {
  const TEMP_USER_ID = 1;
  const userInfo = await getUser(TEMP_USER_ID);
  let nickname = "";

  if (userInfo) {
    if (userInfo.user.nickname) {
      nickname = `${userInfo.user.nickname}님, `;
    } else {
      nickname = "";
    }
  } else {
    return;
  }

  return (
    <>
      <main className="min-h-dvh pb-[68px] pt-16">
        <div className="flex flex-col items-center px-12 pt-24">
          <div>
            <span className="inline-block h-32 w-32 rounded-full bg-primary-300"></span>
          </div>
          <div className="mb-12 mt-8 inline-block h-7">
            <Heading variant="subtitle1" className="font-bold">
              {nickname}환영합니다!
              <FireWorks />
            </Heading>
          </div>
        </div>
        <div className="mt-24 flex flex-col gap-4 px-2">
          <div className="flex flex-col items-center">
            <span className="item">
              <Text>이제 나만의 페이지를 만들러 가볼까요?</Text>
            </span>
          </div>
          <Button variant="primary" size="large" className="h-14 rounded-lg">
            <Link href="/links">시작하기</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
