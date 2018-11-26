module.exports = {
  meta: {
    docs: {
      description: 'Enforce meta description writting',
      category: 'Micro-service issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Meta description required but not found.',
    },
  },
  create: context => ({
    Program: (node) => {
      const sourceCode = context.getSourceCode();
      const src = sourceCode.getText();
      const description = src
        .replace(/[^\x20-\x7E]/gmi, '')
        .match(/meta = { *(description: '.+')/);

      if (!description || !description[1]) {
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
