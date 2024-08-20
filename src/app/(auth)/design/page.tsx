import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function DesignPage() {
  return (
    <>
      <header className="fixed top-0 bg-background grid grid-cols-[1fr_50vw_1fr] h-16 w-full px-3 max-w-screen-sm">
        <div></div>
        <div className="flex justify-center items-center">
          <span className="w-8 h-8 bg-primary-300 rounded-full"></span>
        </div>
        <div className="flex justify-end items-center">
          <button type="button" className="w-7 h-7 inline-flex items-center justify-center">
            <SignOut size={20} />
            <span className="sr-only">로그아웃</span>
          </button>
        </div>
      </header>

      <main className="min-h-dvh pt-16 pb-[68px]">
        <h1 className="sr-only">디자인</h1>
        <Tabs defaultValue="스킨">
          <TabList className="px-4 my-4">
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
            <section className="px-3 space-y-2 md:space-y-3">
              <h1 className="sr-only">스킨 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  배경 컬러
                </Heading>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 mt-2 min-w-max">
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-background rounded-full active:scale-[0.96] duration-100 transition-transform border"
                    >
                      <span className="sr-only">기본</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-background-muted rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">약함</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 그린</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-pink-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 핑크</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 블루</span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  스티커
                </Heading>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 mt-2 min-w-max">
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-background rounded-full active:scale-[0.96] duration-100 transition-transform border"
                    >
                      <span className="sr-only">기본</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-background-muted rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">약함</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 그린</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-pink-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 핑크</span>
                    </button>
                    <button
                      type="button"
                      className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full active:scale-[0.96] duration-100 transition-transform"
                    >
                      <span className="sr-only">파스텔 블루</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value="버튼">
            <section className="px-3 space-y-2 md:space-y-3">
              <h1 className="sr-only">버튼 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  레이아웃
                </Heading>

                <div className="space-y-3 mt-2">
                  <button
                    type="button"
                    className="block h-32 md:h-36 w-full bg-background-muted rounded-xl"
                  >
                    <span className="sr-only">기본</span>
                  </button>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value="폰트">
            <section className="px-3 space-y-2 md:space-y-3">
              <h1 className="sr-only">폰트 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  종류
                </Heading>
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="primary">
                    폰트 A
                  </Button>
                  <Button type="button" variant="secondary">
                    폰트 B
                  </Button>
                  <Button type="button" variant="secondary">
                    폰트 C
                  </Button>
                </div>
              </div>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  사이즈
                </Heading>
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="primary" className="text-xs">
                    작게
                  </Button>
                  <Button type="button" variant="secondary" className="text-sm">
                    보통
                  </Button>
                  <Button type="button" variant="secondary" className="text-base">
                    크게
                  </Button>
                </div>
              </div>
              <div>
                <h1 className="sr-only">폰트 미리보기</h1>
                <Card className="flex items-center justify-center w-full h-32 mt-10 rounded-2xl">
                  가나다 ABC
                </Card>
              </div>
            </section>
          </TabPanel>
        </Tabs>
      </main>
    </>
  );
}
