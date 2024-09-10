import Image from "next/image";

import { Trash } from "@phosphor-icons/react";

interface LinkImageProps {
  src?: string;
  alt: string;
  onDeleteImage: () => void;
}

export function LinkImage({ src, alt, onDeleteImage }: LinkImageProps) {
  // 이미지가 있고 커스텀 로고가 아닌 경우에만 표시
  const hasImage = Boolean(src);
  const isCustomLogo = src?.includes("custom-logo");
  const shouldShowDeleteImageButton = hasImage && !isCustomLogo;

  return (
    <>
      <div className="relative flex items-center">
        <button type="button">
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
