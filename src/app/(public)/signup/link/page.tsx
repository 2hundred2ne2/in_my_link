"use client";
import Link from "next/link";
import { useState } from "react";

import {
  Link as Chain,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  ThreadsLogo,
  TiktokLogo,
  YoutubeLogo,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";

import LinkAddButton from "@/components/signup/link-add-button";
import LinkAddInput from "@/components/signup/link-add-input";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export interface RegisterLinkListItemProps {
  /** 링크 id */
  id: number;
  /** 링크 URL */
  url?: string;
}

export default function RegisterLinksPage() {
  const iconLists = [
    { icon: <Chain size={40} />, iconLabel: "커스텀" },
    { icon: <InstagramLogo size={40} />, iconLabel: "인스타그램" },
    { icon: <FacebookLogo size={40} />, iconLabel: "페이스북" },
    { icon: <XLogo size={40} />, iconLabel: "X(트위터)" },
    { icon: <ThreadsLogo size={40} />, iconLabel: "쓰레드" },
    { icon: <TiktokLogo size={40} />, iconLabel: "틱톡" },
    { icon: <YoutubeLogo size={40} />, iconLabel: "유튜브" },
    { icon: <GithubLogo size={40} />, iconLabel: "깃허브" },
    { icon: <Chain size={40} />, iconLabel: "네이버블로그" },
    { icon: <Chain size={40} />, iconLabel: "라인" },
  ];

  const [linkInputs, setLinkInputs] = useState<RegisterLinkListItemProps[]>([]);

  const handleAddLinkInput = () => {
    const newLinkInputs = {
      id: Date.now(),
      url: "",
    };

    setLinkInputs([...linkInputs, newLinkInputs]);
  };

  const handleDeleteLinkInput = (id: number) => {
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
          <LinkAddButton iconLists={iconLists} handleAddLinkInput={handleAddLinkInput} />
          <section className="w-full">
            <ul className="mt-4 flex flex-col gap-4 px-2">
              {linkInputs.map((item, index) => {
                return (
                  <LinkAddInput
                    key={item.id}
                    {...item}
                    handleDeleteLinkInput={handleDeleteLinkInput}
                  />
                );
              })}
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
