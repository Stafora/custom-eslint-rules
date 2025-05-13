function getEntityType(name, node) {
    const kind = node.parent.kind;

    const isPascal = /^[A-Z][a-zA-Z0-9]*$/.test(name);
    const isCamel = /^[a-z][a-zA-Z0-9]*$/.test(name);
    const isUpper = /^[A-Z_][A-Z0-9_]*$/.test(name);

    const init = node.init;

    const isFunction =
        init && (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression");

    const isReactComponent = kind === "const" && isPascal && isFunction;
    const isReactContext =
        init &&
        init.type === "CallExpression" &&
        init.callee.type === "Identifier" &&
        init.callee.name === "createContext";

    if (isReactComponent) return "component";
    if (isReactContext) return "context";
    if (kind === "const" && isUpper) return "const_upper";
    if (isCamel) return "variable";
    return "invalid";
}

function isValidNameForType(name, type) {
    switch (type) {
        case "component":
        case "context":
            return /^[A-Z][a-zA-Z0-9]*$/.test(name);
        case "const_upper":
            return /^[A-Z_][A-Z0-9_]*$/.test(name);
        case "variable":
            return /^[a-z][a-zA-Z0-9]*$/.test(name);
        default:
            return false;
    }
}

export default {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce camelCase for variables, PascalCase for components/contexts/classes, UPPER_CASE for const",
            category: "Best Practices",
            recommended: true,
        },
        messages: {
            unexpected: "Unexpected variable name '{{name}}'. Use camelCase, PascalCase (for components/contexts/classes), or UPPER_CASE for const.",
        },
        fixable: null,
        schema: [],
    },
    create(context) {
        return {
            VariableDeclarator(node) {
                if (node.id.type !== "Identifier") return;

                const name = node.id.name;
                const type = getEntityType(name, node);

                if (!isValidNameForType(name, type)) {
                    context.report({
                        node: node.id,
                        messageId: "unexpected",
                        data: { name },
                    });
                }
            }
        };
    }
};
