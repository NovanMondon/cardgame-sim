import { parse } from "yaml";
import { apply } from "json-logic-js";
import type { Result } from "./util";

export type Tactics = Map<string, (state: string) => string>

export function parseToTactics(tacticsYAML: string): Result<Tactics, string> {
  const result: Tactics = new Map();
  const raw = parse(tacticsYAML);

  for (const key of ["dog"]) {
    if (raw[key] == undefined) return { ok: false, error: `${key} に対応する戦略が書かれていません。` };
    result.set(key, (state: string) => {
      return apply(raw[key], JSON.parse(state));
    });
  }

  return { ok: true, value: result };
}