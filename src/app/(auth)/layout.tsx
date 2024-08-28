import { MobileNavigation } from "@/components/mobile-navigation";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="relative flex justify-center">
        <Button
          variant="text"
          radius="full"
          className="fixed bottom-0 z-10 mx-auto mb-20 w-40 border-[0.2px] bg-background shadow-md"
        >
          미리보기
        </Button>
      </div>
      <MobileNavigation />
    </>
  );
}
