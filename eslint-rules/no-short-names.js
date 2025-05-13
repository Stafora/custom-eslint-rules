export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Disallow variable and function names with length <= 2",
            recommended: false,
        },
        messages: {
            tooShort: "Identifier '{{ name }}' is too short. Use more descriptive names.",
        },
        schema: [], // без опций пока
    },
    create(context) {
        function checkIdentifier(node, name) {
            if (name.length <= 2) {
                context.report({
                    node,
                    messageId: "tooShort",
                    data: { name }
                });
            }
        }

        return {
            VariableDeclarator(node) {
                if (node.id.type === "Identifier") {
                    checkIdentifier(node.id, node.id.name);
                }
            },
            FunctionDeclaration(node) {
                if (node.id && node.id.name) {
                    checkIdentifier(node.id, node.id.name);
                }
            },
            FunctionExpression(node) {
                if (node.id && node.id.name) {
                    checkIdentifier(node.id, node.id.name);
                }
            }
        };
    }
};
