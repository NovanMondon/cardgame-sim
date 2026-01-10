
export type Card = {
  name: string,
  power: number
}

// note: 将来的にはzodとかを使うと便利らしい
export function validateCards(cards: unknown): cards is Card[] {
  const cards_ = cards as Card[];
  if (cards_ == undefined) return false;
  if (cards_.length == undefined) return false;
  for (let i = 0; i < cards_.length; i++) {
    if (cards_[i].name == undefined) return false;
    if (cards_[i].power == undefined) return false;
  }
  return true;
}

export function shuffleDeck(deck: Card[]): Card[] {
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