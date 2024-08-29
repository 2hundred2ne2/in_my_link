import { RowDataPacket } from "mysql2/promise";

// 공통 사용자 타입 정의
export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  domain: string;
  nickname: string;
  image: string;
  bg_image: string;
  intro: string;
}
