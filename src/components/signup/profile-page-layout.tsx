"use clinet";
import { ReactNode } from "react";

import { Logo } from "@/components/logo";
import {
  AppHeader,
  AppHeaderLeft,
  AppHeaderCenter,
  AppHeaderRight,
} from "@/components/ui/app-header";

interface ProfilePageLayoutProps {
  children: ReactNode;
}

export const ProfilePageLayout: React.FC<ProfilePageLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader className="z-10">
        <AppHeaderLeft></AppHeaderLeft>
        <AppHeaderCenter>
          <Logo className="text-xl" />
        </AppHeaderCenter>
        <AppHeaderRight></AppHeaderRight>
      </AppHeader>

      <main className="flex-1 pb-[68px] pt-16">{children}</main>
    </>
  );
};
