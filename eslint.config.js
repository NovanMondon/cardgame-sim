import js from "@eslint/js";
import tseslint from "typescript-eslint";

// TypeScript を「型情報あり」でLintするための設定。
const languageOptions = {
  parserOptions: {
    // ESLint が tsconfig 経由で型情報を読み込めるように、設定ファイルを指定する
    project: ["./tsconfig.eslint.json"],
    // 基準ディレクトリ。eslint.config.js から見た相対パスで指定。
    tsconfigRootDir: import.meta.dirname,
  },
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: languageOptions,
    rules: {
      semi: ["error", "always"]
    }
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];