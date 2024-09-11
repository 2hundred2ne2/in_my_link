import { useState } from "react";

import { PencilSimple } from "@phosphor-icons/react";
import toast from "react-hot-toast";

import { EditableText } from "@/components/ui/editable-text";
import { ENV } from "@/constants/env";
import { Link } from "@/types/link";

interface CustomLinkEditorProps {
  id: Link["id"];
  url: Link["url"];
  title?: Link["title"];
  image?: Link["image"];
  onChangeUrl: (url: string) => void;
}

export function CustomLinkEditor({ id, url, title, image, onChangeUrl }: CustomLinkEditorProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeUrl = async (value: string) => {
    const newUrl = value.trim();

    if (newUrl.length === 0) {
      setErrorMessage("URL을 입력해주세요");
      onChangeUrl(value);
      return;
    }

    if (newUrl.length > 254) {
      setErrorMessage("입력가능한 길이를 초과했어요");
      onChangeUrl(value);
      return;
    }

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(newUrl)) {
      setErrorMessage("올바른 URL 형식을 입력해주세요");
      onChangeUrl(value);
      return;
    }

    setErrorMessage("");
    onChangeUrl(newUrl);

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
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
      label="URL"
      value={url}
      rightIcon={<PencilSimple size={16} className="ml-2 flex-shrink-0" />}
      errorMessage={errorMessage}
      onChange={handleChangeUrl}
    />
  );
}
