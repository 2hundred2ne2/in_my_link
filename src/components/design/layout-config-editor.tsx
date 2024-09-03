import Image from "next/image";

import { Heading } from "@/components/ui/heading";

export function LayoutConfigEditor() {
  return (
    <>
      <section className="mb-16 space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">버튼 편집</h1>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            레이아웃
          </Heading>

          <div className="mt-2 space-y-3">
            <button
              type="button"
              className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
            >
              <Image
                alt="레이아웃 1"
                src="/images/layout-1.png"
                width={320}
                height={320}
                className="h-full w-full object-contain"
              />
              <span className="sr-only">레이아웃 1</span>
            </button>
            <button
              type="button"
              className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
            >
              <Image
                alt="레이아웃 2"
                src="/images/layout-2.png"
                width={320}
                height={320}
                className="h-full w-full object-contain"
              />
              <span className="sr-only">레이아웃 2</span>
            </button>
            <button
              type="button"
              className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
            >
              <Image
                alt="레이아웃 3"
                src="/images/layout-3.png"
                width={320}
                height={320}
                className="h-full w-full object-contain"
              />
              <span className="sr-only">레이아웃 3</span>
            </button>
            <button
              type="button"
              className="block h-32 w-full rounded-xl bg-background-muted/90 md:h-36"
            >
              <Image
                alt="레이아웃 4"
                src="/images/layout-4.png"
                width={320}
                height={320}
                className="h-full w-full object-contain"
              />
              <span className="sr-only">레이아웃 4</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
