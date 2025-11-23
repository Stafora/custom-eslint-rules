import { RuleTester } from "eslint";
import rule from "../max-params.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser,
    }
});

ruleTester.run("max-params", rule, {
    valid: [
        "function foo(a, b, c) {}",
        "const foo = (a, b) => {}",
        {
            code: "function foo(a, b, c, d) {}",
            options: [{ max: 4 }]
        }
    ],
    invalid: [
        {
            code: "function foo(a, b, c, d) {}",
            errors: [{ messageId: "exceed", data: { count: 4, max: 3 } }]
        },
        {
            code: "const foo = (a, b, c, d, e) => {}",
            options: [{ max: 2 }],
            errors: [{ messageId: "exceed", data: { count: 5, max: 2 } }]
        }
    ]
});
