import { NextRequest, NextResponse } from "next/server";

import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db, trx } from "@/lib/db";
import { Link } from "@/types/link";
import { User } from "@/types/user";

interface LinkQueryResult extends RowDataPacket, Link {}

interface MaxOrderResult extends RowDataPacket {
  maxOrder: number | null;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/59
 */
export async function POST(request: Request) {
  try {
    const userId = 1; // TODO: 권한 처리
    const body = await request.json();
    const { links } = body;

    // TODO: 유효성 검사

    const result = await trx(async (connection) => {
      const [maxOrderResult] = await connection.query<MaxOrderResult[]>(
        "SELECT MAX(`order`) as maxOrder FROM link WHERE user_id = ?",
        [userId],
      );

      let order = (maxOrderResult[0].maxOrder ?? 0) + 1;

      const values = links.map((link: Link) => [
        userId,
        link.type,
        link.title,
        link.image,
        link.url,
        order++,
        new Date(),
        new Date(),
      ]);

      // 벌크 insert
      const [insertResult] = await connection.query<ResultSetHeader>(
        `
        INSERT INTO link (user_id, type, title, image, url, \`order\`, create_date, update_date)
        VALUES ?`,
        [values],
      );

      // 삽입된 링크들의 ID 범위 계산
      const firstInsertId = insertResult.insertId;
      const lastInsertId = firstInsertId + insertResult.affectedRows - 1;

      const [insertedLinks] = await connection.query<LinkQueryResult[]>(
        "SELECT * FROM link WHERE id BETWEEN ? AND ?",
        [firstInsertId, lastInsertId],
      );
      console.debug("insertedLinks \n", insertedLinks);

      return insertedLinks;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[POST] /api/links: \n", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 *
 * @see https://github.com/2hundred2ne2/in_my_link/issues/62
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json([], { status: 200 });
    }

    const [users] = await db.query<User[]>("SELECT id FROM user WHERE domain = ?", [domain]);

    if (users.length < 1) {
      return NextResponse.json([], { status: 200 });
    }

    const [links] = await db.query<LinkQueryResult[]>(
      "SELECT * FROM link WHERE user_id = ? ORDER BY `order` ASC",
      [users[0].id],
    );

    return NextResponse.json(links, { status: 201 });
  } catch (error) {
    console.error("[GET] /api/links: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}
