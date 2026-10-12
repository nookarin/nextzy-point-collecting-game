import type { ReactNode } from "react";

export function BottomActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 mt-auto rounded-t-[16px] bg-white px-4 pt-4 pb-[max(24px,env(safe-area-inset-bottom))] shadow-[0_3px_5px_rgba(14,22,44,0.2),0_1px_18px_rgba(14,22,44,0.12),0_6px_10px_rgba(14,22,44,0.12)]">
      {children}
    </div>
  );
}