"use client";
import { useRouter } from "next/navigation";

import { SignOut } from "@phosphor-icons/react";

export function SignOutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 로컬 스토리지에서 JWT 토큰 삭제
    localStorage.removeItem("token");

    // 로그인 페이지로 리다이렉트
    router.push("/login");
  };

  return (
    <button
      type="button"
      className="-mr-2 inline-flex h-7 w-7 items-center justify-center"
      onClick={handleLogout}
    >
      <SignOut size={20} />
      <span className="sr-only">로그아웃</span>
    </button>
  );
}
