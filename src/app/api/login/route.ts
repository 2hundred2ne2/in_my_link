import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "@/lib/db";
import { User } from "@/types/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "이메일과 비밀번호를 입력해 주세요" }, { status: 400 });
  }

  try {
    const userQuery = "SELECT * FROM user WHERE email = ?";
    const [rows] = await db.execute<User[]>(userQuery, [email]);

    const user = rows[0]; // 첫 번째 사용자를 가져옵니다.

    if (!user) {
      return NextResponse.json({ message: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "비밀번호가 일치하지 않습니다" }, { status: 401 });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, email, domain: user.domain, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // 로그인 성공, JWT 반환
    return NextResponse.json({ message: "로그인 성공", token }, { status: 200 });
  } catch (error) {
    // 오류 처리
    if (error instanceof Error) {
      console.error("Database access error:", error.message);
      return NextResponse.json(
        { message: "데이터베이스 접근 중 오류가 발생했습니다", error: error.message },
        { status: 500 },
      );
    } else {
      console.error("Unexpected error type:", error);
      return NextResponse.json(
        { message: "알 수 없는 오류 발생", error: "Unknown error" },
        { status: 500 },
      );
    }
  }
}
