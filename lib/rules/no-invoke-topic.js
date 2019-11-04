const meta = require('./meta');

module.exports = {
  meta: {
    docs: {
      description: 'Enforce to publish with qualifier starting with topic/',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      noInvoke: 'topic/ qualifiers cannot be invoked, use publish instead',
    },
  },
  create: (context) => {
    const isTopic = argument => argument.type === 'Literal'
      && argument.value.startsWith('topic/');

    const linterRule = (node) => {
      const [firstArgument] = node.arguments;

      if (isTopic(firstArgument)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'noInvoke',
        });

        return false;
      }

    return {
      'CallExpression[callee.name="invoke"]': linterRule,
    };

    return { 'CallExpression[callee.name="publish"]': linterRule };
  },
};
