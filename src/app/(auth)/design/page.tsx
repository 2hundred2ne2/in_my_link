"use client";
import Image from "next/image";
import { useState } from "react";

import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { Logo } from "@/components/logo";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function DesignPage() {
  const [activeBackgroundButtonIndex, setActiveBackgroundButtonIndex] = useState(0);

  const backgroundButtonClick = (index: number) => {
    setActiveBackgroundButtonIndex(index);
    // 여기에 fetch 호출을 추가하면 됩니다.
    fetch("/api/skin-config", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: `bg-${index}` }), // 필요한 데이터로 수정하세요
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };
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
            <section className="space-y-2 px-3 md:space-y-3">
              <h1 className="sr-only">스킨 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  배경 컬러
                </Heading>
                <div className="overflow-x-auto">
                  <div className="mt-2 flex min-w-max gap-3">
                    {[
                      { bgColor: "bg-background", label: "기본" },
                      { bgColor: "bg-background-muted", label: "약함" },
                      { bgColor: "bg-green-100", label: "파스텔 그린" },
                      { bgColor: "bg-pink-100", label: "파스텔 핑크" },
                      { bgColor: "bg-blue-100", label: "파스텔 블루" },
                    ].map((color, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`h-14 w-14 flex-shrink-0 rounded-full border transition-transform duration-100 active:scale-[0.96] ${activeBackgroundButtonIndex === index ? "border-black" : "border-transparent"} focus:outline-none ${color.bgColor}`}
                        onClick={() => backgroundButtonClick(index)}
                      >
                        <span className="sr-only">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  스티커
                </Heading>
                <div className="overflow-x-auto">
                  <div className="mt-2 flex min-w-max gap-3">
                    <button
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full border bg-background transition-transform duration-100 active:scale-[0.96]"
                    >
                      <span className="sr-only">기본</span>
                    </button>
                    <button
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full bg-background-muted transition-transform duration-100 active:scale-[0.96]"
                    >
                      <span className="sr-only">약함</span>
                    </button>
                    <button
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full bg-green-100 transition-transform duration-100 active:scale-[0.96]"
                    >
                      <span className="sr-only">파스텔 그린</span>
                    </button>
                    <button
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full bg-pink-100 transition-transform duration-100 active:scale-[0.96]"
                    >
                      <span className="sr-only">파스텔 핑크</span>
                    </button>
                    <button
                      type="button"
                      className="h-14 w-14 flex-shrink-0 rounded-full bg-blue-100 transition-transform duration-100 active:scale-[0.96]"
                    >
                      <span className="sr-only">파스텔 블루</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value="버튼">
            <section className="mb-16 space-y-2 px-3 md:space-y-3">
              <h1 className="sr-only">버튼 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  레이아웃
                </Heading>

                <div className="mt-2 space-y-3">
                  <button
                    type="button"
                    className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
                  >
                    <Image
                      alt="레이아웃 1"
                      src="/images/layout-1.png"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                    <span className="sr-only">레이아웃 1</span>
                  </button>
                  <button
                    type="button"
                    className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
                  >
                    <Image
                      alt="레이아웃 2"
                      src="/images/layout-2.png"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                    <span className="sr-only">레이아웃 2</span>
                  </button>
                  <button
                    type="button"
                    className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
                  >
                    <Image
                      alt="레이아웃 3"
                      src="/images/layout-3.png"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                    <span className="sr-only">레이아웃 3</span>
                  </button>
                  <button
                    type="button"
                    className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
                  >
                    <Image
                      alt="레이아웃 4"
                      src="/images/layout-4.png"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                    <span className="sr-only">레이아웃 4</span>
                  </button>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value="폰트">
            <section className="space-y-2 px-3 md:space-y-3">
              <h1 className="sr-only">폰트 편집</h1>
              <div>
                <Heading variant="subtitle2" order={2} className="font-medium">
                  종류
                </Heading>
                <div className="mt-2 flex gap-2">
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
                <div className="mt-2 flex gap-2">
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
                <Card
                  variant="muted"
                  className="mt-10 flex h-32 w-full items-center justify-center rounded-2xl"
                >
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
