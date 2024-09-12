"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
import { useUser } from "@/context/user-context";

export default function ProfilePage() {
  const router = useRouter();
  const user = useUser(); // 로그인된 사용자 정보 가져오기

  // 로그인된 사용자의 정보를 가져와서 상태로 관리 (예: useUser() 훅 사용)
  const [nickname, setNickname] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [originalNickname, setOriginalNickname] = useState<string>(""); // 원래 닉네임 저장
  const [originalIntro, setOriginalIntro] = useState<string>(""); // 원래 자기소개 저장
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // 유저 정보 받아와서 상태 업데이트
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.userId) {
        return;
      } // userId가 없으면 중단

      try {
        const response = await fetch(`/api/users?id=${user.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          console.log(user);
          setNickname(user.nickname || ""); // 받아온 값이 있으면 설정
          setIntro(user.intro || ""); // 받아온 값이 있으면 설정
          setOriginalNickname(user.nickname || ""); // 원래 닉네임 저장
          setOriginalIntro(user.intro || ""); // 원래 자기소개 저장
          if (user.image) {
            setImagePreview(user.image || "");
            setImage(user.image || "");
          }
        } else {
          console.error("사용자 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 중 오류:", error);
      }
    };

    fetchUserData();
  }, [user?.userId]); // userId가 변경될 때마다 데이터를 가져옴

  // 이미지 업로드 처리
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
        const { url, uniqueFilename, fields } = await response.json();

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
          setImage(url + uniqueFilename);
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

  // 저장 버튼 클릭 처리
  const handleSave = async () => {
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
        alert("프로필이 성공적으로 업데이트되었습니다.");
      } else {
        alert("프로필 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("오류가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };

  // 취소 버튼 클릭 시 원래 값으로 복원
  const handleCancel = () => {
    setNickname(originalNickname);
    setIntro(originalIntro);
  };

  return (
    <>
      <AppHeader>
        <AppHeaderLeft>
          <Button variant="text" onClick={handleCancel}>
            취소
          </Button>
        </AppHeaderLeft>
        <AppHeaderCenter />
        <AppHeaderRight>
          <Button variant="text" className="text-accent" onClick={handleSave}>
            저장
          </Button>
        </AppHeaderRight>
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
                  layout="fill"
                  objectFit="cover"
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
              {nickname ? `${nickname.length}/20` : "0/20"}
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
              {intro ? `${intro.length}/150` : "0/150"}
            </Text>
          </div>
        </div>
      </main>
    </>
  );
}
