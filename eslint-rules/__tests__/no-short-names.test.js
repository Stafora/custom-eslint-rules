import { RuleTester } from "eslint";
import rule from "../no-short-names.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    },
});

ruleTester.run("no-short-names", rule, {
    valid: [
        "let name = 1;",
        "const totalCount = 42;",
        "function processData() {}",
        "const fetchData = () => {};",
        "let foo: string = 'bar';",
    ],
    invalid: [
        {
            code: "let x = 1;",
            errors: [{ messageId: "tooShort", data: { name: "x" } }],
        },
        {
            code: "const ab = 2;",
            errors: [{ messageId: "tooShort", data: { name: "ab" } }],
        },
        {
            code: "function fn() {}",
            errors: [{ messageId: "tooShort", data: { name: "fn" } }],
        },
        {
            code: "const go = () => {};",
            errors: [{ messageId: "tooShort", data: { name: "go" } }],
        },
        {
            code: "const z: number = 5;",
            errors: [{ messageId: "tooShort", data: { name: "z" } }],
        },
    ],
});
