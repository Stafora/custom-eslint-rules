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
                    // Check if it has comments (if we wanted to allow comments, but let's be strict for now or check comments)
                    // Standard no-empty allows comments.
                    // context.getSourceCode() is deprecated in v9 but let's see what version is used.
                    // package.json says eslint ^9.23.0.
                    // In v9, context.sourceCode is used.

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
