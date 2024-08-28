"use client";

import Link from "next/link";

import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-3 py-8 md:px-8">
      <div className="w-full max-w-xs">
        <Logo className="mb-5" />

        <form>
          <div>
            <Input type="email" placeholder="이메일" className="w-full" onChange={(e) => ""} />
            <Input type="password" placeholder="비밀번호" className="w-full" onChange={(e) => ""} />
          </div>
          <div>
            <Button type="submit" className="mt-2 w-full" size="large">
              로그인
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-foreground">
            <Text as="span">처음이신가요?</Text>

            <Link href="/signup" className="ml-3 text-accent">
              <Text as="span" className="hover:underline">
                가입하기
              </Text>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
