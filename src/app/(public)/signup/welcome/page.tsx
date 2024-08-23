import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function WelcomePage() {
  return (
    <>
      <main className="min-h-dvh pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-24 px-12">
          <div>
            <span className="inline-block w-32 h-32 rounded-full bg-primary-300"></span>
          </div>
          <div className="inline-block h-7 mt-8 mb-12">
            <Heading variant="subtitle1" className="font-bold">
              닉네임님, 환영합니다!
            </Heading>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-2 mt-24">
          <div className="flex flex-col items-center">
            <span className="item">
              <Text>이제 나만의 페이지를 만들러 가볼까요?</Text>
            </span>
          </div>
          <Button variant="primary" size="large" className="h-14 rounded-lg">
            <Link href="/userscreen">시작하기</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
