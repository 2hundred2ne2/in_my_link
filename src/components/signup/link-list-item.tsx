import Image from "next/image";

import { Trash } from "@phosphor-icons/react/dist/ssr";

import { Card } from "../ui/card";

export function LinkListItem({ id, type, url, onDelete, onChangeUrl }: any) {
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
