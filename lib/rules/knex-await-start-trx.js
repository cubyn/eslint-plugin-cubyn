module.exports = {
  meta: {
    docs: {
      description: 'Enforce an ending of each SQL transaction started',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'missing await on transaction.start()',
    },
  },
  create: (context) => {
    const isAwaitExists = (node) => node.parent.type === 'AwaitExpression';

    const linterRule = (node) => {
      const { parent } = node;

      if (!isAwaitExists(parent)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return {
      'MemberExpression[object.name=transaction][property.name=start]': linterRule,
    };
  },
};
