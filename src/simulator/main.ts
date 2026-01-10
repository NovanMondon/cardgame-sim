// devcontainer内で実行可能なシミュレーション
// cd /workspaces/cardgame-sim/src/simulator && node main.ts

type Card = {
  name: string,
  power: number
}

function simulate_once() {
  const decks: Card[][] = [[
    { name: "A1", power: 1 },
    { name: "A2", power: 1 },
    { name: "A3", power: 1 },
    { name: "A4", power: 1 },
    { name: "A5", power: 1 },
    { name: "A6", power: 1 },
    { name: "A7", power: 1 },
    { name: "A8", power: 1 }
  ], [
    { name: "X", power: 6 },
    { name: "Y", power: 1 }
  ]];

  const fields: Card[][] = [[], []];
  let drawn: Card | null = null;
  let is_bench_over: boolean | null = null;
  const benchs: Card[][][] = [[], []];
  // let trash = [[], []];
  let tp: 0 | 1 = 0; // turn player
  let ntp: 0 | 1 = 1; // non turn player

  while (true) {
    // カードをめくる
    if (decks[tp].length <= 0) {
      return { winner: ntp, reason: "Deck Empty" };
    }
    [decks[tp], drawn] = draw_card(decks[tp]);
    // カードを使用
    fields[tp] = play_card(drawn, fields[tp]);
    // パワーの判定
    const tpPower = calc_power_tp(fields[tp]);
    const ntpPower = calc_power_ntp(fields[ntp]);
    // カードの勝敗の判定
    if (tpPower >= ntpPower) {
      [fields[ntp], benchs[ntp], is_bench_over] = send_to_bench(fields[ntp], benchs[ntp]);
      if (is_bench_over) { // ベンチあふれによる敗北
        return { winner: ntp, reason: "Bench Overflow" };
      }

      [tp, ntp] = [ntp, tp];
    }
  }
}

function draw_card(deck: Card[]): [Card[], Card] {
  const resCard = deck[0];
  const resDeck: Card[] = [];
  for (let i = 0; i < deck.length; i++) {
    if (i == 0) continue;
    resDeck.push(deck[i]);
  }

  return [resDeck, resCard];
}

function play_card(drawn: Card, field: Card[]): Card[] {
  const resField: Card[] = [];
  for (let i = 0; i < field.length; i++) {
    resField.push(field[i]);
  }
  resField.push(drawn);

  return resField;
}

function calc_power_tp(deck: Card[]): number {
  let resPower = 0;
  for (let i = 0; i < deck.length; i++) {
    resPower += deck[i].power;
  }
  return resPower;
}

function calc_power_ntp(deck: Card[]): number {
  if (deck.length == 0) return 0;
  return deck[deck.length - 1].power;
}

function send_to_bench(field: Card[], bench: Card[][]): [Card[], Card[][], boolean] {
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

console.log(simulate_once());