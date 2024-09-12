import { Metadata } from "next";

import { Logo } from "@/components/logo";
import { LinkListEditor } from "@/components/signup/link-list-editor";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function RegisterLinksPage() {
  return (
    <>
      <AppHeader className="z-10">
        <AppHeaderLeft />
        <AppHeaderCenter>
          <Logo className="text-xl" />
        </AppHeaderCenter>
        <AppHeaderRight />
      </AppHeader>

      <main className="min-h-dvh pb-[68px] pt-16">
        <div className="flex flex-col items-center px-3 pt-20">
          <div className="px-3 pb-12">
            <Heading variant="subtitle1">사용하실 웹사이트 링크를 연결해보세요</Heading>
          </div>
          <LinkListEditor />
        </div>
      </main>
    </>
  );
}
