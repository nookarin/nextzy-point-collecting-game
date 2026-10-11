import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

interface HistoryItemProps {
  variant: "play" | "reward";
  title: string;
  subtitle: string;
}

export function HistoryItem({ variant, title, subtitle }: HistoryItemProps) {
  return (
    <li className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
      <span
        aria-hidden
        className={cn(
          "size-9 shrink-0 rounded-full bg-linear-to-b",
          variant === "play" ? "from-brand-red to-red-900" : "from-indigo-500 to-violet-900",
        )}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
    </li>
  );
}

export function HistoryItemSkeleton() {
  return (
    <li className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
      <Skeleton className="size-9 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </li>
  );
}