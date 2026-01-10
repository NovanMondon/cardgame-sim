import { defineConfig } from "vite";

export default defineConfig({
  // viteが認識するルートのパス。
  // 開発時・ビルド時にviteによって適用される。
  // GitHub Pagesとの兼ね合いから、リポジトリ名を書く。
  base: "/cardgame-sim/",
  server: {
    host: "0.0.0.0", // devcontainer外からアクセスできるように設定
  },
});