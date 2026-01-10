
export type Card = {
  name: string,
  power: number
}

export class Game {
  private _log: (message: string) => void;

  constructor(log: (message: string) => void) {
    this._log = log;
  }

  simulateOnce(decks: Card[][]) {
    const fields: Card[][] = [[], []];
    let drawn: Card | null = null;
    let is_bench_over: boolean | null = null;
    const benchs: Card[][][] = [[], []];
    // let trash = [[], []];
    let tp: 0 | 1 = 0; // turn player
    let ntp: 0 | 1 = 1; // non turn player

    this._log("start simulation");
    while (true) {
      // カードをめくる
      if (decks[tp].length <= 0) {
        return { winner: ntp, reason: "Deck Empty", fields: fields, benchs: benchs };
      }
      [decks[tp], drawn] = this.drawCard(decks[tp]);
      // カードを使用
      fields[tp] = this.playCard(drawn, fields[tp]);
      // パワーの判定
      const tpPower = this.calcPowerTP(fields[tp]);
      const ntpPower = this.calcPowerNTP(fields[ntp]);
      // カードの勝敗の判定
      if (tpPower >= ntpPower) {
        [fields[ntp], benchs[ntp], is_bench_over] = this.sendToBench(fields[ntp], benchs[ntp]);
        if (is_bench_over) { // ベンチあふれによる敗北
          return { winner: ntp, reason: "Bench Overflow", fields: fields, benchs: benchs };
        }

        [tp, ntp] = [ntp, tp];
      }
    }
  }

  drawCard(deck: Card[]): [Card[], Card] {
    const resCard = deck[0];
    const resDeck: Card[] = [];
    for (let i = 0; i < deck.length; i++) {
      if (i == 0) continue;
      resDeck.push(deck[i]);
    }

    return [resDeck, resCard];
  }

  playCard(drawn: Card, field: Card[]): Card[] {
    const resField: Card[] = [];
    for (let i = 0; i < field.length; i++) {
      resField.push(field[i]);
    }
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
    const resField: Card[] = [];
    for (let i = 0; i < field.length; i++) {
      resField.push(field[i]);
    }
    const resBench: Card[][] = [];
    for (let i = 0; i < bench.length; i++) {
      resBench.push(bench[i]);
    }
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