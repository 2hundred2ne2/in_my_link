"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PaintBrush, StackSimple, User } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const links = [
  {
    id: "디자인",
    href: "/design",
    title: "디자인",
    icon: PaintBrush,
  },
  {
    id: "링크",
    href: "/links",
    title: "링크",
    icon: StackSimple,
  },
  {
    id: "프로필",
    href: "/profile",
    title: "프로필",
    icon: User,
  },
];

export function MobileNavigation() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-screen-sm bg-background z-10">
      <h1 className="sr-only">모바일 네비게이션</h1>
      <ul className="flex justify-around items-center px-5 h-[68px]">
        {links.map((link) => (
          <li key={link.id} className="w-full h-full p-1 ">
            <Link
              href={link.href}
              className={cn(
                "w-full h-full flex flex-col items-center justify-center rounded-lg text-foreground-disabled hover:bg-background-muted transition-[background-color]",
                link.href === path && "text-foreground",
              )}
            >
              <link.icon size={24} />
              <span className="text-[10px] font-medium">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
