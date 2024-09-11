"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { LinkType } from "@/types/link";

import { Button } from "../ui/button";

import { LinkAddButtons } from "./link-add-buttons";
import { LinkListItem } from "./link-list-item";

export interface AddLinkInputProps {
  /** 링크 id */
  id: number;

  /** 링크 URL */
  url: string;

  /** 링크 type*/
  type: LinkType;
}

export interface IconListType {
  /**아이콘 리스트 SNS type */
  type: LinkType;

  /**아이콘 리스트 label */
  iconLabel: string;
}

const iconList: IconListType[] = [
  { type: "custom", iconLabel: "커스텀" },
  {
    type: "instagram",
    iconLabel: "인스타그램",
  },
  {
    type: "facebook",
    iconLabel: "페이스북",
  },

  {
    type: "threads",
    iconLabel: "쓰레드",
  },
];

/**POST API: 입력된 링크(객체 배열)를 다음 버튼 클릭 시 DB에 저장 */
async function addLinks(id: number, linkInputs: AddLinkInputProps[]) {
  const data = JSON.stringify({ links: linkInputs });

  try {
    const response = await fetch(`${ENV.apiUrl}/api/links?user_id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error("URL 등록에 실패했습니다");
    }
  } catch (error) {
    console.log("링크 등록 중 오류 발생: ", error);
  }
}

export function LinkListEditor() {
  const [linkInputs, setLinkInputs] = useState<AddLinkInputProps[]>([]);
  const router = useRouter();

  const handleNext = async () => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    let result = true;

    //input 박스가 없고 다음 버튼을 눌렀을 경우
    if (linkInputs.length === 0) {
      result = false;
      toast("링크를 등록해주세요");
      return;
    }

    linkInputs.map((item) => {
      //input 박스가 있고 && custom 타입인 경우
      if (linkInputs.length !== 0 && item.type === "custom") {
        if (!urlPattern.test(item.url)) {
          result = false;
          toast("올바른 URL 형식을 입력해주세요");
          return;
        } else {
          result = true;
        }

        if (item.url.length > 254) {
          result = false;
          toast("입력가능한 길이를 초과했어요");
          return;
        } else {
          result = true;
        }
        //input 박스가 있고 && custom 타입 외의 경우
      } else if (linkInputs.length !== 0 && item.type !== "custom") {
        if (item.url.length === 0) {
          result = false;
          toast("SNS 아이디를 입력해주세요");
          return;
        } else {
          result = true;
        }

        if (item.url.length > 254) {
          result = false;
          toast("입력가능한 길이를 초과했어요");
          return;
        } else {
          result = true;
        }
      }
    });

    try {
      if (!result) {
        return;
      } else {
        //수정할 것: list중 하나라도 url을 가지면 url이 공백인 list가 있어도 같이 등록된다.
        //setLinkInputs(linkInputs.filter((item) => item.url !== ""));

        await addLinks(1, linkInputs);
        router.push("/signup/welcome");
      }
    } catch (error) {
      console.log("링크 등록 중 오류 발생: ", error);
      toast("링크 등록에 실패했어요. 잠시후에 다시 시도해주세요");
    }
  };

  const handleAddLink = (type: LinkType) => {
    const newLink = {
      id: Date.now(),
      url: "",
      type,
    };
    setLinkInputs([...linkInputs, newLink]);
  };

  const handleChangeUrl = (id: number, type: LinkType, e: ChangeEvent<HTMLInputElement>) => {
    const privateId = e.target.value.trim();
    const wholeUrl = `${getSnsUrl(type)}${privateId}`;

    setLinkInputs((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: wholeUrl } : link)),
    );
  };

  const handleDelete = (id: number) => {
    setLinkInputs(linkInputs.filter((input) => input.id !== id));
  };

  return (
    <>
      <LinkAddButtons iconList={iconList} onAdd={handleAddLink} />
      <section className="w-full">
        <ul className="mt-4 flex flex-col gap-4 px-2">
          {linkInputs.map((item) => (
            <LinkListItem
              key={item.id}
              itemType={item.type}
              {...item}
              onDelete={handleDelete}
              onChangeUrl={handleChangeUrl}
            />
          ))}
        </ul>
        <div className="mt-20 flex flex-col gap-2 px-2">
          <Button variant="primary" size="large" onClick={handleNext}>
            다음
          </Button>
          <Link href="/signup/welcome" className="flex flex-col">
            <Button variant="text" size="large">
              건너뛰기
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
