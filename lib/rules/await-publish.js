module.exports = {
  meta: {
    docs: {
      description: 'Enforce await usage on `publish` function call',
      category: 'Micro-service issues',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Await required when use publish function.',
    },
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const isPublishCall = node => node.name === 'publish' && node.parent.type === 'CallExpression';
    const isAwaitIdentifier = token => token.type === 'Identifier' && token.value === 'await';

    return {
      Identifier(node) {
        if (isPublishCall(node)) {
          const prevToken = sourceCode.getTokenBefore(node);

          if (!isAwaitIdentifier(prevToken)) {
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
