import { Metadata } from "next";

import { LinkListEditor } from "@/components/links/link-list-editor";
import { Logo } from "@/components/logo";
import { SignOutButton } from "@/components/signout-button";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { UserProfile } from "@/components/user-profile";

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
        <UserProfile
          nickname="Nickname"
          image="https://avatars.githubusercontent.com/u/54213143?v=4"
        />
        <LinkListEditor />
      </main>
    </>
  );
}
