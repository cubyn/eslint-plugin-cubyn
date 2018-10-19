module.exports = {
  meta: {
    docs: {
      description: 'Enforce meta description writting',
      category: 'Micro-service issues',
      recommended: false
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Meta description required but not found.'
    }
  },
  create: context => {
    return {
      Program: node => {
        const sourceCode = context.getSourceCode();
        const src = sourceCode.getText();
        const [, rawMeta] = src.match(/meta = ({.*});$/);

        if (rawMeta) {
          const meta = eval(`(${rawMeta})`);

          if (!meta.description) {
            const loc = {
              column: [...sourceCode.lines].pop().length,
              line: sourceCode.lines.length
            };

            context.report({
              node,
              loc,
              messageId: 'missing'
            });
          }
        }
      }
    }
  }
};
