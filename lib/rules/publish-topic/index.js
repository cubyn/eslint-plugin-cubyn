const meta = require('./meta');

module.exports = {
  meta,
  create: (context) => {
    const isValidQualifier = argument => argument.type === 'Literal'
      && argument.value.startsWith('topic/');

    const linterRule = (node) => {
      const [qualifier] = node.arguments;
      if (!isValidQualifier(qualifier)) {
        if (node.parent.type === 'ArrowFunctionExpression') {
          return true;
        }

        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
          fix: fixer => fixer.insertTextBeforeRange([qualifier.start + 1], 'topic/'),
        });

        return false;
      }

      return true;
    };

    return { 'CallExpression[callee.name="publish"]': linterRule };
  },
};
