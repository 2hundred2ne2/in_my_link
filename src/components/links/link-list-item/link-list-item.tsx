"use client";

import Image from "next/image";
import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowSquareOut,
  CaretDown,
  CaretUp,
  DotsSixVertical,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditableText } from "@/components/ui/editable-text";
import { Text } from "@/components/ui/text";
import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { Link } from "@/types/link";

import { CustomLinkEditor } from "./custom-link-editor";
import { LinkImage } from "./link-image";
import { SocialLinkEditor } from "./social-link-editor";

interface LinkListItemProps {
  /** 링크 id */
  id: Link["id"];

  /** 링크 제목 */
  title?: Link["title"];

  /** 링크 URL */
  url: Link["url"];

  /** 링크 이미지 */
  image?: Link["image"];

  /** 링크 타입 */
  type: Link["type"];

  /** 편집 모드 여부 */
  isEdit: boolean;

  /** 편집 모드로 전환될 때 호출되는 콜백 함수 */
  onEditStart: (id: number) => void;

  /** 편집이 완료될 때 호출되는 콜백 함수 */
  onEditEnd: (id: number) => void;

  /** 제목이 변경될 때 호출되는 콜백 함수 */
  onChangeTitle: (id: number, value: string) => void;

  /** URL이 변경될 때 호출되는 콜백 함수 */
  onChangeUrl: (id: number, value: string) => void;

  /** 이미지 삭제를 누를때 호출되는 콜백 함수 */
  onClickDeleteImage: (id: number) => void;

  /** 삭제 버튼이 클릭될 때 호출되는 콜백 함수 */
  onClickDelete: (id: number) => void;
}

