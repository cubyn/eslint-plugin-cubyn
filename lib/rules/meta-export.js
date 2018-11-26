module.exports = {
  meta: {
    docs: {
      description: 'Enforce meta export in Controllers, Lambdas and Listeners index files',
      category: 'Micro-service issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Meta export required but not found.',
    },
  },
  create: context => ({
    Program: (node) => {
      const sourceCode = context.getSourceCode();
      const src = sourceCode.getText();
      const metaExported = src
        .replace(/[^\x20-\x7E]/gmi, '')
        .match(/exports = {.*(meta).*}.*/);

      if (!metaExported) {
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
