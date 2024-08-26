import Link from "next/link";

import { Gear } from "@phosphor-icons/react/dist/ssr";

import { Input } from "@/components/input";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/textarea";

export default function setProfilePage() {
  return (
    <>
      <AppHeader>
        <AppHeaderLeft></AppHeaderLeft>
        <AppHeaderCenter>logo</AppHeaderCenter>
        <AppHeaderRight></AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-12 px-3">
          <button className="relative">
            <span className="sr-only">프로필 변경</span>
            {/* avatar */}
            <span className="inline-block w-24 h-24 rounded-full bg-primary-300"></span>
            <span className="absolute bottom-0 right-1 inline-flex items-center justify-center min-w-7 min-h-7 bg-background-muted border border-foreground-muted rounded-full">
              <Gear size={20} weight="fill" />
            </span>
          </button>
        </div>

        {/* 닉네임, 자기소개 */}
        <div className="flex flex-col items-center mt-8">
          <div>나를 소개해보세요!</div>
        </div>
        <div className="px-3 mt-2">
          <div className="flex flex-col">
            <Input placeholder="닉네임" className="w-full" />
            <Text variant="body2" className="text-foreground-muted mt-1 mr-1 self-end">
              20
            </Text>
          </div>
          <div className="flex flex-col mt-2">
            <TextArea placeholder="자기소개" maxLength={150} resize="none" className="min-h-32" />
            <Text variant="body2" className="text-foreground-muted mt-1 mr-1 self-end">
              150
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-2 mt-20">
          <Button variant="primary" size="large">
            <Link href="/signup/link">다음</Link>
          </Button>
          <Button variant="text" size="large">
            <Link href="/signup/link">건너뛰기</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
