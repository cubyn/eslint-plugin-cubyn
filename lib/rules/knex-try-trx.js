module.exports = {
  meta: {
    docs: {
      description: 'Enforce to try/catch a Knex transaction',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Try/catch a transaction is required but not found.',
    },
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();

    const findTrxVariableName = (node) => {
      if (node.parent.parent.type === 'VariableDeclarator'
        && node.parent.parent.id.type === 'Identifier'
        && node.parent.parent.parent.type === 'VariableDeclaration'
        && node.parent.parent.parent.kind === 'const') {
        return node.parent.parent.id.name;
      }

      return null;
    };

    const linterRule = (node) => {
      const { parent } = node;
      const trxVariableName = findTrxVariableName(parent);

      if (trxVariableName) {
        const tryStatement = sourceCode.getTokenAfter(parent, {
          filter: (token) => token.type === 'Keyword' && token.value === 'try',
          includeComments: false,
        });

        if (!tryStatement) {
          context.report({
            node,
            loc: node.loc.start,
            messageId: 'missing',
          });
        } else {
          const trxIdentifier = sourceCode.getTokenAfter(tryStatement, {
            filter: (token) => token.type === 'Identifier' && token.value === trxVariableName,
            includeComments: false,
          });

          if (!trxIdentifier || trxIdentifier.value !== trxVariableName) {
            context.report({
              node,
              loc: node.loc.start,
              messageId: 'missing',
            });
          }
        }
      }
    };

    return {
      'MemberExpression[object.name=transaction][object.type=Identifier][property.name=start]': linterRule,
    };
  },
};
