import { NextRequest, NextResponse } from "next/server";

import jwt, { TokenExpiredError } from "jsonwebtoken";
import { RowDataPacket } from "mysql2/promise";

import { ENV } from "@/constants/env";
import { db } from "@/lib/db";
import { Link } from "@/types/link";

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/71
 */
export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "인증 토큰이 없거나 잘못된 형식입니다." }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  let userId: number | null = null;

  try {
    const decodedToken = jwt.verify(token, ENV.jwtSecret) as { userId: number };
    userId = decodedToken.userId;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { message: "토큰이 만료되었습니다. 다시 로그인 해주세요." },
        { status: 401 },
      );
    }
    return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 401 });
  }

  try {
    const reorderLinks: Link[] = await request.json();

    if (!Array.isArray(reorderLinks) || reorderLinks.length === 0) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // 사용자의 전체 링크 개수와 요청시의 전체 링크 개수를 확인
    const [validCountResult] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as valid_count FROM link WHERE id IN (?) AND user_id = ?",
      [reorderLinks.map((link) => link.id), userId],
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
        WHERE id IN (${ids}) AND user_id = ?`;

    await db.query(query, [userId]);

    return NextResponse.json({ message: "순서가 변경되었습니다" }, { status: 200 });
  } catch (error) {
    console.error("[PATCH] /api/links/reorder: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}
