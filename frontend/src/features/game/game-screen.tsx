"use client";

import Link from "next/link";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { PillButton, pillClasses } from "@/components/ui/pill-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiQuery } from "@/hooks/use-api-query";
import { getErrorMessage } from "@/lib/api/error-messages";
import { playerApi } from "@/lib/api/player-api";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { POINT_OPTIONS } from "./constants";
import { PointOption, type PointOptionState } from "./point-option";
import { useGameRound } from "./use-game-round";

export function GameScreen() {
  const status = useApiQuery(playerApi.getStatus);
  const round = useGameRound();

  const score = round.latestScore ?? status.data?.score;

  function optionState(points: number): PointOptionState {
    if (round.eliminated.includes(points as (typeof POINT_OPTIONS)[number])) return "eliminated";
    if (round.phase === "finished" && round.result?.points === points) return "winner";
    return "idle";
  }

  return (
    <>
      <main className="flex flex-1 flex-col bg-linear-to-b from-cream-from to-cream-to px-4">
        <header className="pt-10 text-center">
          {status.isLoading && <Skeleton className="mx-auto h-7 w-56" />}
          {status.error && !status.data && (
            <ErrorState message={getErrorMessage(status.error)} onRetry={status.refetch} />
          )}
          {status.data && score !== undefined && (
            <h1 className="text-lg font-semibold">
              คะแนนสะสม {formatNumber(score)}/{formatNumber(status.data.maxScore)}
            </h1>
          )}
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-10 pb-10">
          <ul className="flex w-full gap-1.5" aria-label="คะแนนที่สุ่มได้">
            {POINT_OPTIONS.map((points) => (
              <PointOption
                key={points}
                points={points}
                state={optionState(points)}
                isPulsing={round.isWaitingForServer}
              />
            ))}
          </ul>

          <PillButton
            variant="red"
            onClick={round.start}
            disabled={round.phase !== "idle" || !status.data}
            className={cn(round.phase === "finished" && "invisible")}
          >
            สุ่มคะแนน
          </PillButton>
        </div>
      </main>

      <BottomActionBar>
        <Link href="/" className={pillClasses("yellow", "lg")}>
          กลับหน้าหลัก
        </Link>
      </BottomActionBar>

      <Modal
        open={round.phase === "finished"}
        onClose={round.playAgain}
        title="ได้รับ"
        message={round.result ? `${formatNumber(round.result.points)} คะแนน` : ""}
      />

      <Modal
        open={round.playError !== undefined}
        onClose={round.clearPlayError}
        title="เล่นไม่สำเร็จ"
        message={round.playError ? getErrorMessage(round.playError) : ""}
      />
    </>
  );
}