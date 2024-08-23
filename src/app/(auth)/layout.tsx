import { MobileNavigation } from "@/components/mobile-navigation";

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
