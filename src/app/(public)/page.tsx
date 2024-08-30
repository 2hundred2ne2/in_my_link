"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push("/links");
        alert(data.message);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-3 py-8 md:px-8">
      <div className="w-full max-w-xs">
        <Logo className="mb-5" />

        <form onSubmit={handleLogin}>
          <div>
            <Input
              type="email"
              placeholder="이메일"
              className="mb-4 w-full" // marginBottom을 추가하여 입력 필드 간 간격을 조정
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
            />
            <Input
              type="password"
              placeholder="비밀번호"
              className="mb-4 w-full" // 마찬가지로 marginBottom 추가
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            />
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
