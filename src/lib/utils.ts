import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 여러 클래스를 하나로 합칩니다
 * - clsx를 이용한 조건부 클래스를 쉽게 적용가능
 * - twMerge로 tailwind 클래스 충돌 해결 및 중복을 제거
 * @param inputs - 합칠 클래스들 (문자열, 객체, 배열 등)
 * @returns 클래스 문자열
 * @see https://github.com/lukeed/clsx
 * @see https://github.com/dcastil/tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
