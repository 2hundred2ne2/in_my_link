import { Camera } from "@phosphor-icons/react/dist/ssr";

import { Input } from "@/components/input";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <>
      <AppHeader>
        <AppHeaderLeft>
          <Button variant="text">취소</Button>
        </AppHeaderLeft>
        <AppHeaderCenter></AppHeaderCenter>
        <AppHeaderRight>
          <Button variant="text" className="text-accent">
            저장
          </Button>
        </AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-12 px-3">
          <button className="relative">
            <span className="sr-only">프로필 변경</span>
            {/* avatar */}
            <span className="inline-block w-24 h-24 rounded-full bg-primary-300"></span>
            <span className="absolute bottom-0 right-1 inline-flex items-center justify-center min-w-7 min-h-7 bg-background-muted border border-foreground-muted rounded-full">
              <Camera size={20} weight="fill" />
            </span>
          </button>
        </div>

        {/* 닉네임, 자기소개 */}
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
      </main>
    </>
  );
}
