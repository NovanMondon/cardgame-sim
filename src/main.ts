import { parse } from "yaml";
import { shuffleDeck, validateCards } from "./simulator/card";
import { Game } from "./simulator/game";

const buttonSimulation = document.getElementById('buttonSimulation') as HTMLButtonElement;
const textDeckA = document.getElementById('deckA') as HTMLTextAreaElement;
const textDeckB = document.getElementById('deckB') as HTMLTextAreaElement;

const simulate = () => {
  const deckAYAML = textDeckA.value;
  const deckA = parse(deckAYAML);
  if (!validateCards(deckA)) {
    writeResult("Invalid deckA");
    return;
  }
  const deckBYAML = textDeckB.value;
  const deckB = parse(deckBYAML);
  if (!validateCards(deckB)) {
    writeResult("Invalid deckB");
    return;
  }

  writeResult("Simulation Start");

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
  const endTime = performance.now(); // 時間計測

  writeResult(`
    AWin: ${countAWin}/${countTotal}
    Time: ${(endTime - startTime) / countTotal * 1000000} ns/game
    `.trim());
};

const writeResult = (message: string) => {
  const result = document.getElementById('simulationResult') as HTMLElement;
  result.innerText = message;
};

buttonSimulation.addEventListener('click', simulate);

textDeckA.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();

textDeckB.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();