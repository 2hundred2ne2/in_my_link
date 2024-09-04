import { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tadak.io"),
  title: {
    default: "링꾸",
    template: "%s | 링꾸",
  },
  description: "링꾸로 여러분의 모든 소셜 미디어 링크를 한 페이지에 모아보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col overflow-x-hidden">
          {children}
          {/* @see https://react-hot-toast.com/docs/toaster */}
          <Toaster
            toastOptions={{
              style: {
                width: "100%",
                backgroundColor: "rgb(var(--foreground) / 1)",
                color: "rgb(var(--foreground-inverted) / 0.87)",
                fontSize: "0.875rem",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
