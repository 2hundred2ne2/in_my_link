import Image, { ImageProps } from "next/image";

export interface AvatarProps extends ImageProps {
  size?: number;
}

export function Avatar({ size = 40, ...rest }: AvatarProps) {
  return <Image width={size} height={size} {...rest} />;
}
