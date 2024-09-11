"use client"; // 클라이언트 측에서 동작하도록 설정

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      router.push("/links");
    }
  }, [router]);

  return <></>;
}
