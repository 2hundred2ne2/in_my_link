import { Metadata } from "next";

import ProfileContent from "@/components/signup/pofile-content";
import { ProfilePageLayout } from "@/components/signup/profile-page-layout";
export const metadata: Metadata = {
  title: "회원가입",
  description: "회원가입을 통해 프로필을 설정하세요.",
};

export default function ProfilePage() {
  return (
    <ProfilePageLayout>
      <ProfileContent />
    </ProfilePageLayout>
  );
}
