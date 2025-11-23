export default {
    meta: {
        type: "problem",
        docs: {
            description: "disallow the use of alert, confirm, and prompt",
            category: "Best Practices",
            recommended: false,
        },
        schema: [],
        messages: {
            unexpected: "Unexpected {{name}}."
        }
    },
    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;
                const prohibited = ["alert", "confirm", "prompt"];

                if (callee.type === "Identifier" && prohibited.includes(callee.name)) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: { name: callee.name }
                    });
                } else if (
                    callee.type === "MemberExpression" &&
                    callee.object.name === "window" &&
                    prohibited.includes(callee.property.name)
                ) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: { name: `window.${callee.property.name}` }
                    });
                }
            }
        };
    }
};
