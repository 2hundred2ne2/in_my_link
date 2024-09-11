import { NextResponse } from "next/server";

import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { ENV } from "@/constants/env";
import { db, trx } from "@/lib/db";
import { Link } from "@/types/link";

interface LinkQueryResult extends RowDataPacket, Pick<Link, "id" | "userId" | "order"> {}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/60
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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
    const body = await request.json();
    console.debug("Requset Body: \n", body);

    const id = params.id;
    const { title, image, url } = body;

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

    if (foundLink.userId !== userId) {
      console.error(`권한이 없습니다`);
      return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
    }

    await trx(async (connection) => {
      await connection.query("DELETE FROM link WHERE id = ?", [id]);

      // 삭제된 링크보다 높은 순서를 가진 링크들의 순서를 1씩 감소
      await connection.query(
        "UPDATE link SET `order` = `order` - 1 WHERE user_id = ? AND `order` > ?",
        [userId, foundLink.order],
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
