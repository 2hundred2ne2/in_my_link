import { NextResponse } from "next/server";

import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { db, trx } from "@/lib/db";
import { Link } from "@/types/link";

interface LinkQueryResult extends RowDataPacket, Pick<Link, "id" | "userId" | "order"> {}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/60
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // TODO: 권한
    const body = await request.json();
    console.debug("Requset Body: \n", body);

    const id = params.id;
    const { userId, title, image, url } = body;

    const [links] = await db.query<LinkQueryResult[]>(
      "SELECT id, user_id userId, `order` FROM link WHERE id = ?",
      [id],
    );

    const [foundLink] = links;
    console.debug("foundLink :\n", foundLink);

    if (!foundLink) {
      console.error(`링크 id ${id}는 존재하지 않습니다`);
      return NextResponse.json({ message: "링크가 존재하지 않습니다" }, { status: 404 });
    }

    if (foundLink.userId !== userId) {
      console.error(`권한이 없습니다`);
      return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
    }

    await db.query<ResultSetHeader>(
      "UPDATE link SET title = ?, image = ?, url = ?, update_date = NOW() WHERE id = ?",
      [title, image, url, id],
    );

    console.debug(`링크가 업데이트 되었습니다`);
    return NextResponse.json({ message: "링크가 업데이트 되었습니다" }, { status: 200 });
  } catch (error) {
    console.error("[PATCH] /api/links/{id}: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/63
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // TODO: 권한
    const TEMP_USER_ID = 1;
    const id = params.id;

    const [links] = await db.query<LinkQueryResult[]>(
      "SELECT id, user_id userId, `order` FROM link WHERE id = ?",
      [id],
    );

    const [foundLink] = links;
    console.debug("foundLink :\n", foundLink);

    if (!foundLink) {
      console.error(`링크 id ${id}는 존재하지 않습니다`);
      return NextResponse.json({ message: "링크가 존재하지 않습니다" }, { status: 404 });
    }

    if (foundLink.userId !== TEMP_USER_ID) {
      console.error(`권한이 없습니다`);
      return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
    }

    await trx(async (connection) => {
      await connection.query("DELETE FROM link WHERE id = ?", [id]);

      // 삭제된 링크보다 높은 순서를 가진 링크들의 순서를 1씩 감소
      await connection.query(
        "UPDATE link SET `order` = `order` - 1 WHERE user_id = ? AND `order` > ?",
        [TEMP_USER_ID, foundLink.order],
      );
    });

    console.debug(`링크 ${id}가/이 삭제 되었습니다`);
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error("[DELETE] /api/links/{id}: \n", error);
    return NextResponse.json({ message: " Internal Server Error" }, { status: 500 });
  }
}
