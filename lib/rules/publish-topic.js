module.exports = {
  meta: {
    docs: {
      description: 'Enforce `publish` with qualifier starting with `topic/`',
      category: 'Micro-service issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      missing: 'Topic required when use publish function.',
    },
  },
  create: (context) => {
    // Regexp: token.value='"topic/...:v1"'
    const isValidQualifier = token => token.type === 'String' && /^['"]topic\/.*/.test(token.value);

    return {
      // Called for:
      // `await publish("parcel.created:v1");`
      // Not for:
      // `const publish = () => new Promise();`
      // `function handler({ publish }) {};`
      'Identifier:expression[name="publish"][parent.type!=VariableDeclarator][parent.type!=Property]': (node) => {
        const [, qualifier] = context.getTokensAfter(node, { count: 2 });

        if (!isValidQualifier(qualifier)) {
          context.report({
            node,
            loc: node.loc.start,
            messageId: 'missing',
            fix: fixer => fixer.insertTextBeforeRange([qualifier.start + 1], 'topic/'),
          });
        }
      },
    };
  },
};
