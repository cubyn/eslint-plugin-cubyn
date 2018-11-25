module.exports = {
  meta: {
    docs: {
      description: 'Enforce meta permissions writting',
      category: 'Micro-service issues',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Meta permissions required but not found.',
    },
  },
  create: context => ({
    Program: (node) => {
      const sourceCode = context.getSourceCode();
      const src = sourceCode.getText();
      const permissions = src
        .replace(/[^\x20-\x7E]/gmi, '')
        .match(/meta = { *description: .*(permissions: )/);

      if (!permissions || !permissions[1]) {
        const loc = {
          column: [...sourceCode.lines].pop().length,
          line: sourceCode.lines.length,
        };

        context.report({
          node,
          loc,
          messageId: 'missing',
        });
      }
    },
  }),
};
