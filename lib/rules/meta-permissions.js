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
      // eslint-disable-next-line no-sparse-arrays
      const [, rawMeta] = src.match(/meta = ({.*});$/) || [, null];

      if (rawMeta) {
        // eslint-disable-next-line no-eval
        const meta = eval(`(${rawMeta})`);

        if (!meta.permissions || !meta.permissions.length) {
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
