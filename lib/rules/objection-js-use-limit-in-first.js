module.exports = {
  meta: {
    docs: {
      description: 'Enforce to use useLimitInFirst in Objection.js model class',
      category: 'Objection.js issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'useLimitInFirst static method required but not found.',
    },
  },
  create: (context) => {
    const linterRule = (node) => {
      const { body: classBody } = node.body;
      const useLimitInFirstMethod = classBody.find((item) => item.type === 'MethodDefinition'
        && item.key.name === 'useLimitInFirst'
        && item.kind === 'get'
        && item.static);

      if (!useLimitInFirstMethod) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return {
      // Clearer than dynamically generated selectors
      'ClassDeclaration[superClass.name="Model"]': linterRule,
      'ClassDeclaration[superClass.name="PublicModel"]': linterRule,
      'ClassDeclaration[superClass.name="BaseModel"]': linterRule,
      'ClassDeclaration[superClass.type="CallExpression"][superClass.callee.name="guid"]': linterRule,
      'ClassExpression[superClass.name="Model"]': linterRule,
      'ClassExpression[superClass.name="PublicModel"]': linterRule,
      'ClassExpression[superClass.name="BaseModel"]': linterRule,
    };
  },
};
