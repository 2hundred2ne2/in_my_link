import { NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "이메일을 입력해 주세요." }, { status: 400 });
  }

  try {
    const domainQuery = "SELECT id FROM user WHERE email = ?";
    const [rows] = await db.execute<RowDataPacket[]>(domainQuery, [email]);

    if (rows.length > 0) {
      return NextResponse.json({ message: "이미 사용 중인 이메일입니다." }, { status: 409 });
    }

    return NextResponse.json({ message: "사용 가능한 이메일입니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "이메일 중복 확인 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
