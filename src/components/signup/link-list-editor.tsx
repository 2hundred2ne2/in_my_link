"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { ENV } from "@/constants/env";
import { useUser } from "@/context/user-context"; // useUser 훅 사용
import { getSnsUrlPlus } from "@/lib/utils"; // getSnsUrlPlus 함수 사용
import { LinkTypePlus } from "@/types/link"; // LinkTypePlus 타입
import { User } from "@/types/user";

import { Button } from "../ui/button";

import { LinkAddButtons } from "./link-add-buttons";
import { LinkListItem } from "./link-list-item";

// AddLinkInputProps 타입 정의
export interface AddLinkInputProps {
  id: number;
  url: string;
  type: LinkTypePlus;
}

// IconListType 타입 정의
export interface IconListType {
  type: LinkTypePlus;
  iconLabel: string;
}

// 아이콘 리스트 정의
const iconList: IconListType[] = [
  { type: "custom", iconLabel: "커스텀" },
  { type: "instagram", iconLabel: "인스타그램" },
  { type: "facebook", iconLabel: "페이스북" },
  { type: "threads", iconLabel: "쓰레드" },
  { type: "x", iconLabel: "X(트위터)" },
  { type: "tiktok", iconLabel: "틱톡" },
  { type: "naver", iconLabel: "네이버블로그" },
  { type: "github", iconLabel: "깃허브" },
];

/**POST API: 입력된 링크(객체 배열)를 다음 버튼 클릭 시 DB에 저장 */
async function addLinks(id: string, linkInputs: AddLinkInputProps[]) {
  const data = JSON.stringify({ links: linkInputs });

  const token = sessionStorage.getItem("jwt");
  if (!token) {
    alert("토큰이 없습니다.");
    return;
  }

  try {
    const response = await fetch(`${ENV.apiUrl}/api/links?user_id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 추가
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
  const user = useUser() as User | null; // useUser 훅에서 user 정보 가져오기
  const [linkInputs, setLinkInputs] = useState<AddLinkInputProps[]>([]);
  const router = useRouter();

  const handleNext = async () => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    let result = true;

    if (!user || !user.userId) {
      toast("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    // input 박스가 없고 다음 버튼을 눌렀을 경우
    if (linkInputs.length === 0) {
      result = false;
      toast("링크를 등록해주세요");
      return;
    }

    linkInputs.forEach((item) => {
      if (item.type === "custom") {
        if (!urlPattern.test(item.url)) {
          result = false;
          toast("올바른 URL 형식을 입력해주세요");
          return;
        }
      } else {
        if (item.url.length === 0) {
          result = false;
          toast("SNS 아이디를 입력해주세요");
          return;
        }
      }

      if (item.url.length > 254) {
        result = false;
        toast("입력가능한 길이를 초과했어요");
        return;
      }
    });

    if (!result) {
      return;
    }

    try {
      await addLinks(user.userId, linkInputs); // userId 사용
      router.push("/signup/welcome");
    } catch (error) {
      console.log("링크 등록 중 오류 발생: ", error);
      toast("링크 등록에 실패했어요. 잠시 후에 다시 시도해주세요");
    }
  };

  const handleAddLink = (type: LinkTypePlus) => {
    const newLink = {
      id: Date.now(),
      url: "",
      type,
    };
    setLinkInputs([...linkInputs, newLink]);
  };

  const handleChangeUrl = (id: number, type: LinkTypePlus, e: ChangeEvent<HTMLInputElement>) => {
    const privateId = e.target.value.trim();
    const wholeUrl = `${getSnsUrlPlus(type)}${privateId}`;

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
