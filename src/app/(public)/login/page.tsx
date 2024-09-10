import { Metadata } from "next";
import Link from "next/link";

import LoginForm from "@/components/login/login-form";
import { Logo } from "@/components/logo";
import { Text } from "@/components/ui/text";
export const metadata: Metadata = {
  title: "로그인",
};
export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-3 py-8 md:px-8">
      <div className="w-full max-w-xs">
        <Logo className="mb-5" />
        <LoginForm />
        <div className="mt-8 text-center">
          <p className="text-foreground">
            <Text as="span">처음이신가요?</Text>
            <Link href="/signup" className="ml-3 text-accent">
              <Text as="span" className="hover:underline">
                가입하기
              </Text>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
