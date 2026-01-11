import type { Card } from "./card";
import type { Result } from "./util";

export class Game {
  private _log: (message: string) => void;

  constructor(log: (message: string) => void) {
    this._log = log;
  }

  simulateOnce(decks: Card[][]) {
    let fields: Card[][] = [[], []];
    let drawn: Card | null = null;
    let is_bench_over: boolean | null = null;
    let benchs: Card[][][] = [[], []];
    // let trash = [[], []];
    let tp: 0 | 1 = 0; // turn player
    let ntp: 0 | 1 = 1; // non turn player

    this._log("start simulation");
    while (true) {
      // カードをめくる
      const drawCardResult = this.drawCard(decks[tp]);
      if (!drawCardResult.ok) {
        return { winner: ntp, reason: "Deck Empty", fields: fields, benchs: benchs };
      }
      [decks[tp], drawn] = drawCardResult.value;
      // カードの効果適用
      [drawn, decks, fields, benchs] = this.playCard(drawn, decks, fields, benchs, tp, new Map());
      // カードの配置
      fields[tp] = this.placeCard(drawn, fields[tp]);
      // パワーの判定
      const tpPower = this.calcPowerTP(fields[tp]);
      const ntpPower = this.calcPowerNTP(fields[ntp]);
      // カードの勝敗の判定
      if (tpPower >= ntpPower) {
        [fields[ntp], benchs[ntp], is_bench_over] = this.sendToBench(fields[ntp], benchs[ntp]);
        if (is_bench_over) { // ベンチあふれによる敗北
          return { winner: tp, reason: "Bench Overflow", fields: fields, benchs: benchs };
        }

        [tp, ntp] = [ntp, tp];
      }
    }
  }

  drawCard(deck: Card[]): Result<[Card[], Card], null> {
    const resDeck: Card[] = [...deck];
    const resCard = resDeck.shift();
    if (resCard == undefined) return { ok: false, error: null };

    return { ok: true, value: [resDeck, resCard] };
  }

  playCard(
    drawn: Card,
    decks: Card[][],
    field: Card[][],
    benchs: Card[][][],
    tp: 0 | 1,
    tactics: Map<string, (state: string) => string>
  ): [Card, Card[][], Card[][], Card[][][]] {
    const resDrawn = drawn;
    const resDecks = structuredClone(decks);
    const resField = structuredClone(field);
    const resBenchs = structuredClone(benchs);

    (() => {
      if (resDrawn.effect == "dog") {
        if (tactics.has("dog")) {
          // do nothing
        } else {
          if(resDecks[tp].length <= 1) return;
          const picked = resDecks[tp][0];

          resDecks[tp].shift();
          resDecks[tp].push(picked);
        }
      }
    })();

    return [resDrawn, resDecks, resField, resBenchs];
  }

  placeCard(drawn: Card, field: Card[]): Card[] {
    const resField: Card[] = [...field];
    resField.push(drawn);

    return resField;
  }

  calcPowerTP(deck: Card[]): number {
    let resPower = 0;
    for (let i = 0; i < deck.length; i++) {
      resPower += deck[i].power;
    }
    return resPower;
  }

  calcPowerNTP(deck: Card[]): number {
    if (deck.length == 0) return 0;
    return deck[deck.length - 1].power;
  }

  sendToBench(field: Card[], bench: Card[][]): [Card[], Card[][], boolean] {
    const resField: Card[] = [...field];
    const resBench: Card[][] = [...bench];

    while (resField.length > 0) {
      const target = resField[resField.length - 1];
      const is_bench_over = (() => {
        for (let benchIdx = 0; benchIdx < resBench.length; benchIdx++) {
          if (resBench[benchIdx][0].name == target.name) {
            resField.pop();
            resBench[benchIdx].push(target);
            return false;
          }
        }
        if (resBench.length >= 6) {
          return true; // ベンチあふれ
        }
        resField.pop();
        resBench.push([target]);
        return false;
      })();

      if (is_bench_over) {
        return [resField, resBench, true];
      }
    }

    return [resField, resBench, false];
  }
}