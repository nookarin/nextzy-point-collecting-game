import type { Metadata } from "next";
import { GameScreen } from "@/features/game/game-screen";

export const metadata: Metadata = {
  title: "สุ่มคะแนน | เกมสะสมคะแนน Nextzy",
};

export default function GamePage() {
  return <GameScreen />;
}