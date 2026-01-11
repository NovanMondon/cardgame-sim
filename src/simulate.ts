import { parseToCards, shuffleDeck } from "./simulator/card";
import { Game } from "./simulator/game";

export const simulate = (
  deckAYAML: string,
  deckBYAML: string,
  output: (message: string) => void
) => {
  const deckA = parseToCards(deckAYAML);
  if (!deckA.ok) {
    output(`deckAのパースに失敗:\n${deckA.error}`);
    return;
  }
  const deckB = parseToCards(deckBYAML);
  if (!deckB.ok) {
    output(`deckBのパースに失敗:\n${deckB.error}`);
    return;
  }

  output("Simulation Start");

  const startTime = performance.now(); // 時間計測
  const countTotal = 100000;
  const countWinners = { A: 0, B: 0 };
const countReasons: Record<string, number> = {};
  for (let i = 0; i < countTotal; i++) {
    // 先行は固定
    const shuffledDecks = [shuffleDeck(deckA.value), shuffleDeck(deckB.value)];
    const game = new Game(() => { });
    const result = game.simulateOnce(shuffledDecks);
  // 結果集計
  if (result.winner == 0) {
    countWinners.A++;
  } else {
    countWinners.B++;
  }
  countReasons[result.reason] = countReasons[result.reason] ? countReasons[result.reason] + 1 : 1;
  }
  const endTime = performance.now(); // 時間計測

console.log("Winners:", countWinners);
console.log("Reasons:", countReasons);
  output(`
    Winners: ${JSON.stringify(countWinners)} / ${countTotal}
    Reasons: ${JSON.stringify(countReasons)} / ${countTotal}
    Time: ${(endTime - startTime) / countTotal * 1000000} ns/game
    `.trim());
};
