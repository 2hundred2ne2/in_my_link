"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ProfileImageUploader } from "./profile-image-uploder";
import { IntroInput } from "./profile-intro-input";
import { NicknameInput } from "./profile-nickname-input";

export default function ProfileContent() {
  const [nickname, setNickname] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = async () => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      alert("토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nickname,
          intro,
          image,
        }),
      });

      if (response.ok) {
        router.push("/signup/link");
      } else {
        alert("프로필 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("오류가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };

  return (
    <>
      <ProfileImageUploader
        onUploadComplete={setImage}
        uploading={uploading}
        setUploading={setUploading}
      />
      <div className="mt-2 px-3">
        <NicknameInput nickname={nickname} onChange={setNickname} />
        <IntroInput intro={intro} onChange={setIntro} />
      </div>
      <div className="mt-20 flex flex-col gap-2 px-2">
        <Button variant="primary" size="large" onClick={handleNext} disabled={uploading}>
          다음
        </Button>

        <Link href="/signup/link" className="flex flex-col">
          <Button variant="text" size="large">
            건너뛰기
          </Button>
        </Link>
      </div>
    </>
  );
}
