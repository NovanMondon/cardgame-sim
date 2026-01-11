import { simulate } from "./simulate";

const buttonSimulation = document.getElementById('buttonSimulation') as HTMLButtonElement;
const textDeck0 = document.getElementById('deckA') as HTMLTextAreaElement;
const textDeck1 = document.getElementById('deckB') as HTMLTextAreaElement;
const simulationCount = document.getElementById('simulationCount') as HTMLInputElement;


buttonSimulation.addEventListener('click', () => {
  const writeResult = (message: string) => {
    const result = document.getElementById('simulationResult') as HTMLTextAreaElement;
    result.value = message;
  };
  const count = Number.parseInt(simulationCount.value);

  simulate(textDeck0.value, textDeck1.value, count, writeResult);
});

textDeck0.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();

textDeck1.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3 }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();

simulationCount.value = "100000";