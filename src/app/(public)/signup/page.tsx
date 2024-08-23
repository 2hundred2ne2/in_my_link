"use client";
import { Lobster } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const logo = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [domain, setDomain] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [showDomainInput, setShowDomainInput] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorEmailCode, setErrorEmailCode] = useState("");

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setShowPassword(Boolean(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowPasswordConfirm(Boolean(e.target.value));
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value === password) {
      setErrorPasswordConfirm("");
      setShowEmailCode(true);
    } else {
      setErrorPasswordConfirm("비밀번호가 일치하지 않습니다");
      setShowEmailCode(false);
    }
  };

  const handleEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
    if (e.target.value === "1234") {
      setErrorEmailCode("");

      setShowDomainInput(true);
    } else {
      setErrorEmailCode("인증번호가 일치하지 않습니다");
      setShowDomainInput(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password && passwordConfirm === password && emailCode === "1234" && domain) {
      router.push("/signup/link");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-3 md:px-8 py-8">
      <div className="w-full max-w-xs">
        <h1 className={cn(logo.className, "mb-5 text-center text-3xl font-extrabold")}>Linkggu</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            status={errorEmail ? "error" : "default"}
            errorMessage={errorEmail}
            className="w-full"
          />
          {showPassword && (
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              status={errorPassword ? "error" : "default"}
              errorMessage={errorPassword}
              className="w-full"
            />
          )}
          {showPasswordConfirm && (
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              status={errorPasswordConfirm ? "error" : "default"}
              errorMessage={errorPasswordConfirm}
              className="w-full"
            />
          )}
          {showEmailCode && (
            <>
              <Text as="p" className="mt-8">
                인증번호를 이메일로 발송했습니다. 메일을 확인해주세요
              </Text>
              <Input
                type="text"
                placeholder="인증번호"
                value={emailCode}
                onChange={handleEmailCodeChange}
                status={errorEmailCode ? "error" : "default"}
                errorMessage={errorEmailCode}
                className="w-full"
              />
            </>
          )}
          {showDomainInput && (
            <>
              <Input
                type="text"
                placeholder="inmylink.com/"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full"
              />
              <div>
                <Button type="submit" className="mt-2 w-full" size="large">
                  다음
                </Button>
              </div>
            </>
          )}
        </form>

        <div className="text-center mt-8">
          <p className="text-foreground">
            <Text as="span"> 회원이신가요?</Text>

            <Link href="/login" className="text-accent">
              <Text as="span" className="hover:underline">
                로그인
              </Text>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
