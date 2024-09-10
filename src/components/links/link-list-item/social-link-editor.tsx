import { useState } from "react";

import { PencilSimple } from "@phosphor-icons/react";
import toast from "react-hot-toast";

import { EditableText } from "@/components/ui/editable-text";
import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { Link } from "@/types/link";

interface SocialLinkEditorProps {
  id: Link["id"];
  type: Link["type"];
  url: Link["url"];
  title?: Link["title"];
  image?: Link["image"];
  onChangeUrl: (url: string) => void;
}

export function SocialLinkEditor({
  id,
  type,
  url,
  title,
  image,
  onChangeUrl,
}: SocialLinkEditorProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const username = url.replace(getSnsUrl(type), "") || `${type} 아이디를 입력하세요`;

  const handleChangeUsername = async (value: string) => {
    const newUsername = value.trim();

    if (newUsername.length === 0) {
      setErrorMessage("사용자명 입력해주세요");
      onChangeUrl(value);
      return;
    }

    if (newUsername.length > 254) {
      setErrorMessage("입력가능한 길이를 초과했어요");
      onChangeUrl(value);
      return;
    }

    setErrorMessage("");
    const newUrl = `${getSnsUrl(type)}${newUsername}`;
    onChangeUrl(newUrl);

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          image,
          userId: 1, //FIXME: 인증된 회원 아이디
          url: newUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("URL 수정에 실패했습니다");
      }
    } catch (error) {
      console.error("URL 수정 중 오류 발생:", error);
      toast("URL 수정에 실패했어요. 잠시후에 다시 시도해주세요");
    }
  };

  return (
    <EditableText
      label="사용자 이름"
      value={username}
      rightIcon={<PencilSimple size={16} className="ml-1 flex-shrink-0" />}
      errorMessage={errorMessage}
      onChange={handleChangeUsername}
    />
  );
}
