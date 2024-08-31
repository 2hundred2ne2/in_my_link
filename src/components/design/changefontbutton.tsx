import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

export function ChangeFontButton() {
  return (
    <>
      <section className="space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">폰트 편집</h1>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            종류
          </Heading>
          <div className="mt-2 flex gap-2">
            <Button type="button" variant="primary">
              폰트 A
            </Button>
            <Button type="button" variant="secondary">
              폰트 B
            </Button>
            <Button type="button" variant="secondary">
              폰트 C
            </Button>
          </div>
        </div>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            사이즈
          </Heading>
          <div className="mt-2 flex gap-2">
            <Button type="button" variant="primary" className="text-xs">
              작게
            </Button>
            <Button type="button" variant="secondary" className="text-sm">
              보통
            </Button>
            <Button type="button" variant="secondary" className="text-base">
              크게
            </Button>
          </div>
        </div>
        <div>
          <h1 className="sr-only">폰트 미리보기</h1>
          <Card
            variant="muted"
            className="mt-10 flex h-32 w-full items-center justify-center rounded-2xl"
          >
            가나다 ABC
          </Card>
        </div>
      </section>
    </>
  );
}
