import { RuleTester } from "eslint";
import rule from "../no-console-log.js";
import tsParser from "@typescript-eslint/parser"

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser
    }
});

ruleTester.run("no-console-log", rule, {
    valid: [
        `console.error("Something went wrong");`,
        `alert("Hello world");`,
    ],
    invalid: [
        {
            code: `console.log("Debug info");`,
            errors: [{ messageId: "unexpected" }],
        },
        {
            code: `
                function debug() {
                    console.log("trace");
                }
            `,
            errors: [{ messageId: "unexpected" }],
        }
    ]
});