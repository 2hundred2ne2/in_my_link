import { NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

interface ButtonConfig extends RowDataPacket {
  id: number;
  userId: number;
  layout: number;
  createDate: string;
  updateDate: string;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/76
 */
export async function GET() {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const [buttonConfigs] = await db.query<ButtonConfig[]>(
    "SELECT layout FROM button_config WHERE user_id = ?",
    [TEMP_USER_ID],
  );

  return NextResponse.json(buttonConfigs[0], { status: 200 });
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/77
 */
export async function PATCH(request: Request) {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const body = await request.json();
  const { layout } = body;

  await db.query("UPDATE button_config SET layout = ?, update_date = NOW() WHERE user_id = ?", [
    layout,
    TEMP_USER_ID,
  ]);

  return NextResponse.json({ message: "버튼 설정이 업데이트 되었습니다" }, { status: 200 });
}
