"use client";
import { ChangeEvent, useState } from "react";

import { Trash, Link as Chain } from "@phosphor-icons/react/dist/ssr";

import { Card } from "../ui/card";

export function LinkAddInput({ id, type, onDelete, iconLists }: any) {
  const handleDelete = () => {
    onDelete(id);
  };

  const [url, setUrl] = useState("");
  const handleGetUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    console.log(url);
  };

  return (
    <>
      <li>
        <Card variant="default" className="flex items-center rounded-2xl p-0">
          <span className="mx-4 flex h-8 w-8 items-center justify-center">
            <span className="mt-0.5 flex items-center rounded-xl bg-primary-300 p-1.5">
              {iconLists[type].icon}
            </span>
          </span>
          <input
            type="text"
            className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
            placeholder="URL을 입력해주세요"
            defaultValue={iconLists[type].prefix}
            onChange={handleGetUrl}
          ></input>
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
