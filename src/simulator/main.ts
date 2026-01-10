// devcontainer内で実行可能なシミュレーション
// cd /workspaces/cardgame-sim/src/simulator && node main.ts

import { Game, type Card } from "./game.ts"; // nodeで直接実行できるよう、.tsを明示してインポートする。


const deckA: Card[] = [
  { name: "newcomer", power: 1 },
  { name: "newcomer", power: 1 },
  { name: "newcomer", power: 1 },
  { name: "dog", power: 3 },
  { name: "champion", power: 4 },
  { name: "a1", power: 3 },
  { name: "a2", power: 3 },
  { name: "a3", power: 3 },
];
const deckB: Card[] = [
  { name: "newcomer", power: 1 },
  { name: "newcomer", power: 1 },
  { name: "newcomer", power: 1 },
  { name: "dog", power: 3 },
  { name: "champion", power: 4 },
  { name: "a1", power: 3 },
  { name: "a2", power: 3 },
  { name: "a3", power: 3 },
];

function shuffleDeck(deck: Card[]): Card[] {
  const resDeck: Card[] = [];
  for (let i = 0; i < deck.length; i++) {
    resDeck.push(deck[i]);
  }

  for (let i = resDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resDeck[i], resDeck[j]] = [resDeck[j], resDeck[i]];
  }

  return resDeck;
}

const startTime = performance.now(); // 時間計測
const countTotal = 100000;
let countAWin = 0;
for (let i = 0; i < countTotal; i++) {
  // 先行は固定
  const shuffledDecks = [shuffleDeck(deckA), shuffleDeck(deckB)];
  const game = new Game(() => { });
  const result = game.simulateOnce(shuffledDecks);
  if (result.winner == 0) countAWin++;
}
console.log("AWin:", countAWin);
const endTime = performance.now(); // 時間計測
console.log("Time:", (endTime - startTime) / countTotal * 1000000, "ns/game");
