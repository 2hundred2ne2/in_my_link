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

      <main className="min-h-dvh pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-20 px-3">
          <div className="pb-12 px-3">
            <Heading variant="subtitle1">사용하실 웹사이트 링크를 연결해보세요</Heading>
          </div>
          <section>
            <ul className="flex flex-row gap-4 px-3">
              <li>
                <button type="button">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-3">
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
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
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
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
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
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
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
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <ThreadsLogo size={48} className="mt-2" />
                  </Card>
                  <span>쓰레드</span>
                </button>
              </li>
            </ul>
            <ul className="flex flex-col gap-4 px-2 mt-20">
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center h-8 mx-3 justify-center">
                    <InstagramLogo size={40} />
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full h-7 mt-4 mb-4"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 mx-4 justify-center">
                    <span className="flex items-center bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Chain size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full h-7 mt-4 mb-4"
                    placeholder="URL을 입력해주세요"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
            </ul>
            <div className="flex flex-col gap-2 px-2 mt-20">
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
