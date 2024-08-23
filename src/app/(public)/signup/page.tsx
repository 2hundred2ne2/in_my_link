"use client";
import { Lobster } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";

const logo = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function LoginPage() {
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
    <main className="">
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <div className={logo.className}>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Linkggu</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                status={errorEmail ? "error" : "default"}
                errorMessage={errorEmail}
              />
              {showPassword && (
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handlePasswordChange}
                  status={errorPassword ? "error" : "default"}
                  errorMessage={errorPassword}
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
                />
              )}
              {showEmailCode && (
                <>
                  <p className="text-foreground">
                    인증번호를 이메일로 발송했습니다. 메일을 확인해주세요
                  </p>
                  <Input
                    type="text"
                    placeholder="인증번호"
                    value={emailCode}
                    onChange={handleEmailCodeChange}
                    status={errorEmailCode ? "error" : "default"}
                    errorMessage={errorEmailCode}
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
                  />
                  <div>
                    <Button type="submit" className="mt-2 w-full" size="large">
                      다음
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-foreground">
              회원이신가요?
              <Link href="/login" className="text-accent">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
