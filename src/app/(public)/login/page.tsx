"use client";
import { Lobster } from "next/font/google";
import Link from "next/link";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";

const logo = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function LoginPage() {
  return (
    <>
      <main className="">
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <div className={logo.className}>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Linkggu</h2>
            </div>
            <form>
              <div>
                <Input type="email" className="" placeholder="이메일" onChange={(e) => ""} />
                <Input type="password" placeholder="비밀번호" onChange={(e) => ""} />
              </div>
              <div>
                <Button type="submit" className="mt-2 w-full" size="large">
                  로그인
                </Button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-foreground">
                처음이신가요?
                <Link href="/signup" className="text-accent">
                  가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
