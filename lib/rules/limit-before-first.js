module.exports = {
  meta: {
    docs: {
      description: 'Enforce limit usage before first function call',
      category: 'Micro-service issues',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Limit required when use first function.',
    },
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const isQueryFunctionCall = node => node.name === 'query' && node.type === 'Identifier';
    const isFirstFunctionCall = node => node.name === 'first' && node.type === 'Identifier';
    const isLimitFunctionCall = tokens => tokens.some(t => t.type === 'Identifier' && t.value === 'limit');

    let query;

    return {
      Identifier(node) {
        if (!query && isQueryFunctionCall(node)) {
          query = node;
        } else if (isFirstFunctionCall(node)) {
          const first = node;
          const tokens = sourceCode.getTokensBetween(query, first);

          if (!isLimitFunctionCall(tokens)) {
            context.report({
              node,
              loc: node.loc.start,
              messageId: 'missing',
            });
          }
        }
      },
    };
  },
};
