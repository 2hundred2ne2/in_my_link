import Image from "next/image";
import { useRef } from "react";

import { Trash } from "@phosphor-icons/react";

interface LinkImageProps {
  src?: string;
  alt: string;
  onImageUpload: (file: File) => void;
  onDeleteImage: () => void;
}

export function LinkImage({ src, alt, onImageUpload, onDeleteImage }: LinkImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  // 이미지가 있고 커스텀 로고가 아닌 경우에만 표시
  const hasImage = Boolean(src);
  const isCustomLogo = src?.includes("custom-logo");
  const shouldShowDeleteImageButton = hasImage && !isCustomLogo;

  return (
    <>
      <div className="relative flex items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button type="button" onClick={handleImageClick}>
          <Image
            src={src ?? "/images/custom-logo.png"}
            alt={alt}
            width={256}
            height={256}
            className="inline-block h-8 min-w-8 max-w-8 rounded-xl"
          />
        </button>
        {/* 이미지 삭제 버튼 */}
        {shouldShowDeleteImageButton && (
          <button
            type="button"
            className="absolute -bottom-1 -right-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger text-foreground-inverted"
            onClick={onDeleteImage}
          >
            <span className="sr-only">이미지 삭제</span>
            <Trash size={14} />
          </button>
        )}
      </div>
    </>
  );
}
