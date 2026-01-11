// エラー可能性がある操作の型。
// 特殊な操作をしなくてもエラーになる可能性がある操作に対して使う。
export type Result<T, E> = {
  ok: true, value: T
} | {
  ok: false, error: E
}