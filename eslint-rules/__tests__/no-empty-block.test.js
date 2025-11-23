import { RuleTester } from "eslint";
import rule from "../no-empty-block.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser,
    }
});

ruleTester.run("no-empty-block", rule, {
    valid: [
        "if (true) { console.log('foo'); }",
        "if (true) { /* comment */ }",
        "function foo() { return; }"
    ],
    invalid: [
        {
            code: "if (true) {}",
            errors: [{ messageId: "unexpected" }]
        },
        {
            code: "while (true) {}",
            errors: [{ messageId: "unexpected" }]
        }
    ]
});
