"use client";
import { createContext, useState, useEffect, useContext } from "react";

import jwt from "jsonwebtoken";

import { ENV } from "@/constants/env";
interface User {
  email: string;
  userId: number;
  domain?: string;
}

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      try {
        const decodedUser = jwt.verify(token, ENV.jwtSecret) as User;
        setUser(decodedUser);
      } catch (error) {
        console.error("유효하지 않은 토큰");
        // 토큰이 유효하지 않으면 제거
        sessionStorage.removeItem("jwt");
      }
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// UserContext를 사용하는 커스텀 훅
export function useUser() {
  return useContext(UserContext);
}
