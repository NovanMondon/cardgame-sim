import { parseToCards, shuffleDeck, type Card } from "./simulator/card";
import { Game } from "./simulator/game";

export const simulate = (
  deck0YAML: string,
  deck1YAML: string,
  count: number,
  output: (message: string) => void
) => {
  const deck0 = parseToCards(deck0YAML);
  if (!deck0.ok) {
    output(`deck0のパースに失敗:\n${deck0.error}`);
    return;
  }
  const deck1 = parseToCards(deck1YAML);
  if (!deck1.ok) {
    output(`deck1のパースに失敗:\n${deck1.error}`);
    return;
  }

  output("Simulation Start");

  const startTime = performance.now();
  const gameResultCount = simulateLoop([deck0.value, deck1.value], count);
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;

  // 結果の集計
  const countWinners: Record<0 | 1, number> = { 0: 0, 1: 0 };
  const countReasons: Record<string, number> = {};
  for (const key of Object.keys(gameResultCount)) {
    const result: ResultKey = JSON.parse(key);
    countWinners[result.winner] = (countWinners[result.winner] ?? 0) + gameResultCount[key];
    countReasons[result.reason] = (countReasons[result.reason] ?? 0) + gameResultCount[key];
  }

  output(`
Winners: ${JSON.stringify(countWinners)} / ${count}
Reasons: ${JSON.stringify(countReasons)} / ${count}
Time:
  Total ${elapsedTime} ms
  ${elapsedTime / count * 1000000} ns/game

Whole Result:\n${JSON.stringify(gameResultCount, null, 2)}
    `.trim());
};

type ResultKey = { winner: 0 | 1, reason: string }

function simulateLoop(decks: Card[][], count: number): Record<string, number> {
  const gameResultCount: Record<string, number> = {};
  for (let i = 0; i < count; i++) {
    // 先行は固定
    const shuffledDecks = [shuffleDeck(decks[0]), shuffleDeck(decks[1])];
    const game = new Game(() => { });
    const result = game.simulateOnce(shuffledDecks);
    // 結果集計
    const key = JSON.stringify({ winner: result.winner, reason: result.reason });
    gameResultCount[key] = (gameResultCount[key] ?? 0) + 1;
  }

  return gameResultCount;
}