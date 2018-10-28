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
      // eslint-disable-next-line no-sparse-arrays
      const [, rawMeta] = src.match(/meta = ({.*});$/) || [, null];

      if (rawMeta) {
        // eslint-disable-next-line no-eval
        const meta = eval(`(${rawMeta})`);

        if (!meta || !meta.description) {
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
      }
    },
  }),
};
