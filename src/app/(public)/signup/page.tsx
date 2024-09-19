import { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { SignupForm } from "@/components/signup/ form";
import { Text } from "@/components/ui/text";
export const metadata: Metadata = {
  title: "회원가입",
};
export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-3 py-8 md:px-8">
      <div className="w-full max-w-xs">
        <Logo className="mb-5 text-center text-3xl font-extrabold" />
        <SignupForm />
        <div className="mt-8 text-center">
          <p className="text-foreground">
            <Text as="span"> 회원이신가요?</Text>
            <Link href="/login" className="text-accent">
              <Text as="span" className="hover:underline">
                로그인
              </Text>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
