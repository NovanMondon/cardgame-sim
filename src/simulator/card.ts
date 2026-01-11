
import { parse } from "yaml";
import { z, ZodError } from "zod";
import type { Result } from "./util";

export type Card = {
  name: string,
  power: number
}

//
// 以下、Card関係のユーティリティ
//
const schemaCardCandidates = z.array(z.union([z.object({
  name: z.string(),
  power: z.number()
})]));

export function parseToCards(yaml: string): Result<Card[], string> {
  try {
    const source = parse(yaml);
    const cardCandidates = schemaCardCandidates.parse(source);
    return { ok: true, value: cardCandidates };
  } catch (e) {
    let message = "THROWN UNKNOWN";
    if (e instanceof ZodError) {
      const issue = e.issues[0];
      message = `
[${issue.code}]
${issue.path} において、
${issue.message}
      `.trim();
    } else if (e instanceof Error) {
      message = e.message;
    }
    return { ok: false, error: message };
  }
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