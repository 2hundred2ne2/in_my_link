"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 추가

interface User {
  userId: number;
  email: string;
  domain: string;
  nickname?: string;
}

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      return;
    }
    try {
      const decoded = jwtDecode<User>(token);

      const user: User = {
        userId: decoded.userId,
        email: decoded.email,
        domain: decoded.domain,
        nickname: decoded.nickname,
      };
      setUser(user);
      console.log("Decoded User:", user);
    } catch (error) {
      console.error("유효하지 않은 토큰:", error);
      sessionStorage.removeItem("jwt");
      router.push("/login");
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// useUser 훅을 통해 사용자 정보에 접근
export function useUser() {
  return useContext(UserContext);
}
