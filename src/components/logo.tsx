import { Lobster } from "next/font/google";

import { cn } from "@/lib/utils";

const logo = Lobster({ subsets: ["latin"], weight: ["400"] });

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <h1 className={cn(logo.className, "text-center text-3xl font-extrabold", className)}>
      Linkggu
    </h1>
  );
}
