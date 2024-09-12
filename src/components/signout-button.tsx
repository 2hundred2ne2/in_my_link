"use client";
import { useRouter } from "next/navigation";

import { SignOut } from "@phosphor-icons/react";

export function SignOutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
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
