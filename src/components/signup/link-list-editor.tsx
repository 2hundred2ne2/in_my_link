"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { LinkType } from "@/types/link";

import { Button } from "../ui/button";

import { LinkAddButtons } from "./link-add-buttons";
import { LinkListItem } from "./link-list-item";

export interface AddLinkInputProps {
  /** 링크 id */
  id: number;
  /** 링크 URL */
  url?: string;
  /** 링크 type*/
  type?: LinkType;
}

const iconLists = [
  { type: "custom", iconLabel: "커스텀" },
  {
    type: "instagram",
    iconLabel: "인스타그램",
  },
  {
    type: "facebook",
    iconLabel: "페이스북",
  },

  {
    type: "threads",
    iconLabel: "쓰레드",
  },
];

export function LinkListEditor() {
  const [linkInputs, setLinkInputs] = useState<AddLinkInputProps[]>([]);
  const router = useRouter();

  /**POST API: 입력된 링크(객체 배열)를 다음 버튼 클릭 시 DB에 저장 */
  async function addLinks(id: number, linkInputs: AddLinkInputProps[]) {
    console.log("insert link array");

    const data = JSON.stringify({ links: linkInputs });

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links?user_id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("URL 등록에 실패했습니다");
      }
    } catch (error) {
      console.log("링크 등록 중 오류 발생: ", error);
    }
  }

  const handleNext = async () => {
    try {
      await addLinks(1, linkInputs);
      router.push("/signup/welcome");
    } catch (error) {
      console.log("링크 저장 중 오류 발생: ", error);
      toast("링크 추가에 실패했어요. 잠시후에 다시 시도해주세요");
    }
  };

  const handleAddLink = (type: LinkType) => {
    const newLink = {
      id: Date.now(),
      url: getSnsUrl(type),
      type,
    };

    setLinkInputs([...linkInputs, newLink]);
  };

  const handleChangeUrl = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const wholeUrl = e.target.value;

    setLinkInputs((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: wholeUrl } : link)),
    );
    console.log(linkInputs);
  };

  const onDelete = (id: number) => {
    setLinkInputs(linkInputs.filter((input) => input.id !== id));
  };

  return (
    <>
      <LinkAddButtons iconLists={iconLists} onAdd={handleAddLink} />
      <section className="w-full">
        <ul className="mt-4 flex flex-col gap-4 px-2">
          {linkInputs.map((item) => (
            <LinkListItem
              key={item.id}
              type={item.type}
              {...item}
              onDelete={onDelete}
              onChangeUrl={handleChangeUrl}
            />
          ))}
        </ul>
        <div className="mt-20 flex flex-col gap-2 px-2">
          <Button variant="primary" size="large" onClick={handleNext}>
            다음
          </Button>
          <Button variant="text" size="large">
            <Link href="/signup/welcome">건너뛰기</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
