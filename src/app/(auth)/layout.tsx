import { MobileNavigation } from "@/components/mobile-navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-screen-sm min-h-dvh">
      {children}
      <MobileNavigation />
    </div>
  );
}
