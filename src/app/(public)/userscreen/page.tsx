import { Portal } from "@/components/portal";

export default function UserScreenPage() {
  return (
    <>
      <Portal>
        <div className="fixed inset-0 z-[-10]"></div>
      </Portal>
      <div className="mx-auto flex min-h-dvh max-w-screen-sm flex-col items-center">
        <section className="my-8 flex flex-col items-center gap-3">
          <button type="button" className="h-[95px] w-[95px] rounded-full bg-slate-600"></button>
          <div className="my-2 flex flex-col items-center gap-3">
            <div className="">닉네임</div>
            <div className="">자신을 소개해볼까요?</div>
          </div>
        </section>
        <section className="flex flex-col gap-5 pb-10 text-[15px]">
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>instargram</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>kakao</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>blog</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>X</div>
          </div>
          <div className="flex h-[70px] cursor-pointer flex-row items-center justify-start gap-5 rounded-2xl border border-border bg-white pl-6 pr-6">
            <div className="h-[45px] w-[45px] rounded-2xl bg-background-muted"></div>
            <div>http://www.naver.com</div>
          </div>
        </section>
      </div>
    </>
  );
}
