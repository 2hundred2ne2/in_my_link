import { NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { domain } = await req.json();

  if (!domain) {
    return NextResponse.json({ message: "도메인을 입력해 주세요." }, { status: 400 });
  }

  try {
    const domainQuery = "SELECT id FROM user WHERE domain = ?";
    const [rows] = await db.execute<RowDataPacket[]>(domainQuery, [domain]);

    if (rows.length > 0) {
      return NextResponse.json({ message: "이미 사용 중인 도메인입니다." }, { status: 409 });
    }

    return NextResponse.json({ message: "사용 가능한 도메인입니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "도메인 중복 확인 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
