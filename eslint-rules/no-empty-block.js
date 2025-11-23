export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow empty block statements",
            category: "Best Practices",
            recommended: false,
        },
        schema: [],
        messages: {
            unexpected: "Empty block statement."
        }
    },
    create(context) {
        return {
            BlockStatement(node) {
                if (node.body.length === 0) {
                    const sourceCode = context.sourceCode;
                    const comments = sourceCode.getCommentsInside(node);

                    if (comments.length === 0) {
                        context.report({
                            node,
                            messageId: "unexpected"
                        });
                    }
                }
            }
        };
    }
};
