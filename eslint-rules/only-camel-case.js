function toCamelCase(name) {
    return name
        .replace(/[_-]+(.)/g, (_, chr) => chr.toUpperCase()) // snake_case → camelCase
        .replace(/^([A-Z])/, (_, chr) => chr.toLowerCase()); // PascalCase → camelCase
}

export default {
    meta: {
        type: "problem",
        docs: {
            description: "Prohibit the use of variable writing, all except camelCase (UPPER_CASE allowed for const)",
            category: "Best Practices",
            recommended: true,
        },
        messages: {
            unexpected: "Unexpected variable name '{{name}}'. Use camelCase (or UPPER_CASE for const).",
        },
        fixable: "code",
        schema: [],
    },
    create(context) {
        const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
        const upperCaseRegex = /^[A-Z_][A-Z0-9_]*$/;

        return {
            VariableDeclarator(node) {
                if (node.id.type !== "Identifier") return;

                const name = node.id.name;
                if (!name) return;

                const declarationKind = node.parent.kind;

                let isValid = false;
                if (declarationKind === "const") {
                    isValid = camelCaseRegex.test(name) || upperCaseRegex.test(name);
                } else {
                    isValid = camelCaseRegex.test(name);
                }

                if (!isValid) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: { name }
                    });
                }
            },
        };
    },
};