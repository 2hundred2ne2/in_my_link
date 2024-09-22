export type LinkType =
  | "instagram"
  | "facebook"
  | "threads"
  | "custom"
  | "x"
  | "tiktok"
  | "naver"
  | "github";

export interface Link {
  id: number;
  userId: number;
  type: LinkType;
  title: string;
  image: string;
  url: string;
  order: number;
  createDate: string;
  updateDate: string;
}
