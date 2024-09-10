"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Camera } from "@phosphor-icons/react/dist/ssr";

import { Input } from "@/components/input";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [nickname, setNickname] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImagePreview(URL.createObjectURL(selectedFile)); // 미리보기 이미지 URL 생성
      await handleUpload(selectedFile); // 파일 선택 후 자동 업로드
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (response.ok) {
        const { url, fields } = await response.json();

        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", file);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          setImage(url);
        } else {
          alert("프로필 사진 업로드에 실패했습니다.");
        }
      } else {
        alert("presigned URL을 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("프로필 사진 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleNext = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
        body: JSON.stringify({
          nickname,
          intro,
          image, // 업로드된 프로필 이미지 URL 추가
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
      <AppHeader>
        <AppHeaderLeft></AppHeaderLeft>
        <AppHeaderCenter></AppHeaderCenter>
        <AppHeaderRight></AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pb-[68px] pt-16">
        <div className="flex flex-col items-center px-3 pt-12">
          <button
            className="relative"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <span className="sr-only">프로필 변경</span>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
            <span className="inline-block h-24 w-24 rounded-full bg-primary-300">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="프로필 사진 미리보기"
                  layout="fill" // 이미지 크기 자동 조정
                  objectFit="cover" // 이미지 커버 스타일로 유지
                  className="rounded-full"
                />
              ) : (
                <span className="inline-block h-24 w-24 rounded-full bg-primary-300"></span>
              )}
            </span>
            <span className="absolute bottom-0 right-1 inline-flex min-h-7 min-w-7 items-center justify-center rounded-full border border-foreground-muted bg-background-muted">
              <Camera size={20} weight="fill" />
            </span>
          </button>
        </div>

        {/* 닉네임, 자기소개 */}
        <div className="mt-2 px-3">
          <div className="flex flex-col">
            <Input
              placeholder="닉네임"
              className="w-full"
              value={nickname}
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setNickname(e.target.value);
                }
              }}
            />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              {nickname.length}/20
            </Text>
          </div>
          <div className="mt-2 flex flex-col">
            <TextArea
              placeholder="자기소개"
              maxLength={150}
              resize="none"
              className="min-h-32"
              value={intro}
              onChange={(e) => {
                if (e.target.value.length <= 150) {
                  setIntro(e.target.value);
                }
              }}
            />
            <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
              {intro.length}/150
            </Text>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 px-2">
          <Button variant="primary" size="large" onClick={handleNext} disabled={uploading}>
            다음
          </Button>
        </div>
      </main>
    </>
  );
}
