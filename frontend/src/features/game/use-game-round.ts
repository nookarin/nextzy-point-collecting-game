"use client";

import { useState } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { playerApi } from "@/lib/api/player-api";
import type { PlayResult } from "@/lib/api/types";
import { ELIMINATION_STEP_MS, POINT_OPTIONS, REDUCED_MOTION_STEP_MS } from "./constants";

export type GamePhase = "idle" | "playing" | "finished";
type PointValue = (typeof POINT_OPTIONS)[number];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function useGameRound() {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [eliminated, setEliminated] = useState<PointValue[]>([]);
  const [result, setResult] = useState<PlayResult>();
  const [latestScore, setLatestScore] = useState<number>();
  const play = useApiMutation(playerApi.play);

  async function start() {
    if (phase !== "idle") return;

    setPhase("playing");
    setEliminated([]);
    setResult(undefined);

    const outcome = await play.mutate();
    if (!outcome) {
      setPhase("idle");
      return;
    }

    const stepMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? REDUCED_MOTION_STEP_MS
      : ELIMINATION_STEP_MS;

    const losers = shuffle(POINT_OPTIONS.filter((points) => points !== outcome.points));
    for (const points of losers) {
      await delay(stepMs);
      setEliminated((previous) => [...previous, points]);
    }

    await delay(stepMs);
    setLatestScore(outcome.score);
    setResult(outcome);
    setPhase("finished");
  }

  function playAgain() {
    setPhase("idle");
    setEliminated([]);
  }

  return {
    phase,
    eliminated,
    result,
    latestScore,
    isWaitingForServer: play.isPending,
    playError: play.error,
    clearPlayError: play.clearError,
    start,
    playAgain,
  };
}