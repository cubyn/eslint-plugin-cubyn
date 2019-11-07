module.exports = {
  meta: {
    docs: {
      description: 'Enforce to await a commit and rollback of Knex transaction',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingAwaitCommit: 'Await before transaction.commit() required but not found.',
      missingAwaitRollback: 'Await before transaction.rollback() required but not found.',
    },
  },
  create: (context) => {
    const isAwaitExists = (node) => node.type === 'AwaitExpression';

    const linterRule = (messageId) => (node) => {
      const { parent } = node;

      if (!isAwaitExists(parent)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId,
        });
      }
    };

    return {
      'CallExpression[callee.property.name="commit"]': linterRule('missingAwaitCommit'),
      'CallExpression[callee.property.name="rollback"]': linterRule('missingAwaitRollback'),
    };
  },
};
