module.exports = {
  meta: {
    docs: {
      description: 'Enforce to await a start of Knex transaction',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Await before transaction.start() required but not found.',
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
      'MemberExpression[object.name=transaction][object.type=Identifier][property.name=start]': linterRule,
    };
  },
};
