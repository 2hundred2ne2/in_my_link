import Image from "next/image";

import { Text } from "../ui/text";

export function LinkAddButtons({ onAdd, iconLists }: any) {
  return (
    <>
      <section className="mb-10 w-full">
        <div className="overflow-x-auto">
          <ul className="flex flex-row gap-4 whitespace-nowrap px-3">
            {iconLists.map((icon: any) => (
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
