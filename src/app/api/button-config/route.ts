import { NextRequest, NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";
import { ButtonConfig } from "@/types/button-config";
import { User } from "@/types/user";

interface ButtonConfigQueryResult extends ButtonConfig, RowDataPacket {}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/76
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ message: "올바른 도메인을 입력해주세요" }, { status: 400 });
    }

    const [users] = await db.query<User[]>("SELECT id FROM user WHERE domain = ?", [domain]);

    if (users.length < 1) {
      return NextResponse.json({ message: "존재하지 않는 도메인입니다" }, { status: 404 });
    }

    const [buttonConfigs] = await db.query<ButtonConfigQueryResult[]>(
      "SELECT layout FROM button_config WHERE user_id = ?",
      [users[0].id],
    );

    return NextResponse.json(buttonConfigs[0], { status: 200 });
  } catch (error) {
    console.error("[GET] /api/button-config: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/77
 */
export async function PATCH(request: Request) {
  try {
    // TODO: 권한
    const TEMP_USER_ID = 1;

    const body = await request.json();
    const { layout } = body;

    await db.query("UPDATE button_config SET layout = ?, update_date = NOW() WHERE user_id = ?", [
      layout,
      TEMP_USER_ID,
    ]);

    return NextResponse.json({ message: "버튼 설정이 업데이트 되었습니다" }, { status: 200 });
  } catch (error) {
    console.error("[PATCH] /api/button-config: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}
