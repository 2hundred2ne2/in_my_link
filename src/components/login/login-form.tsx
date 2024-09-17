"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: any) => {
    sessionStorage.removeItem("jwt");
    event.preventDefault();

    setError("");

    if (email === "") {
      setError("이메일을 입력해 주세요");
      return;
    }

    if (password === "") {
      setError("비밀번호를 입력해 주세요");
      return;
    }

    setIsLoading(true);

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
        // 로그인 성공 시 JWT 토큰 저장 및 페이지 이동
        sessionStorage.setItem("jwt", data.token);
        const token = sessionStorage.getItem("jwt");
        if (token) {
          router.push("/links");
        }
      } else {
        setError(data.message || "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Button type="submit" className="mt-2 w-full" size="large" loading={isLoading}>
          로그인
        </Button>
      </div>
      {error && (
        <div className="mt-2 text-center text-danger">
          <Text as="p">{error}</Text>
        </div>
      )}
    </form>
  );
}
