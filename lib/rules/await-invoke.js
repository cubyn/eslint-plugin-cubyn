module.exports = {
  meta: {
    docs: {
      description: 'Enforce await usage on `invoke` function call',
      category: 'Micro-service issues',
      recommended: false
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Await required when use invoke function.'
    }
  },
  create: context => {
    const sourceCode = context.getSourceCode();
    const isPublishCall = node => {
      return node.name === 'invoke' && node.parent.type === 'CallExpression';
    };
    const isAwaitIdentifier = token => {
      return token.type === 'Identifier' && token.value === 'await';
    }

    return {
      Identifier(node) {
        if (isPublishCall(node)) {
          const prevToken = sourceCode.getTokenBefore(node);

          if (!isAwaitIdentifier(prevToken)) {
            context.report({
              node,
              loc: node.loc.start,
              messageId: 'missing'
            });
          }
        }
      }
    }
  }
};
