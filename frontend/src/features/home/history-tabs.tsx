"use client";

import { useId, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import type { ApiQuery } from "@/hooks/use-api-query";
import { getErrorMessage } from "@/lib/api/error-messages";
import type { PlayHistoryItem, RewardHistoryItem } from "@/lib/api/types";
import { cn } from "@/lib/cn";
import { formatDateTime, formatNumber } from "@/lib/format";
import { HistoryItem, HistoryItemSkeleton } from "./history-item";

type TabKey = "plays" | "rewards";

const TABS: { key: TabKey; label: string }[] = [
  { key: "plays", label: "ประวัติการเล่น" },
  { key: "rewards", label: "ประวัติรางวัล" },
];

interface HistoryTabsProps {
  plays: ApiQuery<PlayHistoryItem[]>;
  rewards: ApiQuery<RewardHistoryItem[]>;
}

export function HistoryTabs({ plays, rewards }: HistoryTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("plays");
  const baseId = useId();

  return (
    <section>
      <div
        role="tablist"
        aria-label="ประวัติ"
        className="flex gap-[5px] px-[11px] pb-[9px]"
      >
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "h-[32px] w-[90px] rounded-full border text-[12px] leading-none",
                isActive
                  ? "border-brand-tab text-brand-tab"
                  : "border-muted text-muted",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeTab}`}
        aria-labelledby={`${baseId}-tab-${activeTab}`}
        className="border-t border-neutral-100"
      >
        {activeTab === "plays" ? (
          <HistoryPanel
            query={plays}
            emptyMessage="ยังไม่มีประวัติการเล่น"
            renderItem={(play) => (
              <HistoryItem
                key={play.id}
                variant="play"
                title={`เล่นได้ ${formatNumber(play.points)} คะแนน`}
                subtitle={`เล่นเมื่อ ${formatDateTime(play.playedAt)}`}
              />
            )}
          />
        ) : (
          <HistoryPanel
            query={rewards}
            emptyMessage="ยังไม่มีประวัติรางวัล"
            renderItem={(reward) => (
              <HistoryItem
                key={reward.id}
                variant="reward"
                title={`ได้รับ${reward.rewardName}`}
                subtitle={`ได้รับเมื่อ ${formatDateTime(reward.claimedAt)}`}
              />
            )}
          />
        )}
      </div>
    </section>
  );
}

interface HistoryPanelProps<T> {
  query: ApiQuery<T[]>;
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
}

function HistoryPanel<T>({
  query,
  emptyMessage,
  renderItem,
}: HistoryPanelProps<T>) {
  if (query.isLoading) {
    return (
      <ul aria-busy="true">
        {Array.from({ length: 3 }, (_, index) => (
          <HistoryItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (query.error && !query.data) {
    return (
      <ErrorState
        message={getErrorMessage(query.error)}
        onRetry={query.refetch}
      />
    );
  }

  if (!query.data || query.data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return <ul>{query.data.map(renderItem)}</ul>;
}
