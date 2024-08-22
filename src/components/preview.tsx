import { X } from "@phosphor-icons/react/dist/ssr";

export function Preview() {
  return (
    <>
      <div className="mx-auto max-w-screen-sm min-h-dvh flex flex-col items-center">
        <section className="flex flex-col items-center gap-3 my-8">
          <button type="button" className="w-[95px] h-[95px] rounded-full bg-slate-600"></button>
          <div className="flex flex-col items-center gap-3 my-2">
            <div className="">닉네임</div>
            <div className="">자신을 소개해볼까요?</div>
          </div>
        </section>
        <section className="flex flex-col gap-5 pb-10 text-[15px]">
          <div className="h-[70px] bg-white border border-border rounded-2xl flex flex-row justify-start items-center gap-16 pl-6 cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-2xl bg-background-muted"></div>
            <div>instargram</div>
          </div>
          <div className="h-[70px] bg-white border border-border rounded-2xl flex flex-row justify-start items-center gap-16 pl-6 cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-2xl bg-background-muted"></div>
            <div>kakao</div>
          </div>
          <div className="h-[70px] bg-white border border-border rounded-2xl flex flex-row justify-start items-center gap-16 pl-6 cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-2xl bg-background-muted"></div>
            <div>blog</div>
          </div>
          <div className="h-[70px] bg-white border border-border rounded-2xl flex flex-row justify-start items-center gap-16 pl-6 cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-2xl bg-background-muted"></div>
            <div>X</div>
          </div>
          <div className="h-[70px] bg-white border border-border rounded-2xl flex flex-row justify-start items-center gap-16 pl-6 cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-2xl bg-background-muted"></div>
            <div>http://www.naver.com</div>
          </div>
        </section>
        <section className="mb-10">
          <div className="w-[50px] h-[50px] bg-white rounded-full shadow-lg flex justify-center items-center cursor-pointer hover:bg-background-muted">
            <X size={22} weight="regular" color="#18181B" />
          </div>
        </section>
      </div>
    </>
  );
}
