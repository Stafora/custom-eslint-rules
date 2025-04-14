import { RuleTester } from "eslint";
import rule from "../only-camel-case.js";
import tsParser from "@typescript-eslint/parser"

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser
    }
});

ruleTester.run("only-camel-case", rule, {
    valid: [
        "let a = 1;",
        "let foo: string = 'bar';",
        "let camelCase: string = 'bar';",
        "var somSomething: string = 'bar';",
    ],
    invalid: [
        {
            code: "var ASD = 1;",
            errors: [{ messageId: "unexpected" }]
        },
        {
            code: "let PascaleCase = 1;",
            errors: [{ messageId: "unexpected" }]
        },
        {
            code: "let a_a = 1;",
            errors: [{ messageId: "unexpected" }]
        },
        {
            code: "let X_X = 1;",
            errors: [{ messageId: "unexpected" }]
        },
    ],
});
