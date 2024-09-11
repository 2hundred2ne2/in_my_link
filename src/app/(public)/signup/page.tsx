"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { User } from "@/types/user";

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
  const [showNextButton, setShowNextButton] = useState(false); // "다음" 버튼 표시 여부

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorEmailCode, setErrorEmailCode] = useState("");
  const [errorDomain, setErrorDomain] = useState("");

  const [serverVerificationCode, setServerVerificationCode] = useState<string | null>(null);

  const router = useRouter();

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrorEmail("유효한 이메일 주소를 입력해주세요.'@'을 포함해야 합니다.");
      setShowPassword(false);
      return;
    }
    if (newEmail) {
      try {
        const response = await fetch("/api/signup/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newEmail }),
        });

        const result = await response.json();

        if (response.ok) {
          setErrorEmail("");
          setShowPassword(true);
        } else {
          setErrorEmail(result.message);
          setShowPassword(false);
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setErrorEmail("이메일 확인 중 오류가 발생했습니다.");
        setShowPassword(false);
      }
    } else {
      setErrorEmail("");
      setShowPassword(false);
    }
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setErrorPassword(
        "비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.",
      );
    } else {
      setErrorPassword("");
      setShowPasswordConfirm(true);
    }
  };

  // 비밀번호 확인 처리
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value === password) {
      setErrorPasswordConfirm("");
      requestEmailCode(); // 비밀번호가 일치하면 인증 코드 요청
      setShowEmailCode(true);
    } else {
      setErrorPasswordConfirm("비밀번호가 일치하지 않습니다");
      setShowEmailCode(false);
    }
  };

  // 이메일 인증번호 입력 처리
  const handleEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);

    if (e.target.value === serverVerificationCode) {
      setErrorEmailCode("");
      setShowDomainInput(true); // 인증번호가 일치하면 도메인 입력창 표시
    } else {
      setErrorEmailCode("인증번호가 일치하지 않습니다");
      setShowDomainInput(false);
    }
  };

  // 도메인 중복 확인
  const handleDomainChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDomain = e.target.value;
    // 도메인에 '/' 기호가 있는지 확인
    if (newDomain.includes("/")) {
      setErrorDomain("도메인에 '/' 기호를 포함할 수 없습니다.");
      setShowNextButton(false);
      return;
    } else {
      setErrorDomain(""); // '/' 기호가 없으면 에러 초기화
    }
    setDomain(newDomain);

    if (newDomain) {
      try {
        const response = await fetch("/api/signup/check-domain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain: newDomain }),
        });

        const result = await response.json();

        if (response.ok) {
          setErrorDomain(""); // 중복되지 않으면 에러 메시지 초기화
          setShowNextButton(true); // "다음" 버튼 표시
        } else {
          setErrorDomain(result.message); // 중복된 경우 에러 메시지 설정
          setShowNextButton(false); // "다음" 버튼 숨김
        }
      } catch (error) {
        console.error("Error checking domain:", error);
        setErrorDomain("도메인 확인 중 오류가 발생했습니다.");
        setShowNextButton(false); // 에러 발생 시 "다음" 버튼 숨김
      }
    } else {
      setErrorDomain("");
      setShowNextButton(false); // 도메인이 입력되지 않았을 때 "다음" 버튼 숨김
    }
  };

  // 이메일 인증 코드 요청
  const requestEmailCode = async () => {
    console.log("이메일 전송");
    try {
      const response = await fetch("/api/signup/send-verification-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setServerVerificationCode(result.code); // 서버에서 받은 인증번호 저장
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error requesting email code:", error);
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || password !== passwordConfirm || !domain) {
      alert("입력 정보를 정확히 입력해주세요.");
      return;
    }

    try {
      let response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, domain }),
      });

      let data = await response.json();

      if (response.ok) {
        response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token); // 토큰을 로컬 스토리지에 저장
          router.push("/signup/profile");
        } else {
          alert(data.message); // 로그인 실패 시 에러 메시지 표시
        }
      } else {
        alert(data.message); // 회원가입 실패 시 에러 메시지 표시
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("서버 오류로 인해 회원가입에 실패했습니다.");
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-3 py-8 md:px-8">
      <div className="w-full max-w-xs">
        <Logo className="mb-5 text-center text-3xl font-extrabold" />
        {/* 폼으로 감싸기 */}
        <form onSubmit={handleSubmit}>
          {!showDomainInput && (
            <>
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
            </>
          )}
          {showDomainInput && (
            <>
              <Input
                type="text"
                placeholder="inmylink.com/"
                value={domain}
                onChange={handleDomainChange}
                status={errorDomain ? "error" : "default"}
                errorMessage={errorDomain}
                className="w-full"
              />
              {showNextButton && (
                <Button className="mt-2 w-full" size="large" type="submit">
                  다음
                </Button>
              )}
            </>
          )}
        </form>
        <div className="mt-8 text-center">
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
