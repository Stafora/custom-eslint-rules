import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import customRules from "./eslint-rules/index.js";

export default [
  {
    files: ["src/**/*.{js,ts,tsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Включаем JSX
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      vue,
      custom: customRules,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...vue.configs["vue3-recommended"]?.rules,
      ...react.configs.recommended.rules,

      // customs
      "custom/no-console-log": "warn",
      "custom/only-camel-case": "warn",
      "custom/no-var": "warn",
      "custom/too-short": "warn"
    },
    settings: {
      react: {
        version: "detect"
      },
    },
  },
]
