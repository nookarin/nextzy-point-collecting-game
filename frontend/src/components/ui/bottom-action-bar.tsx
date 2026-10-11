import type { ReactNode } from "react";

export function BottomActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 mt-auto bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}