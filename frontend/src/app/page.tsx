"use client";

import { useState } from "react";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { PillButton } from "@/components/ui/pill-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiQuery } from "@/hooks/use-api-query";
import { getErrorMessage } from "@/lib/api/error-messages";
import { playerApi } from "@/lib/api/player-api";
import { formatNumber } from "@/lib/format";

export default function TestPage() {
  const status = useApiQuery(playerApi.getStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-4 p-4">
        {status.isLoading && <Skeleton className="h-24 w-full" />}
        {status.error && (
          <ErrorState message={getErrorMessage(status.error)} onRetry={status.refetch} />
        )}
        {status.data && (
          <p className="text-2xl font-semibold text-brand-red">
            {formatNumber(status.data.score)}/{formatNumber(status.data.maxScore)}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <PillButton variant="blue">RESET</PillButton>
          <PillButton variant="red">สุ่มคะแนน</PillButton>
          <PillButton variant="red" disabled>
            สุ่มคะแนน
          </PillButton>
          <PillButton variant="outline" onClick={() => setIsModalOpen(true)}>
            เปิด modal
          </PillButton>
        </div>
      </main>

      <BottomActionBar>
        <PillButton size="lg">ไปเล่นเกม</PillButton>
      </BottomActionBar>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ยินดีด้วย"
        message="คุณได้รับรางวัล A"
      />
    </>
  );
}