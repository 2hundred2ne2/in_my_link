"use client";
import { useState } from "react";

export default function ProfileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    setUploading(true);

    try {
      // /api/upload로 파일 업로드를 요청하여 presigned URL을 가져옴
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

        // presigned URL로 파일 업로드
        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          setUploadUrl(url);
          alert("파일이 성공적으로 업로드되었습니다!");
        } else {
          alert("파일 업로드에 실패했습니다.");
        }
      } else {
        alert("presigned URL을 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>프로필 업로드</h1>
      <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "업로드 중..." : "업로드"}
      </button>

      {uploadUrl && (
        <div>
          <p>업로드된 파일 URL:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
        </div>
      )}
    </div>
  );
}
