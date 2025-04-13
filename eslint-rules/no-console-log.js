export default {
    meta: {
    type: "suggestion",
    docs: {
        description: "Disallow console.log",
    },
    messages: {
        unexpected: "Avoid using console.log",
    },
    schema: [],
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.object.name === "console" &&
                    node.callee.property.name === "log"
                ) {
                    context.report({
                        node,
                        messageId: "unexpected",
                    });
                }
            }
        };
    }
};
