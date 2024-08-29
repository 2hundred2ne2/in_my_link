import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

import { db } from "@/lib/db";

// 사용자 타입 정의
interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

// 로그인 API
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "이메일과 비밀번호를 입력해 주세요" }, { status: 400 });
  }

  try {
    // 사용자 조회 쿼리
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

    // 로그인 성공
    return NextResponse.json({ message: "로그인 성공", userId: user.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "로그인 중 오류가 발생했습니다", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "알 수 없는 오류 발생" }, { status: 500 });
    }
  }
}
