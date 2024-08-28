import Link from "next/link";

import {
  Trash,
  Link as Chain,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  ThreadsLogo,
} from "@phosphor-icons/react/dist/ssr";

import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

export default function RegisterLinksPage() {
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
          <section>
            <ul className="flex flex-row gap-4 px-3">
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="flex h-16 w-16 flex-col items-center rounded-2xl"
                  >
                    <span className="mt-3 block min-h-10 min-w-10 rounded-xl bg-primary-300">
                      <Chain size={40} />
                    </span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="flex h-16 w-16 flex-col items-center rounded-2xl"
                  >
                    <InstagramLogo size={48} className="mt-2" />
                  </Card>
                  <span>인스타그램</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="flex h-16 w-16 flex-col items-center rounded-2xl"
                  >
                    <FacebookLogo size={48} className="mt-2" />
                  </Card>
                  <span>페이스북</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="flex h-16 w-16 flex-col items-center rounded-2xl"
                  >
                    <XLogo size={48} className="mt-2" />
                  </Card>
                  <span>X</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="flex h-16 w-16 flex-col items-center rounded-2xl"
                  >
                    <ThreadsLogo size={48} className="mt-2" />
                  </Card>
                  <span>쓰레드</span>
                </button>
              </li>
            </ul>
            <ul className="mt-20 flex flex-col gap-4 px-2">
              <li>
                <Card variant="default" className="flex items-center rounded-2xl p-0">
                  <span className="mx-3 flex h-8 items-center justify-center">
                    <InstagramLogo size={40} />
                  </span>
                  <input
                    type="text"
                    className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="m-2 h-7 w-7 flex-none items-center justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="flex items-center rounded-2xl p-0">
                  <span className="mx-4 flex h-8 w-8 items-center justify-center">
                    <span className="mt-0.5 flex items-center rounded-xl bg-primary-300 p-1.5">
                      <Chain size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="mb-4 mt-4 h-7 w-full flex-auto items-center px-3 py-4"
                    placeholder="URL을 입력해주세요"
                  ></input>
                  <button className="m-2 h-7 w-7 flex-none items-center justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
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
