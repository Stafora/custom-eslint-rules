import { RuleTester } from "eslint";
import rule from "../no-var.js";
import tsParser from "@typescript-eslint/parser"

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser
    }
});

ruleTester.run("no-var", rule, {
    valid: [
        "let a = 1;",
        "const b = 2;",
        "let foo: string = 'bar';",
    ],
    invalid: [
        {
            code: "var a = 1;",
            errors: [{ messageId: "noVar" }],
            output: "let a = 1;",
        },
    ],
});
