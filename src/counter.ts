export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  updateElement(element, 0);
  element.addEventListener('click', () => {
    counter++;
    updateElement(element, counter);
  });
}

function updateElement(element: HTMLElement, counter: number) {
  element.innerHTML = `count is ${counter}`;
}