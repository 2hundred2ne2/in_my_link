import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { DesignEditor } from "@/components/design/designe-editor";
import { Logo } from "@/components/logo";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";

export default async function DesignPage() {
  return (
    <>
      <AppHeader>
        <AppHeaderLeft />
        <AppHeaderCenter>
          <Logo className="text-xl" />
        </AppHeaderCenter>
        <AppHeaderRight>
          <button type="button" className="-mr-2 inline-flex h-7 w-7 items-center justify-center">
            <SignOut size={20} />
            <span className="sr-only">로그아웃</span>
          </button>
        </AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pb-[68px] pt-16">
        <h1 className="sr-only">디자인</h1>
        <DesignEditor />
      </main>
    </>
  );
}
