import { NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

interface FontConfig extends RowDataPacket {
  id: number;
  size: number;
  number: string;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/81
 */
export async function GET() {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const [fontConfigs] = await db.query<FontConfig[]>(
    "SELECT size, type FROM font_config WHERE user_id = ?",
    [TEMP_USER_ID],
  );

  return NextResponse.json(fontConfigs[0], { status: 200 });
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/82
 */
export async function PATCH(request: Request) {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const body = await request.json();
  const { size, color, type } = body;

  await db.query(
    "UPDATE font_config SET size = ?, color = ?, type = ?, update_date = NOW() WHERE user_id = ?",
    [size, color, type, TEMP_USER_ID],
  );

  return NextResponse.json({ message: "폰트 설정이 업데이트 되었습니다" }, { status: 200 });
}
