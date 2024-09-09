import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

import { ENV } from "@/constants/env";
import { db } from "@/lib/db";
import { User } from "@/types/user";

// 사용자 정보 가져오기 API
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "사용자 ID를 제공해 주세요" }, { status: 400 });
  }

  try {
    // 사용자 정보 조회 쿼리
    const userQuery = "SELECT * FROM user WHERE id = ?";
    const [rows] = await db.execute<User[]>(userQuery, [userId]);

    const user = rows[0]; // 첫 번째 사용자를 가져옵니다.

    if (!user) {
      return NextResponse.json({ message: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "사용자 정보를 가져오는 중 오류가 발생했습니다", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "알 수 없는 오류 발생" }, { status: 500 });
    }
  }
}

// 사용자 정보 부분 업데이트 API
export async function PATCH(req: Request) {
  // Authorization 헤더에서 JWT 토큰 추출
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "인증 토큰이 없거나 잘못된 형식입니다." }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  interface DecodedToken {
    email?: string;
    userId?: number;
    domain?: string;
  }

  const secret = ENV.jwtSecret;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  let email: string | undefined;
  let userId: number | undefined;
  let domain: string | undefined;

  try {
    const decodedToken = jwt.verify(token, secret) as DecodedToken;
    if (decodedToken.email && decodedToken.userId) {
      // 여기서 id 대신 userId 확인
      email = decodedToken.email;
      userId = decodedToken.userId;
      domain = decodedToken.domain;
    } else {
      return NextResponse.json({ message: "유효하지 않은 토큰 구조입니다." }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token verification failed: TokenExpiredError:", error);
      return NextResponse.json(
        { message: "토큰이 만료되었습니다. 다시 로그인 해주세요." },
        { status: 401 },
      );
    } else {
      console.error("Token verification failed:", error);
      return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 401 });
    }
  }

  if (!email || !userId) {
    return NextResponse.json(
      { message: "사용자 이메일 또는 ID를 확인할 수 없습니다." },
      { status: 400 },
    );
  }

  let fieldsToUpdate;
  try {
    const body = await req.json();
    fieldsToUpdate = { ...body };
  } catch (error) {
    return NextResponse.json({ message: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json({ message: "업데이트할 필드를 제공해 주세요" }, { status: 400 });
  }

  try {
    // 동적으로 SET 구문을 생성
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");

    // 필드 값 배열에 추가
    const values = Object.values(fieldsToUpdate);
    console.log(values);
    values.push(userId); //

    // 사용자 정보 업데이트 쿼리
    const updateQuery = `UPDATE user SET ${setClause} WHERE id = ?`;
    const [result] = await db.execute<ResultSetHeader>(updateQuery, values);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "사용자 업데이트 실패" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "사용자 정보가 성공적으로 업데이트되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "사용자 정보를 업데이트하는 중 오류가 발생했습니다", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "알 수 없는 오류 발생" }, { status: 500 });
    }
  }
}
// 사용자 삭제 API
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "사용자 ID를 제공해 주세요" }, { status: 400 });
  }

  try {
    // 사용자 삭제 쿼리
    const deleteQuery = "DELETE FROM user WHERE id = ?";
    const [result] = await db.execute<ResultSetHeader>(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "사용자 삭제 실패" }, { status: 404 });
    }

    return NextResponse.json({ message: "사용자가 성공적으로 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "사용자를 삭제하는 중 오류가 발생했습니다", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "알 수 없는 오류 발생" }, { status: 500 });
    }
  }
}
