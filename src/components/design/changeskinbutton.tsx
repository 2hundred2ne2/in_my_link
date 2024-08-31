import { Heading } from "@/components/ui/heading";

export function ChangeSkinButton() {
  return (
    <>
      <section className="space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">스킨 편집</h1>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            배경 컬러
          </Heading>
          <div className="overflow-x-auto">
            <div className="mt-2 flex min-w-max gap-3">
              <button
                type="button" //여기서부터 버튼
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-background transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">기본</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-background-muted transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">약함</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-green-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 그린</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-pink-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 핑크</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-blue-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 블루</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            스티커
          </Heading>
          <div className="overflow-x-auto">
            <div className="mt-2 flex min-w-max gap-3">
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full border bg-background transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">기본</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full bg-background-muted transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">약함</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full bg-green-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 그린</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full bg-pink-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 핑크</span>
              </button>
              <button
                type="button"
                className="h-14 w-14 flex-shrink-0 rounded-full bg-blue-100 transition-transform duration-100 active:scale-[0.96]"
              >
                <span className="sr-only">파스텔 블루</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
