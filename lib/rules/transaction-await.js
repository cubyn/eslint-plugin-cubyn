const TRANSACTION_FNS = ['commit', 'rollback'];

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of await in front of trx.commit / trx.rollback',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: TRANSACTION_FNS.reduce((messages, name) => ({
      ...messages,
      [`${name}MissingAwait`]: `await not found before transaction.${name}()`,
    }), {}),
  },
  create: (context) => {
    const [{ transactionName = 'trx' } = {}] = (context.options || []);
    const scope = { hasAwait: false };

    function toggleAwait(hasAwait) {
      return () => {
        scope.hasAwait = hasAwait;
      };
    }

    function rule(name) {
      return (node) => {
        if (!scope) return;

        if (!scope.hasAwait) {
          context.report({
            node,
            loc: node.loc.start,
            messageId: `${name}MissingAwait`,
          });
        }
      };
    }

    return TRANSACTION_FNS.reduce((declarations, name) => ({
      ...declarations,
      [`CallExpression[callee.object.name="${transactionName}"][callee.property.name="${name}"]`]: rule(name),
    }), {
      AwaitExpression: toggleAwait(true),
      'AwaitExpression:exit': toggleAwait(false),
    });
  },
};
