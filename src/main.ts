import { simulate } from "./simulate";

const buttonSimulation = document.getElementById('buttonSimulation') as HTMLButtonElement;
const textDeckA = document.getElementById('deckA') as HTMLTextAreaElement;
const textDeckB = document.getElementById('deckB') as HTMLTextAreaElement;


buttonSimulation.addEventListener('click', () => {
  const writeResult = (message: string) => {
    const result = document.getElementById('simulationResult') as HTMLElement;
    result.innerText = message;
  };

  simulate(textDeckA.value, textDeckB.value, writeResult);
});

textDeckA.value = `
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

textDeckB.value = `
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