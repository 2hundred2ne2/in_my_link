import { Metadata } from "next";

import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { FontConfigEditor } from "@/components/design/font-config-editor";
import { LayoutConfigEditor } from "@/components/design/layout-config-editor";
import { SkinConfigEditor } from "@/components/design/skin-config-editor";
import { Logo } from "@/components/logo";
import { Preview } from "@/components/preview";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "디자인 설정하기",
};

export default function DesignPage() {
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
        <Tabs defaultValue="스킨">
          <TabList className="my-4 px-4">
            <Tab value="스킨" className="w-28">
              스킨
            </Tab>
            <Tab value="버튼" className="w-28">
              버튼
            </Tab>
            <Tab value="폰트" className="w-28">
              폰트
            </Tab>
          </TabList>
          <TabPanel value="스킨">
            <SkinConfigEditor />
          </TabPanel>
          <TabPanel value="버튼">
            <LayoutConfigEditor />
          </TabPanel>
          <TabPanel value="폰트">
            <FontConfigEditor />
          </TabPanel>
        </Tabs>
        <Preview />
      </main>
    </>
  );
}
