"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import {
  Link as Chain,
  InstagramLogo,
  FacebookLogo,
  ThreadsLogo,
} from "@phosphor-icons/react/dist/ssr";

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
import { getSnsUrl } from "@/lib/utils";
import { LinkType } from "@/types/link";

export interface AddLinkInputProps {
  /** 링크 id */
  id: number;
  /** 링크 URL */
  url?: string;
  /** 링크 type*/
  type?: LinkType;
}

const iconLists = [
  { type: "custom", icon: <Chain size={40} />, iconLabel: "커스텀", prefix: "" },
  {
    type: "instagram",
    icon: <InstagramLogo size={40} />,
    iconLabel: "인스타그램",
    prefix: "https://www.instagram.com/",
  },
  {
    type: "facebook",
    icon: <FacebookLogo size={40} />,
    iconLabel: "페이스북",
    prefix: "https://www.facebook.com/",
  },

  {
    type: "threads",
    icon: <ThreadsLogo size={40} />,
    iconLabel: "쓰레드",
    prefix: "https://threads.net/@",
  },
];

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
  const handleChangeUrl = (id: number, e: ChangeEvent) => {
    console.log(id);
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
              {linkInputs.map((item, index) => (
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
