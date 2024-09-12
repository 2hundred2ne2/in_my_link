"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
    } else {
      router.push("/links");
    }
  }, [router]);

  return <></>;
}
