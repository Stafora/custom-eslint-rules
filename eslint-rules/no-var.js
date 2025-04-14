export default {
    meta: {
        type: "problem",
        docs: {
            description: "Disallow use of `var`, use `let` or `const` instead",
            category: "Best Practices",
            recommended: true,
        },
        messages: {
            noVar: "Unexpected `var`, use `let` or `const` instead.",
        },
        fixable: "code",
        schema: [],
    },
    create(context) {
        return {
            VariableDeclaration(node) {
                if (node.kind === "var") {
                    context.report({
                        node,
                        messageId: "noVar",
                        fix(fixer) {
                            // Заменяем только ключевое слово var на let
                            return fixer.replaceTextRange([node.range[0], node.range[0] + 3], "let");
                        }
                    });
                }
            }
        };
    },
};  