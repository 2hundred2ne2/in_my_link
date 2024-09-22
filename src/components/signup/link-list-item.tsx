import Image from "next/image";
import { ChangeEvent } from "react";

import { Trash } from "@phosphor-icons/react/dist/ssr";

import { LinkType } from "@/types/link";

import { Card } from "../ui/card";

interface LinkListItemProps {
  /** 링크 id */
  id: number;

  /** 링크 타입 */
  itemType: LinkType;

  /** 링크 URL */
  url?: string;

  /**삭제 버튼이 클릭 될 때 호출되는 콜백 함수 */
  onDelete: (id: number) => void;

  /**URL이 변경될 때 호출되는 콜백 함수 */
  onChangeUrl: (id: number, type: LinkType, e: ChangeEvent<HTMLInputElement>) => void;
}

export function LinkListItem({ id, itemType, onDelete, onChangeUrl }: LinkListItemProps) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <li>
        <Card variant="default" className="flex items-center rounded-2xl p-0">
          <span className="mx-4 flex h-8 w-8 items-center justify-center">
            <Image
              src={`/images/${itemType}-logo.png`}
              alt={"type"}
              width={256}
              height={256}
              className="inline-block h-8 min-w-8 max-w-8 rounded-xl"
            />
          </span>

          {itemType === "custom" ? (
            <input
              type="text"
              className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
              placeholder="URL을 입력해주세요"
              onChange={(e) => onChangeUrl(id, itemType, e)}
            />
          ) : (
            <input
              type="text"
              className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
              placeholder="아이디를 입력해주세요"
              onChange={(e) => onChangeUrl(id, itemType, e)}
            />
          )}

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
