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
    <nav className="fixed bottom-0 left-0 right-0 z-10 mx-auto max-w-sm bg-background">
      <h1 className="sr-only">모바일 네비게이션</h1>
      <ul className="flex h-[68px] items-center justify-around px-5">
        {links.map((link) => (
          <li key={link.id} className="h-full w-full p-1">
            <Link
              href={link.href}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center rounded-lg text-foreground-disabled transition-[background-color] hover:bg-background-muted",
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
