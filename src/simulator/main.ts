// devcontainer内で実行可能なシミュレーション
// cd /workspaces/cardgame-sim/src/simulator && node main.ts

import { parseToCards, shuffleDeck } from "./card.ts";
import { Game } from "./game.ts"; // nodeで直接実行できるよう、.tsを明示してインポートする。

const deckAYAML = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`;

const deckBYAML = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`;

const deckA = parseToCards(deckAYAML);
if (!deckA.ok) throw new Error(`deckAが異常!${deckA.error}`);
const deckB = parseToCards(deckBYAML);
if (!deckB.ok) throw new Error(`deckBが異常!${deckB.error}`);

const startTime = performance.now(); // 時間計測
const countTotal = 100000;
const countWinners = { A: 0, B: 0 };
const countReasons: Record<string, number> = {};

for (let i = 0; i < countTotal; i++) {
  // point: 先行は固定
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
console.log("Time:", (endTime - startTime) / countTotal * 1000000, "ns/game");
