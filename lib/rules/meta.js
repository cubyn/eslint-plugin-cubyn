module.exports = {
  meta: {
    docs: {
      description: 'Enforce meta usage in Controller',
      category: 'Micro-service issues',
      recommended: false
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Meta required at end of file but not found.'
    }
  },
  create: context => {
    return {
      Program: node => {
        const sourceCode = context.getSourceCode();
        const src = sourceCode.getText();
        const endsWithMeta = src.match(/meta = {.+};$/);

        if (!endsWithMeta) {
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
};
