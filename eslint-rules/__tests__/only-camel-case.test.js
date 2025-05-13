import { RuleTester } from "eslint";
import rule from "../only-camel-case.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

try{
    ruleTester.run("only-camel-case", rule, {
        valid: [
            // camelCase переменные
            "let value = 1;",
            "const totalValue = 2;",
            "let userName: string = 'John';",
            "let count = function() {};",
            "let process = () => {};",

            // UPPER_CASE константы
            "const API_URL = 'https://example.com';",
            "const MAX_COUNT = 10;",

            // PascalCase компоненты
            "const MyComponent = () => <div />;",
            "const ButtonGroup = function() {};",

            // PascalCase контекст
            "const AppContext = createContext(null);",

            // PascalCase классы
            "class UserProfile {}",
            "class AuthStore {}",

            // camelCase hook
            "const useData = () => {};",
        ],
        invalid: [
            // Неверные названия переменных
            {
                code: "var SOME_VAR = 1;",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let Snake_case = 1;",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let X_Y = 1;",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let BadComponent = () => {}; // Lowercase expected for non-component",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let BAD_NAME = function() {};",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let DA_ARRAY = [];",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "let AA_OBJECT = {};",
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "const NotContext = someFactory();", // PascalCase не контекст
                errors: [{ messageId: "unexpected" }],
            },
            {
                code: "const Another_Context = createContext(null);", // snake_case
                errors: [{ messageId: "unexpected" }],
            },
        ],
    });
} catch (e) {
    console.error(e)
}
