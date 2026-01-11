import { parseToCards, shuffleDeck } from "./card.ts"; // nodeから直接実行する場合に必要
import { Game } from "./game.ts";

function main() {

  const deck0YAML = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3, effect: "dog" }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`;
  const deck1YAML = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3, effect: "dog" }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`;

  const deck0 = parseToCards(deck0YAML);
  if (!deck0.ok) {
    console.log(`deck0のパースに失敗:\n${deck0.error}`);
    return;
  }
  const deck1 = parseToCards(deck1YAML);
  if (!deck1.ok) {
    console.log(`deck1のパースに失敗:\n${deck1.error}`);
    return;
  }

  const shuffledDecks = [shuffleDeck(deck0.value), shuffleDeck(deck1.value)];
  const game = new Game(() => { });
  const result = game.simulateOnce(shuffledDecks);

  console.log(result);
}

main();