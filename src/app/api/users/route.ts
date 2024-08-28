import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

// 이메일과 도메인 중복 체크 쿼리 결과 타입 정의
interface UserQueryResult extends RowDataPacket {
  id: number;
}

export async function POST(req: Request) {
  const { email, password, domain } = await req.json();

  if (!email || !password || !domain) {
    return NextResponse.json({ message: "올바른 정보를 입력해 주세요" }, { status: 400 });
  }

  try {
    // 이메일 중복 체크
    const emailQuery = "SELECT id FROM user WHERE email = ?";
    const [emailRows] = await db.execute<UserQueryResult[]>(emailQuery, [email]);

    if (emailRows.length > 0) {
      return NextResponse.json({ message: "이미 사용 중인 이메일입니다." }, { status: 409 });
    }

    // 도메인 중복 체크
    const domainQuery = "SELECT id FROM user WHERE domain = ?";
    const [domainRows] = await db.execute<UserQueryResult[]>(domainQuery, [domain]);

    if (domainRows.length > 0) {
      return NextResponse.json({ message: "이미 사용 중인 도메인입니다." }, { status: 409 });
    }

    // 패스워드 해싱 및 사용자 등록
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = "INSERT INTO user (email, password, domain) VALUES (?, ?, ?)";
    const [insertResult] = await db.execute<ResultSetHeader>(insertQuery, [
      email,
      hashedPassword,
      domain,
    ]);

    if (insertResult.affectedRows !== 1) {
      return NextResponse.json({ message: "User registration failed." }, { status: 500 });
    }

    // 방금 삽입한 사용자의 ID 가져오기
    const userId = insertResult.insertId;

    // link 테이블에 초기값 설정
    const linkInsertQuery = "INSERT INTO link (user_id, url, description) VALUES (?, ?, ?)";
    await db.execute<ResultSetHeader>(linkInsertQuery, [
      userId,
      "https://example.com",
      "Default link description",
    ]);

    // button_config 테이블에 초기값 설정
    const buttonInsertQuery = "INSERT INTO button (user_id) VALUES (?)";
    await db.execute<ResultSetHeader>(buttonInsertQuery, [userId]);
    // button_config 테이블에 초기값 설정
    const buttonInsertQuery = "INSERT INTO button (user_id, label, action) VALUES (?, ?, ?)";
    await db.execute<ResultSetHeader>(buttonInsertQuery, [
      userId,
      "Default Button",
      "https://example.com/action",
    ]);

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error registering user", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
    }
  }
}
