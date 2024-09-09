import Image from "next/image";
import { ChangeEvent } from "react";

import { Trash } from "@phosphor-icons/react/dist/ssr";

import { LinkType } from "@/types/link";

import { Card } from "../ui/card";

interface LinkListItemProps {
  /** 링크 id */
  id: number;

  /** 링크 타입 */
  type?: LinkType;

  /** 링크 URL */
  url?: string;

  /**삭제 버튼이 클릭 될 때 호출되는 콜백 함수 */
  onDelete: (id: number) => void;

  /**URL이 변경될 때 호출되는 콜백 함수 */
  onChangeUrl: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
}

export function LinkListItem({ id, type, url, onDelete, onChangeUrl }: LinkListItemProps) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <li>
        <Card variant="default" className="flex items-center rounded-2xl p-0">
          <span className="mx-4 flex h-8 w-8 items-center justify-center">
            <Image
              src={`/images/${type}-logo.png`}
              alt={"type"}
              width={256}
              height={256}
              className="inline-block h-8 min-w-8 max-w-8 rounded-xl"
            />
          </span>
          <input
            type="text"
            className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
            placeholder="URL을 입력해주세요"
            defaultValue={url}
            onChange={(e) => onChangeUrl(id, e)}
          />
          <button
            className="m-2 h-7 w-7 flex-none items-center justify-center"
            onClick={handleDelete}
          >
            <span className="sr-only">삭제</span>
            <Trash size={18} />
          </button>
        </Card>
      </li>
    </>
  );
}
