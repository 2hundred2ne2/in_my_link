import { NextRequest, NextResponse } from "next/server";

import { RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

// TODO: 분리
interface Link {
  id: number;
  order: number;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/71
 */
export async function PATCH(request: NextRequest) {
  // TODO: 권한
  const TEMP_USER_ID = 1;

  const reorderLinks: Link[] = await request.json();

  if (!Array.isArray(reorderLinks) || reorderLinks.length === 0) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // 사용자의 전체 링크 개수와 요청시의 전체 링크 개수를 확인
  const [validCountResult] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) as valid_count FROM link WHERE id IN (?) AND user_id = ?",
    [reorderLinks.map((link) => link.id), TEMP_USER_ID],
  );
  const validCount = validCountResult[0].valid_count;

  if (validCount !== reorderLinks.length) {
    return NextResponse.json(
      { message: "요청하신 링크 개수가 올바르지 않습니다" },
      { status: 400 },
    );
  }

  const cases = reorderLinks.map((link) => `WHEN ${link.id} THEN ${link.order}`).join(" ");
  const ids = reorderLinks.map((link) => link.id).join(",");

  const query = `
        UPDATE link 
        SET \`order\` = CASE id 
          ${cases}
        END,
        update_date = NOW()
        WHERE id IN (${ids}) AND user_id = ?
      `;

  await db.query(query, [TEMP_USER_ID]);

  return NextResponse.json({ message: "순서가 변경되었습니다" }, { status: 200 });
}
