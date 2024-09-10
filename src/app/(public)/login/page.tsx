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
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError(""); // 이전 오류 메시지 초기화

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
        //jwt 토큰 저장
        sessionStorage.setItem("jwt", data.token);
        router.push("/links");
      } else {
        setError(data.message || "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
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
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="mt-2 w-full" size="large">
              로그인
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500">
            <Text as="p">{error}</Text>
          </div>
        )}

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
