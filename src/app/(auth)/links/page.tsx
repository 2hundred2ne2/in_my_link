import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { LinkListEditor } from "@/components/links/link-list-editor";
import { Logo } from "@/components/logo";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/types/link";

export default function LinksPage() {
  return (
    <>
      <AppHeader>
        <AppHeaderLeft />
        <AppHeaderCenter>
          <Logo className="text-xl" />
        </AppHeaderCenter>
        <AppHeaderRight>
          <button type="button" className="w-7 h-7 -mr-2 inline-flex items-center justify-center">
            <SignOut size={20} />
            <span className="sr-only">로그아웃</span>
          </button>
        </AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-12 px-3">
          <div>
            {/* avatar */}
            <span className="inline-block w-24 h-24 rounded-full bg-primary-300"></span>
          </div>
          <Heading className="mt-4">Nickname</Heading>
        </div>

        <LinkListEditor
          links={[
            {
              id: 1,
              title: "insta",
              url: "https://www.instagram.com/",
              image: "",
              type: "instagram",
            },
            {
              id: 2,
              title: "facebook",
              url: "https://www.facebook.com",
              image: "",
              type: "facebook",
            },
            {
              id: 3,
              title: "thread",
              url: "https://www.threads.net/",
              image: "",
              type: "threads",
            },
          ]}
        />
      </main>
    </>
  );
}