export function LinkListItem({
  id,
  title,
  url,
  image,
  isEdit,
  type,
  onEditStart,
  onEditEnd,
  onChangeTitle,
  onChangeUrl,
  onClickDeleteImage,
  onClickDelete,
}: LinkListItemProps) {
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    url: "",
  });

  const {
    /**
     * role, tabIndex="0", aria-roledescription 등 드래그 요소에 적용할 속성들
     * @see https://docs.dndkit.com/api-documentation/draggable#attributes
     */
    attributes,
    /**
     * 드래그 앤 드롭 기능을 활성화하는 이벤트 리스너들
     * - 드래그 핸들에 적용하여 드래그 기능을 특정 영역에 한정할 수 있음
     * - React의 합성 이벤트 시스템을 사용하여 성능 최적화
     * @see https://docs.dndkit.com/api-documentation/draggable#listeners
     */
    listeners,
    /**
     * 드래그 가능한 요소의 DOM 노드를 참조하는 함수
     * - 이 함수를 통해 dnd-kit이 요소를 추적하고 다른 요소와의 충돌을 감지함
     * @see https://docs.dndkit.com/api-documentation/draggable#node-ref
     */
    setNodeRef,
    /**
     * 드래그 중인 요소의 현재 변형/이동 상태
     * - x, y: 시작 위치로부터의 이동 거리
     * - scaleX, scaleY: 현재 위치한 드롭 영역과의 크기 차이
     * @see https://docs.dndkit.com/api-documentation/draggable#transforms
     */
    transform,
    /**
     * 드래그가 끝난 후 요소가 원래 위치로 돌아갈 때의 transition 효과
     */
    transition,
  } = useSortable({
    id,
  });

  const style = {
    transform: transform
      ? // 드래그 중일 때:
        // - x, y 좌표만 변경하고 scale은 무시하여 크기 왜곡 방지
        // - 접힌 블록위로 드래그하면 scaleY가 두배로 되는 문제가있음
        `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : // 드래그 종료 또는 미시작: CSS.Transform.toString로 transform 객체를 css 문자열 변환
        CSS.Transform.toString(transform),
    transition,
  };

  const handleChangeTitle = async (value: string) => {
    const newTitle = value.trim();

    if (newTitle.length > 99) {
      setErrorMessage({ ...errorMessage, title: "제목은 100자 이하로 입력해주세요" });
      onChangeTitle(id, newTitle);
      return;
    }

    setErrorMessage({ ...errorMessage, title: "" });
    onChangeTitle(id, newTitle);

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          id,
          url,
          image,
          userId: 1, //FIXME: 인증된 회원 아이디
          title: newTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("제목 수정에 실패했습니다");
      }
    } catch (error) {
      console.error("제목 수정 중 오류 발생:", error);
      toast("제목 수정에 실패했어요. 잠시후에 다시 시도해주세요");
    }
  };

  /**
   * 1. title이 존재하고 비어있지 않으면 title을 사용
   * 2. title이 없거나 비어있을 때:
   *    a. 커스텀 링크면 전체 URL을 사용
   *    b. SNS 링크면 URL에서 사용자 이름만 추출하여 사용. 단, username이 빈칸이면 SNS type을 렌더링
   */
  const displayTitle = (() => {
    // 1.
    if (title && title.trim() !== "") {
      return title;
    }

    // 2.a
    if (type === "custom") {
      return url;
    }
    // 2.b
    const username = url.replace(getSnsUrl(type), "");

    return username.trim() !== "" ? username : type;
  })();

  if (!isEdit) {
    return (
      <Card
        ref={setNodeRef}
        variant="default"
        style={style}
        className="relative flex rounded-2xl p-0"
      >
        <div className="absolute top-1/2 flex h-full -translate-y-1/2 items-center">
          <div
            {...attributes}
            {...listeners}
            className="flex h-full w-full touch-none items-center justify-center"
          >
            <button type="button" className="h-full w-full cursor-grab px-2">
              <DotsSixVertical size={16} />
            </button>
          </div>
          <div className="flex items-center">
            <Image
              src={image ?? "/images/custom-logo.png"}
              alt={type}
              width={256}
              height={256}
              className="inline-block h-8 min-w-8 max-w-8 rounded-xl"
            />
          </div>
        </div>

        <div className="flex min-h-16 w-full items-center justify-center px-20 py-4">
          <Text as="p" className="overflow-hidden break-words text-center text-sm font-medium">
            {displayTitle}
          </Text>
        </div>

        <div className="absolute right-3 top-1/2 flex h-full -translate-y-1/2 items-center">
          <Button
            type="button"
            variant="text"
            className="min-h-7 min-w-7 rounded-full p-0"
            onClick={() => onEditStart(id)}
          >
            <span className="sr-only">펼치기</span>
            <CaretDown size={16} />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      variant="default"
      style={style}
      className="flex flex-col rounded-2xl p-0"
    >
      {/* header */}
      <div className="flex items-center py-4 pl-6 pr-3">
        <LinkImage src={image} alt={type} onDeleteImage={() => onClickDeleteImage(id)} />

        <EditableText
          label="Title"
          value={title}
          rightIcon={<PencilSimple size={16} className="ml-2 flex-shrink-0" />}
          errorMessage={errorMessage.title}
          className="font-medium"
          onChange={handleChangeTitle}
        />

        <Button
          type="button"
          variant="text"
          className="ml-4 min-h-7 min-w-7 rounded-full p-0"
          onClick={() => onEditEnd(id)}
        >
          <span className="sr-only">접기</span>
          <CaretUp size={16} />
        </Button>
      </div>

      {/* body */}
      <div className="pl-6 pr-3">
        {type === "custom" ? (
          <CustomLinkEditor
            id={id}
            url={url}
            title={title}
            image={image}
            onChangeUrl={(url) => onChangeUrl(id, url)}
          />
        ) : (
          <SocialLinkEditor
            id={id}
            type={type}
            url={url}
            title={title}
            image={image}
            onChangeUrl={(url) => onChangeUrl(id, url)}
          />
        )}
      </div>

      {/* footer */}
      <div className="flex justify-end py-3 pr-3">
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <Button type="button" variant="text" className="min-h-7 min-w-7 rounded-full p-0">
            <span className="sr-only">링크 바로가기</span>
            <ArrowSquareOut size={16} />
          </Button>
        </a>
        <Button
          type="button"
          variant="text"
          className="min-h-7 min-w-7 rounded-full p-0"
          onClick={() => onClickDelete(id)}
        >
          <span className="sr-only">삭제</span>
          <Trash size={16} />
        </Button>
      </div>
    </Card>
  );
}
