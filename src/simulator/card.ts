
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