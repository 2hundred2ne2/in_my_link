import { Metadata } from "next";

import { LinkListEditor } from "@/components/links/link-list-editor";
import { MyProfle } from "@/components/links/my-profile";
import { Logo } from "@/components/logo";
import { SignOutButton } from "@/components/signout-button";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";

export const metadata: Metadata = {
  title: "링크 관리하기",
};

export default function LinksPage() {
  return (
    <>
      <AppHeader className="z-10">
        <AppHeaderLeft />
        <AppHeaderCenter>
          <Logo className="text-xl" />
        </AppHeaderCenter>
        <AppHeaderRight>
          <SignOutButton />
        </AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pb-[68px] pt-16">
        <MyProfle />
        <LinkListEditor />
      </main>
    </>
  );
}
