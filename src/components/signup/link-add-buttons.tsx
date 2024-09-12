import Image from "next/image";

import { LinkTypePlus } from "@/types/link";

import { Text } from "../ui/text";

import { IconListType } from "./link-list-editor";

export interface LinkAddButtonsProps {
  /**SNS 아이콘이 클릭 될 때 호출되는 콜백 함수 */
  onAdd: (type: LinkTypePlus) => void;

  /**아이콘 리스트 객체 배열 */
  iconList: IconListType[];
}

export function LinkAddButtons({ onAdd, iconList }: LinkAddButtonsProps) {
  return (
    <>
      <section className="mb-10 w-full">
        <div className="overflow-x-auto">
          <ul className="flex flex-row gap-4 whitespace-nowrap px-3">
            {iconList.map((icon: IconListType) => (
              <button key={icon.type} className="grid gap-1" onClick={() => onAdd(icon.type)}>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
                  <Image
                    src={`/images/${icon.type}-logo.png`}
                    alt={icon.iconLabel}
                    width={256}
                    height={256}
                    className="h-10 w-10 rounded-xl"
                  />
                </span>
                <Text>{icon.iconLabel}</Text>
              </button>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
