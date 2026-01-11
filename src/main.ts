import { simulate } from "./simulate";

const buttonSimulation = document.getElementById('buttonSimulation') as HTMLButtonElement;
const textDeck0 = document.getElementById('deck0') as HTMLTextAreaElement;
const textTactics0 = document.getElementById('tactics0') as HTMLTextAreaElement;
const textDeck1 = document.getElementById('deck1') as HTMLTextAreaElement;
const textTactics1 = document.getElementById('tactics1') as HTMLTextAreaElement;
const simulationCount = document.getElementById('simulationCount') as HTMLInputElement;


buttonSimulation.addEventListener('click', () => {
  const writeResult = (message: string) => {
    const result = document.getElementById('simulationResult') as HTMLTextAreaElement;
    result.value = message;
  };
  const count = Number.parseInt(simulationCount.value);

  simulate(
    textDeck0.value,
    textDeck1.value,
    textTactics0.value,
    textTactics1.value,
    count,
    writeResult);
});

textDeck0.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3, effect: "dog" }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();

textTactics0.value = `
dog:
  if:
    - ">=": [{var: "picked.power"}, 3]
    - "down"
    - "up"
`.trim();

textDeck1.value = `
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "newcomer", power: 1 }
- { name: "talent", power: 2 }
- { name: "dog", power: 3, effect: "dog" }
- { name: "champion", power: 4 }
- { name: "a1", power: 3 }
- { name: "a2", power: 3 }
- { name: "a3", power: 3 }
`.trim();

textTactics1.value = `
dog: "up"
`.trim();

simulationCount.value = "10000";