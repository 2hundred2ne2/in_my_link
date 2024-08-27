import { NextResponse } from "next/server";

import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { db } from "@/lib/db";

// TODO: 분리
interface Link extends RowDataPacket {
  id: number;
  userId: number;
  title: string;
  image: string;
  url: string;
  order: number;
  createDate: string;
  updateDate: string;
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/60
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { userId, title, image, url } = body;

  // TODO: 유효성검사
  // TODO: 권한
  const [links] = await db.query<Link[]>("SELECT id, user_id FROM link WHERE id = ?", [params.id]);

  const [foundLink] = links;

  if (!foundLink) {
    return NextResponse.json({ message: "링크가 존재하지 않습니다" }, { status: 404 });
  }

  if (foundLink.userId !== userId) {
    return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
  }

  await db.query<ResultSetHeader>(
    "UPDATE link SET title = ?, image = ?, url = ?, update_date = NOW() WHERE id = ?",
    [title, image, url, params.id],
  );

  return NextResponse.json({ message: "링크가 업데이트 되었습니다" }, { status: 200 });
}

/**
 * @see https://github.com/2hundred2ne2/in_my_link/issues/63
 */
export async function DELETE({ params }: { params: { id: string } }) {
  // TODO: 유효성검사
  // TODO: 권한
  const TEMP_USER_ID = 1;
  const [links] = await db.query<Link[]>("SELECT id, user_id FROM link WHERE id = ?", [params.id]);

  const [foundLink] = links;

  if (!foundLink) {
    return NextResponse.json({ message: "링크가 존재하지 않습니다" }, { status: 404 });
  }

  if (foundLink.userId !== TEMP_USER_ID) {
    return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
  }

  await db.query("DELETE FROM link WHERE id = ?", [params.id]);

  return NextResponse.json({}, { status: 204 });
}
