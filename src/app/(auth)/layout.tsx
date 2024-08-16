import { MobileNavigation } from "@/components/mobile-navigation";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-screen-sm min-h-dvh">
      {children}
      <div className="relative flex justify-center">
        <Button
          variant="text"
          radius="full"
          className="fixed bottom-0 mx-auto w-40 mb-20 border-[0.2px] shadow-md z-10"
        >
          미리보기
        </Button>
      </div>
      <MobileNavigation />
    </div>
  );
}
