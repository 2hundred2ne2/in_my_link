import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";
import { User } from "@/types/user";

export async function POST(req: Request) {
  const { email, password, domain } = await req.json();

  // if (!email || !password || !domain) {
  //   return NextResponse.json({ message: "올바른 정보를 입력해 주세요" }, { status: 400 });
  // }

  const connection = await db.getConnection(); // 트랜잭션을 시작하기 위해 커넥션 가져오기

  try {
    await connection.beginTransaction(); // 트랜잭션 시작

    // 이메일 중복 체크
    const emailQuery = "SELECT id FROM user WHERE email = ?";
    const [emailRows] = await connection.execute<User[]>(emailQuery, [email]);

    if (emailRows.length > 0) {
      await connection.rollback(); // 트랜잭션 롤백
      return NextResponse.json({ message: "이미 사용 중인 이메일입니다." }, { status: 409 });
    }

    // 도메인 중복 체크
    const domainQuery = "SELECT id FROM user WHERE domain = ?";
    const [domainRows] = await connection.execute<User[]>(domainQuery, [domain]);

    if (domainRows.length > 0) {
      await connection.rollback(); // 트랜잭션 롤백
      return NextResponse.json({ message: "이미 사용 중인 도메인입니다." }, { status: 409 });
    }

    // 패스워드 해싱 및 사용자 등록
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = "INSERT INTO user (email, password, domain) VALUES (?, ?, ?)";
    const [insertResult] = await connection.execute<ResultSetHeader>(insertQuery, [
      email,
      hashedPassword,
      domain,
    ]);

    if (insertResult.affectedRows !== 1) {
      await connection.rollback(); // 트랜잭션 롤백
      return NextResponse.json({ message: "User registration failed." }, { status: 500 });
    }

    // 방금 삽입한 사용자의 ID 가져오기
    const userId = insertResult.insertId;

    // button_config 테이블에 초기값 설정
    const buttonConfigInsertQuery = "INSERT INTO button_config (user_id,layout) VALUES (?, ?)";
    await connection.execute<ResultSetHeader>(buttonConfigInsertQuery, [userId, 1]);

    // skin_config 테이블에 초기값 설정
    const skinConfigInsertQuery = "INSERT INTO skin_config (user_id) VALUES (?)";
    await connection.execute<ResultSetHeader>(skinConfigInsertQuery, [userId]);

    // font_config 테이블에 초기값 설정
    const fontConfigInsertQuery = "INSERT INTO font_config (user_id) VALUES (?)";
    await connection.execute<ResultSetHeader>(fontConfigInsertQuery, [userId]);

    await connection.commit(); // 모든 쿼리가 성공적으로 실행되었으므로 트랜잭션 커밋

    return NextResponse.json({ message: "등록되었습니다." }, { status: 201 });
  } catch (error) {
    await connection.rollback(); // 에러 발생 시 트랜잭션 롤백

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error registering user", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
    }
  } finally {
    connection.release(); // 커넥션 반환
  }
}
