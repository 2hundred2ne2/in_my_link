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
      <MobileNavigation />
    </>
  );
}
