import { NextResponse } from "next/server";

import { ResultSetHeader, RowDataPacket } from "mysql2";

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

interface MaxOrderResult extends RowDataPacket {
  maxOrder: number | null;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, title, image, url } = body;

  // TODO: 유효성검사
  // TODO: 권한

  const [maxOrderResult] = await db.query<MaxOrderResult[]>(
    "SELECT MAX(`order`) as maxOrder FROM link WHERE user_id = ?",
    [userId],
  );

  const newOrder = (maxOrderResult[0].maxOrder ?? 0) + 1;

  const [insertResult] = await db.query<ResultSetHeader>(
    "INSERT INTO link (user_id, title, image, url, `order`, create_date, update_date) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
    [userId, title, image || null, url, newOrder],
  );

  const [links] = await db.query<Link[]>("SELECT * FROM link WHERE id = ?", [
    insertResult.insertId,
  ]);

  return NextResponse.json(links[0], { status: 201 });
}
