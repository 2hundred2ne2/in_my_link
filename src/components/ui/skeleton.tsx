import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700", className)}></div>
  );
}
