"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [domain, setDomain] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showEmailCode, setShowEmailCode] = useState(false); // 인증번호 입력 필드 표시 여부
  const [showDomainInput, setShowDomainInput] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false); // "다음" 버튼 표시 여부

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorEmailCode, setErrorEmailCode] = useState("");
  const [errorDomain, setErrorDomain] = useState("");

  const [serverVerificationCode, setServerVerificationCode] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성
  const [isDomainValid, setIsDomainValid] = useState(false); // 도메인 유효성
  const [isVerificationValid, setIsVerificationValid] = useState(false); // 인증번호 유효 여부
  const [timer, setTimer] = useState(0); // 1분 타이머

  const router = useRouter();

  // 이메일 입력 처리 (한글 제외)
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // 이메일 유효성 검사 (한글 제외)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail) || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(newEmail)) {
      setErrorEmail("유효한 이메일 주소를 입력해주세요. 한글은 포함될 수 없습니다.");
      setShowPassword(false);
      return;
    }

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
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setErrorPassword("비밀번호는 최소 8자 이상이며, 소문자, 숫자를 포함해야 합니다.");
      setIsPasswordValid(false);
    } else {
      setErrorPassword("");
      setShowPasswordConfirm(true);
      setIsPasswordValid(true); // 비밀번호가 유효하면 유효성 true로 설정
    }
  };

  // 비밀번호 확인 처리
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value === password && isPasswordValid) {
      setErrorPasswordConfirm("");
    } else {
      setErrorPasswordConfirm("비밀번호가 일치하지 않습니다.");
      setShowEmailCode(false);
    }
  };

  // 인증번호 보내기 버튼 클릭 처리
  const handleSendVerificationCode = async () => {
    if (password !== passwordConfirm || !isPasswordValid) {
      alert("비밀번호가 일치하거나 유효하지 않습니다.");
      return;
    }
    await requestEmailCode(); // 인증번호 요청
    setShowEmailCode(true); // 인증번호 입력 필드 표시
    setTimer(60); // 타이머 60초 설정
  };

  // 이메일 인증번호 입력 처리
  const handleEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);

    if (e.target.value === serverVerificationCode) {
      setErrorEmailCode("");
      setShowDomainInput(true);
      setIsVerificationValid(true); // 인증번호가 유효함
      setTimer(0); // 타이머 종료
    } else {
      setErrorEmailCode("올바른 인증번호를 입력해주세요.");
      setShowDomainInput(false);
      setIsVerificationValid(false); // 인증번호가 유효하지 않음
    }
  };

  // 도메인 입력 처리 및 유효성 체크 (영문자, 숫자, 하이픈만 허용)
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDomain = e.target.value;
    setDomain(newDomain);

    const domainRegex = /^[a-zA-Z0-9-]+$/;
    if (!domainRegex.test(newDomain)) {
      setErrorDomain("도메인에는 영문자, 숫자, 하이픈(-)만 입력할 수 있습니다.");
      setIsDomainValid(false); // 유효하지 않은 경우
    } else {
      setErrorDomain(""); // 에러 메시지 초기화
      setIsDomainValid(true); // 유효한 경우
    }
  };

  // 도메인 중복 확인
  const checkDomainAvailability = async () => {
    if (!isDomainValid) {
      return;
    }

    try {
      const response = await fetch("/api/signup/check-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      const result = await response.json();

      if (response.ok) {
        setErrorDomain(""); // 중복이 없으면 에러 없도록 설정
        return true; // 도메인 중복 없을 시 true 반환
      } else {
        setErrorDomain(result.message); // 중복이 있을 경우 에러 표시
        setIsDomainValid(false);
        return false; // 중복일 경우 false 반환
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      setErrorDomain("도메인 확인 중 오류가 발생했습니다.");
      setIsDomainValid(false);
      return false;
    }
  };

  // 이메일 인증 코드 요청
  const requestEmailCode = async () => {
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

  // 1분 타이머 기능
  useEffect(() => {
    if (timer > 0 && !isVerificationValid) {
      // 타이머가 0보다 크고, 인증번호가 유효하지 않을 때만 타이머 실행
      const timeoutId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeoutId);
    } else if (timer === 0) {
      // 타이머가 0이 되면 인증번호 무효화
      setShowEmailCode(false);
      setServerVerificationCode(null); // 인증번호 무효화
    }
  }, [timer, isVerificationValid]);

  // 폼 제출 처리
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isDomainAvailable = await checkDomainAvailability(); // 도메인 유효성 체크

    if (
      !email ||
      !password ||
      password !== passwordConfirm ||
      !isDomainValid ||
      !isDomainAvailable
    ) {
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
          sessionStorage.setItem("jwt", data.token); // 토큰을 세션 스토리지에 저장
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

          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            status={errorPassword ? "error" : "default"}
            errorMessage={errorPassword}
            className="w-full"
          />

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            status={errorPasswordConfirm ? "error" : "default"}
            errorMessage={errorPasswordConfirm}
            className="w-full"
          />
          <Button
            className="mt-2 w-full"
            size="large"
            type="button"
            onClick={handleSendVerificationCode} // 인증번호 요청 및 필드 표시
            disabled={!isPasswordValid || password !== passwordConfirm}
          >
            인증 번호 보내기
          </Button>
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
              <Text as="p" className="mt-2">
                남은 시간: {timer}초
              </Text>
            </>
          )}
        </>
      )}
      {showDomainInput && (
        <>
          <Text as="p" className="mt-8">
            사용하실 도메인 이름을 적어주세요.
          </Text>
          <Input
            type="text"
            placeholder="inmylink.com/"
            value={domain}
            onChange={handleDomainChange} // 실시간 도메인 입력 처리
            status={errorDomain ? "error" : "default"}
            errorMessage={errorDomain}
            className="w-full"
          />
          <Button className="mt-2 w-full" size="large" type="submit" disabled={!isDomainValid}>
            다음
          </Button>
        </>
      )}
    </form>
  );
}
