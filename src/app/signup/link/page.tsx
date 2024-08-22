import { Trash, Link } from "@phosphor-icons/react/dist/ssr";

import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

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
            <Text>사용하실 웹사이트 링크를 연결해보세요</Text>
          </div>
          <section>
            <ul className="flex flex-row gap-4 px-3">
              <li>
                <button type="button" className="flex flex-col items-center">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-0.5"></span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex flex-col items-center">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-0.5"></span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex flex-col items-center">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-0.5"></span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex flex-col items-center">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-0.5"></span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex flex-col items-center">
                  <Card
                    variant="muted"
                    className="rounded-2xl w-16 h-16 flex flex-col items-center"
                  >
                    <span className="min-w-10 min-h-10 block bg-primary-300 rounded-xl mt-0.5"></span>
                  </Card>
                  <span>커스텀</span>
                </button>
              </li>
            </ul>
            <ul className="flex flex-col gap-4 px-2 mt-10">
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 m-2 justify-center">
                    <span className="flex items-center min-w-10 min-h-10 bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Link size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 m-2 justify-center">
                    <span className="flex items-center min-w-10 min-h-10 bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Link size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 m-2 justify-center">
                    <span className="flex items-center min-w-10 min-h-10 bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Link size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 m-2 justify-center">
                    <span className="flex items-center min-w-10 min-h-10 bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Link size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
              <li>
                <Card variant="default" className="rounded-2xl flex p-0 items-center">
                  <span className="flex items-center w-8 h-8 m-2 justify-center">
                    <span className="flex items-center min-w-10 min-h-10 bg-primary-300 rounded-xl mt-0.5 p-1.5">
                      <Link size={28} />
                    </span>
                  </span>
                  <input
                    type="text"
                    className="flex-auto items-center px-3 py-4 w-full"
                    placeholder="https://instagram.com/"
                  ></input>
                  <button className="flex-none items-center w-7 h-7 m-2 justify-center">
                    <Trash size={18} />
                  </button>
                </Card>
              </li>
            </ul>
            <div className="flex flex-col gap-2 px-2 mt-20">
              <Button variant="primary" size="large">
                다음
              </Button>
              <Button variant="text" size="large">
                건너뛰기
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
