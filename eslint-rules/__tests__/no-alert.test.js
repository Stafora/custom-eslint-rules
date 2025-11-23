import { RuleTester } from "eslint";
import rule from "../no-alert.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser,
    }
});

ruleTester.run("no-alert", rule, {
    valid: [
        "console.log('hello');",
        "customAlert('hello');",
        "window.customConfirm('hello');"
    ],
    invalid: [
        {
            code: "alert('hello');",
            errors: [{ messageId: "unexpected", data: { name: "alert" } }]
        },
        {
            code: "confirm('Are you sure?');",
            errors: [{ messageId: "unexpected", data: { name: "confirm" } }]
        },
        {
            code: "prompt('What is your name?');",
            errors: [{ messageId: "unexpected", data: { name: "prompt" } }]
        },
        {
            code: "window.alert('hello');",
            errors: [{ messageId: "unexpected", data: { name: "window.alert" } }]
        }
    ]
});
