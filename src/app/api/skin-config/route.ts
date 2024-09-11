import { NextRequest, NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

// TODO: 분리
interface SkinConfig extends RowDataPacket {
  id: number;
  userId: number;
  color: string;
  bgImage: string;
}

interface User extends RowDataPacket {
  id: number;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/83
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ message: "올바른 도메인을 입력해주세요" }, { status: 400 });
  }

  const [users] = await db.query<User[]>("SELECT id FROM user WHERE domain = ?", [domain]);

  if (users.length < 1) {
    return NextResponse.json({ message: "존재하지 않는 도메인입니다" }, { status: 404 });
  }

  const [skinConfigs] = await db.query<SkinConfig[]>(
    "SELECT color, bg_image AS bgImage FROM skin_config WHERE user_id = ?",
    [users[0].id],
  );

  return NextResponse.json(skinConfigs[0], { status: 200 });
}

/**
 
* @see https://github.com/2hundred2ne2/in_my_link/issues/84
*/
export async function PATCH(request: Request) {
  try {
    // TODO: 권한 확인
    const TEMP_USER_ID = 1;

    const body = await request.json();
    const { color, bgImage } = body;

    if (color) {
      await db.query("UPDATE skin_config SET color = ?, update_date = NOW() WHERE user_id = ?", [
        color,
        TEMP_USER_ID,
      ]);
    }
    if (bgImage) {
      await db.query("UPDATE skin_config SET bg_image = ?, update_date = NOW() WHERE user_id = ?", [
        bgImage,
        TEMP_USER_ID,
      ]);
    }

    return NextResponse.json({ message: "스킨 설정이 업데이트 되었습니다" }, { status: 200 });
  } catch (error) {
    console.error("[PATCH] /api/skin-config: \n", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
