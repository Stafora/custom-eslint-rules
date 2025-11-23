export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce a maximum number of parameters in function definitions",
            category: "Best Practices",
            recommended: false,
        },
        schema: [
            {
                type: "object",
                properties: {
                    max: {
                        type: "integer",
                        minimum: 0
                    }
                },
                additionalProperties: false
            }
        ],
        messages: {
            exceed: "Function has too many parameters ({{count}}). Maximum allowed is {{max}}."
        }
    },
    create(context) {
        const option = context.options[0] || {};
        const max = option.max || 3;

        function checkFunction(node) {
            if (node.params.length > max) {
                context.report({
                    node,
                    messageId: "exceed",
                    data: {
                        count: node.params.length,
                        max
                    }
                });
            }
        }

        return {
            FunctionDeclaration: checkFunction,
            FunctionExpression: checkFunction,
            ArrowFunctionExpression: checkFunction
        };
    }
};
