"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { LinkAddButtons } from "@/components/signup/link-add-buttons";
import { LinkListItem } from "@/components/signup/link-list-item";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { LinkType } from "@/types/link";
/* import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 | 링꾸",
}; */

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

/**링크저장 API --> 다음 버튼을 누르면 모두 한번에 저장됨 */
async function setLink(id: number, linkInputs: AddLinkInputProps[]) {
  console.log("insert link array");

  const data = JSON.stringify(linkInputs);
  console.log(data);

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

export default function RegisterLinksPage() {
  const [linkInputs, setLinkInputs] = useState<AddLinkInputProps[]>([]);

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
      <AppHeader>
        <AppHeaderLeft>Left</AppHeaderLeft>
        <AppHeaderCenter>Center</AppHeaderCenter>
        <AppHeaderRight>Right</AppHeaderRight>
      </AppHeader>

      <main className="min-h-dvh pb-[68px] pt-16">
        <div className="flex flex-col items-center px-3 pt-20">
          <div className="px-3 pb-12">
            <Heading variant="subtitle1">사용하실 웹사이트 링크를 연결해보세요</Heading>
          </div>
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
              <Button variant="primary" size="large">
                <Link href="/signup/welcome">다음</Link>
              </Button>
              <Button variant="text" size="large">
                <Link href="/signup/welcome">건너뛰기</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
