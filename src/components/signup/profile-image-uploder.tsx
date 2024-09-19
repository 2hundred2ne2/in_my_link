"use client";
import Image from "next/image";
import { useState } from "react";

import { Camera } from "@phosphor-icons/react";

interface ProfileImageUploaderProps {
  onUploadComplete: (url: string) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  onUploadComplete,
  uploading,
  setUploading,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
          onUploadComplete(url + uniqueFilename);
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

  return (
    <div className="flex flex-col items-center px-3 pt-12">
      <button
        className="relative"
        onClick={() => document.getElementById("fileInput")?.click()}
        disabled={uploading}
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
  );
};
