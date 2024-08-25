"use client";
import { useState } from "react";

import {
  CaretDown,
  CaretUp,
  DotsSixVertical,
  Plus,
  SignOut,
  Trash,
} from "@phosphor-icons/react/dist/ssr";

import { Preview } from "@/components/preview";
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function LinksPage() {
  const [PreviewOpen, setPreviewOpen] = useState(false);

  const togglePreview = () => setPreviewOpen((prev) => !prev);
  return (
    <>
      <AppHeader>
        <AppHeaderLeft />
        <AppHeaderCenter>
          <span className="w-8 h-8 bg-primary-300 rounded-full"></span>
        </AppHeaderCenter>
        <AppHeaderRight>
          <button type="button" className="w-7 h-7 -mr-2 inline-flex items-center justify-center">
            <SignOut size={20} />
            <span className="sr-only">로그아웃</span>
          </button>
        </AppHeaderRight>
      </AppHeader>

      <main className="min-h-dvh pt-16 pb-[68px]">
        <div className="flex flex-col items-center pt-12 px-3">
          <div>
            {/* avatar */}
            <span className="inline-block w-24 h-24 rounded-full bg-primary-300"></span>
          </div>
          <Heading className="mt-4">Nickname</Heading>
        </div>

        <div className="mt-6 px-3">
          <Button size="large" radius="full" className="w-full">
            <Plus size={16} className="mr-2 -ml-1" />
            추가하기
          </Button>
        </div>

        <section className="mt-8">
          <h1 className="sr-only">링크 리스트</h1>
          <ul className="flex flex-col gap-2 px-3">
            <li>
              <Card variant="default" className="rounded-2xl flex flex-col p-0">
                {/* header */}
                <div className="flex items-center pl-6 py-4 pr-3">
                  <div className="relative flex items-center">
                    <button type="button">
                      <span className="min-w-8 min-h-8 block bg-primary-300 rounded-xl"></span>
                    </button>
                    <button
                      type="button"
                      className="absolute inline-flex text-foreground-inverted items-center justify-center bg-danger min-w-[18px] min-h-[18px] rounded-full -right-1 -bottom-1"
                    >
                      <Trash size={14} />
                    </button>
                  </div>

                  <input type="text" placeholder="Title" className="w-full" />

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretUp size={16} />
                  </button>
                </div>

                {/* body */}
                <div className="pl-6 pr-3">
                  <input type="text" placeholder="url" />
                </div>

                {/* footer */}
                <div className="flex justify-end pr-3 py-3">
                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </Card>
            </li>
            <li>
              <Card variant="default" className="rounded-2xl flex p-0">
                <div className="flex items-center justify-center">
                  <button type="button" className="cursor-grab px-2 w-full h-full">
                    <DotsSixVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center px-3 py-4 w-full">
                  {/* 이미지 */}

                  <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

                  <Text className="font-medium w-full text-center">Title</Text>

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretDown size={16} />
                  </button>
                </div>
              </Card>
            </li>
            <li>
              <Card variant="default" className="rounded-2xl flex p-0">
                <div className="flex items-center justify-center">
                  <button type="button" className="cursor-grab px-2 w-full h-full">
                    <DotsSixVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center px-3 py-4 w-full">
                  {/* 이미지 */}

                  <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

                  <Text className="font-medium w-full text-center">Title</Text>

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretDown size={16} />
                  </button>
                </div>
              </Card>
            </li>
            <li>
              <Card variant="default" className="rounded-2xl flex p-0">
                <div className="flex items-center justify-center">
                  <button type="button" className="cursor-grab px-2 w-full h-full">
                    <DotsSixVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center px-3 py-4 w-full">
                  {/* 이미지 */}

                  <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

                  <Text className="font-medium w-full text-center">Title</Text>

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretDown size={16} />
                  </button>
                </div>
              </Card>
            </li>
            <li>
              <Card variant="default" className="rounded-2xl flex p-0">
                <div className="flex items-center justify-center">
                  <button type="button" className="cursor-grab px-2 w-full h-full">
                    <DotsSixVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center px-3 py-4 w-full">
                  {/* 이미지 */}

                  <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

                  <Text className="font-medium w-full text-center">Title</Text>

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretDown size={16} />
                  </button>
                </div>
              </Card>
            </li>
            <li>
              <Card variant="default" className="rounded-2xl flex p-0">
                <div className="flex items-center justify-center">
                  <button type="button" className="cursor-grab px-2 w-full h-full">
                    <DotsSixVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center px-3 py-4 w-full">
                  {/* 이미지 */}

                  <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

                  <Text className="font-medium w-full text-center">Title</Text>

                  <button
                    type="button"
                    className="min-w-7 min-h-7 flex items-center justify-center"
                  >
                    <CaretDown size={16} />
                  </button>
                </div>
              </Card>
            </li>
          </ul>
          <div className="relative flex justify-center">
            <Button
              variant="text"
              radius="full"
              className="fixed bottom-0 mx-auto w-40 mb-20 bg-background border-[0.2px] shadow-md z-10"
              onClick={togglePreview}
            >
              {PreviewOpen ? "닫기" : "미리보기"}
            </Button>

            {PreviewOpen && (
              <div
                className={`fixed bottom-[calc(120px+15px)] z-20 ${
                  PreviewOpen ? "animate-slideUp" : "animate-slideDown"
                }`}
              >
                <Preview />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
