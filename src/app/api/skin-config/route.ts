import { NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

interface SkinConfig extends RowDataPacket {
  id: number;
  userId: number;
  color: string;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/83
 */
export async function GET() {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const [skinConfigs] = await db.query<SkinConfig[]>(
    "SELECT color FROM skin_config WHERE user_id = ?",
    [TEMP_USER_ID],
  );

  return NextResponse.json(skinConfigs[0], { status: 200 });
}
