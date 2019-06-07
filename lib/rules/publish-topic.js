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
      missing: 'Qualifier starting with topic/ required but not found.',
    },
  },
  create: (context) => {
    const isValidQualifier = argument => argument.type === 'Literal'
      && argument.value.startsWith('topic/');

    const linterRule = (node) => {
      const [qualifier] = node.arguments;

      if (!isValidQualifier(qualifier)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
          fix: fixer => fixer.insertTextBeforeRange([qualifier.start + 1], 'topic/'),
        });
      }
    };

    return {
      'CallExpression[callee.name="publish"]': linterRule,
    };
  },
};
