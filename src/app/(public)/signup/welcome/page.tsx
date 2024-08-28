import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function WelcomePage() {
  return (
    <>
      <main className="min-h-dvh pb-[68px] pt-16">
        <div className="flex flex-col items-center px-12 pt-24">
          <div>
            <span className="inline-block h-32 w-32 rounded-full bg-primary-300"></span>
          </div>
          <div className="mb-12 mt-8 inline-block h-7">
            <Heading variant="subtitle1" className="font-bold">
              닉네임님, 환영합니다!
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
